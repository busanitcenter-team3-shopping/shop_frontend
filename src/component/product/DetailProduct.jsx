import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./detailProduct.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import api from "../../api/axiosInstance";
import { useMyContext } from "../../api/ContextApi";

const DetailProduct = ({ user, products, setProducts }) => {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [like, setLike] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = "http://localhost:8090";
  const { currentUser, token } = useMyContext();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/product/${product_id}`);
        const foundProduct = response.data;

        setProduct(foundProduct);
        setMainImg(
          `${BASE_URL}/product/images/${product.images?.[0]?.imageName}`
        );
      } catch (err) {
        setError("상품 불러오기 실패");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [product_id]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImg(`${BASE_URL}/product/images/${product.images[0].imageName}`);
    }
  }, [product]);


  if (!product) {
    return <div className="container mt-5 text-center"></div>;
  }

  // 등록자가 구매완료를 눌렀을 시 메시지 보내기가 블락 처리되도록 하는 메서드
  const handlePurchase = () => {
    const purchasedProducts =
      JSON.parse(localStorage.getItem("purchasedProducts")) || [];

    if (!purchasedProducts.includes(product.product_id)) {
      purchasedProducts.push(product.product_id);
      localStorage.setItem(
        "purchasedProducts",
        JSON.stringify(purchasedProducts)
      );
      setPurchased(true);

      const updatedProduct = { ...product, status: "판매완료" };
      setProduct(updatedProduct);

      // 로컬스토리지 products 업데이트
      const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      const updatedProducts = storedProducts.map((p) =>
        p.product_id === product.product_id ? updatedProduct : p
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      setProducts(updatedProducts);
    }
  };

  // 찜
  const toggleLike = () => {
    let likedProducts =
      JSON.parse(localStorage.getItem(`likeProducts_${user.user_id}`)) || [];

    if (like) {
      delete likedProducts[product.product_id]; // 찜 해제
    } else {
      likedProducts[product.product_id] = true; // 찜 추가
    }

    localStorage.setItem(
      `likeProducts_${user.user_id}`,
      JSON.stringify(likedProducts)
    );
    setLike(!like);
  };

  // 수정
  const handleEdit = () => {
    navigate("/edit-product", {
      state: { product: product, user_id: user.user_id },
    });
  };
  // 삭제
  const handleDelete = async () => {
    if (!window.confirm("정말로 이 상품을 삭제하시겠습니까?")) {
      return;
    }
    console.log(product.productId)
    const response = await api.delete(`/product/${product.productId}`)
    // 상품 삭제 후 업데이트

   if(response === 200) {
    alert("상품이 삭제되었습니다.");
   }
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* 좌측 이미지 목록 */}
        <div className="d-flex col">
          <div className="d-flex flex-column me-3 gap-1">
            {product.images?.map((img, index) => (
              <button
                key={index}
                className="imgbtn"
                onClick={() =>
                  setMainImg(`${BASE_URL}/product/images/${img.imageName}`)
                }
              >
                <img
                  src={`${BASE_URL}/product/images/${product.images?.[index]?.imageName}`}
                  className="mb-2 sub-img"
                  alt={`상품 이미지 ${index}`}
                />
              </button>
            ))}
          </div>
          {product.status === "판매중" ? (
            <img className="mainImg" src={mainImg} alt="메인 상품 이미지" />
          ) : (
            <div className="image-container">
              <img
                className="mainImg opacity-50"
                src={mainImg}
                alt="메인 상품 이미지"
              />
              <img className="soldout" src="/soldout1.png" alt="판매완료" />
            </div>
          )}
        </div>

        {/* 우측 상세 정보 */}
        <div className="d-flex flex-column justify-content-center col">
          <div className="d-flex align-items-center justify-content-between">
            <h2
              className="fw-bold"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                wordBreak: "break-word",
              }}
            >
              {product.title}
            </h2>
            {/* 찜 아이콘 */}
            {!user || users === undefined ? (
              <div></div>
            ) : (
              <img
                src={like ? "/colorHeart.png" : "/heart.png"}
                alt="찜"
                style={{ width: "30px", height: "30px", cursor: "pointer" }}
                onClick={toggleLike}
              />
            )}
          </div>

          <p>
            판매자:{" "}
            {product.user === null ? (
              <span className=" fw-bold">탈퇴한 계정입니다.</span>
            ) : (
              <Link
                to={`/user-board/${product.user.userId}`}
                className="fw-bold"
              >
                {product.user.username}
              </Link>
            )}
          </p>

          <p
            className="over-box"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              textOverflow: "ellipsis",
              wordBreak: "break-word",
            }}
          >
            {product.description}
          </p>

          <h3
            className="fw-bold"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              wordBreak: "break-word",
            }}
          >
            {product.price.toLocaleString()}원
          </h3>

          {product.user === null ? (
            <div></div>
          ) : (
            <div>
              {product.user?.userId === currentUser?.userId ? (
                <div className="d-flex gap-3">

                  <button
                    className={`btn w-10 mt-3 ${
                      purchased ? "btn-secondary" : "btn-warning"
                    }`}
                    onClick={handlePurchase}
                    disabled={purchased}
                  >
                    판매완료
                  </button>
                  {!purchased && (
                    <>
                      <button
                        className="btn btn-success w-10 mt-3"
                        onClick={handleEdit}
                      >
                        수정하기
                      </button>
                      <button
                        className="btn btn-danger w-10 mt-3"
                        onClick={handleDelete}
                      >
                        삭제하기
                      </button>
                    </>
                  )}
                </div>
              ) : (
                // 구매자
                <div className="d-flex gap-3">
                  <button
                    className="btn btn-danger w-10 mt-3"
                    disabled={purchased}
                  >
                    메시지 보내기
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
