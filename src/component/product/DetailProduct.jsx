import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./detailProduct.css";
import { Link, useNavigate, useParams } from "react-router-dom";

const DetailProduct = ({ user, products, setProducts }) => {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [like, setLike] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const navigate = useNavigate();

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
      setMainImg(foundProduct.images?.[0] || "");

      // 로컬스토리지에서 구매 완료 여부 확인
      const purchasedProducts =
        JSON.parse(localStorage.getItem("purchasedProducts")) || [];
      setPurchased(purchasedProducts.includes(foundProduct.product_id));

      // 로컬스토리지에서 찜 여부 확인
      const likedProducts =
        JSON.parse(localStorage.getItem(`likeProducts_${user.user_id}`)) || [];
      setLike(!!likedProducts[foundProduct.product_id]);
    } else {
      setProduct(null);
    }
  }, [product_id, products, user]);

  useEffect(() => {
    const updatedProduct = products.find(
      (item) => String(item.product_id) === product_id
    );
    setProduct(updatedProduct || null);
  }, [products, product_id]);

  if (!product) {
    return (
      <div className="container mt-5 text-center">
        상품이 존재하지 않습니다.
      </div>
    );
  }

  // 구매 완료
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
      setProduct((prev) => ({ ...prev, status: "판매완료" }));
    }
  };

  // 찜
  const toggleLike = () => {
    let likedProducts =
      JSON.parse(localStorage.getItem(`likeProducts_${user.user_id}`)) || {};

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
  const handleDelete = () => {
    if (!window.confirm("정말로 이 상품을 삭제하시겠습니까?")) {
      return;
    }

    // 상품 삭제 후 업데이트
    const updatedProducts = products.filter(
      (item) => item.product_id !== product.product_id
    );

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    if (typeof setProducts === "function") {
      setProducts(updatedProducts); // 업데이트
    }

    alert("상품이 삭제되었습니다.");
    navigate("/products");
  };

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
            <img
              src={like ? "/colorHeart.png" : "/heart.png"}
              alt="찜"
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
              onClick={toggleLike}
            />
          </div>
          <p>
            판매자:{" "}
            <Link to="/user-page" className="fw-bold">
              {user.name}
            </Link>
          </p>
          <p className="over-box">{product.description}</p>
          <h3 className="fw-bold">{product.price.toLocaleString()}원</h3>

          {product.seller_id === user.user_id ? ( // 판매자
            <div className="d-flex gap-3">
              <button
                className={`btn w-10 mt-3 ${
                  purchased ? "btn-secondary" : "btn-warning"
                }`}
                onClick={handlePurchase}
                disabled={purchased}
              >
                구매완료
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
              <button className="btn btn-danger w-10 mt-3" disabled={purchased}>
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
