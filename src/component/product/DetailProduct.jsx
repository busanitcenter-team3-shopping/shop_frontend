import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./detailProduct.css";
import { Link, useParams } from "react-router-dom";

const DetailProduct = ({ user, products }) => {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [like, setLike] = useState(false);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    if (!user) {
      alert("로그인을 해주세요.");
      return;
    }

    const foundProduct = products.find(
      (item) => String(item.product_id) === product_id
    );

    if (foundProduct) {
      setProduct(foundProduct);
      setMainImg(foundProduct.images?.[0]);

      // 로컬에 구매 완료 여부
      const purchasedProducts =
        JSON.parse(localStorage.getItem("purchasedProducts")) || [];
      setPurchased(purchasedProducts.includes(foundProduct.product_id));

      // 로컬에 있는 찜 상품
      const likedProducts =
        JSON.parse(localStorage.getItem(`likeProducts_${user.user_id}`)) || [];
      setLike(likedProducts.includes(foundProduct.product_id));
    }
  }, [product_id, products]);

  if (!product) {
    return <div className="container mt-5 text-center"></div>;
  }

  // 등록자가 구매완료를 눌렀을시 메시지 보내기가 블락 처리되도록 하는 메서드
  const handleChange = () => {
    const purchasedProducts =
      JSON.parse(localStorage.getItem("purchasedProducts")) || [];

    if (!purchasedProducts.includes(product.product_id)) {
      purchasedProducts.push(product.product_id);
      localStorage.setItem(
        "purchasedProducts",
        JSON.stringify(purchasedProducts)
      );
      setPurchased(true);
      setProduct((prev) => ({ ...prev, status: "판매완료" }));
    }
  };

  // 찜
  const toggleLike = () => {
    let likedProducts = localStorage.getItem(`likeProducts_${user.user_id}`);
    likedProducts = likedProducts ? JSON.parse(likedProducts) : [];

    if (like) {
      // 지금 like가 되어 있으면
      likedProducts = likedProducts.filter((id) => id !== product.product_id); //like 해제
    } else {
      //like 추가
      likedProducts.push(product.product_id);
    }

    localStorage.setItem(
      `likeProducts_${user.user_id}`,
      JSON.stringify(likedProducts)
    ); // 로컬에 저장
    setLike(!like);
  };
  console.log(product);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="d-flex col">
          <div className="d-flex flex-column me-3 gap-1">
            {product.images?.map((img, index) => (
              <button
                key={index}
                className="imgbtn"
                onClick={() => setMainImg(img)}
              >
                <img
                  src={img}
                  className="mb-2 sub-img"
                  alt={`상품 이미지 ${index}`}
                />
              </button>
            ))}
          </div>
          <img className="mainImg" src={mainImg} alt="메인 상품 이미지" />
        </div>

        <div className="d-flex flex-column justify-content-center col">
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="fw-bold">{product.title}</h2>
            {/* 찜 추가 */}
            <img
              src={like ? "/colorHeart.png" : "/heart.png"}
              alt="찜"
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
              onClick={toggleLike}
            />
          </div>
          <p>
            판매자:{" "}
            <Link to="/brand" className="fw-bold">
              {user.name}
            </Link>
          </p>
          <p className="over-box">{product.description}</p>
          <h3 className="fw-bold">{product.price.toLocaleString()}원</h3>
          {product.seller_id === user.user_id ? ( //유저의 id와 상품등록한 사람의 id값을 비교 하기 위한 3항 연산자
            <div className="d-flex gap-3">
              <button
                className={
                  purchased === false
                    ? "btn btn-warning w-10 mt-3"
                    : "btn w-10 mt-3"
                }
                onClick={handleChange}
                disabled={purchased}
              >
                구매완료
              </button>
              <button
                className={
                  purchased === false
                    ? "btn btn-danger w-10 mt-3"
                    : "btn w-10 mt-3"
                }
                disabled={purchased}
              >
                수정하기
              </button>
            </div>
          ) : (
            <div className="d-flex gap-3">
              <button
                className={
                  purchased === false
                    ? "btn btn-danger w-10 mt-3"
                    : "btn w-10 mt-3"
                }
                disabled={purchased}
              >
                메시지 보내기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
