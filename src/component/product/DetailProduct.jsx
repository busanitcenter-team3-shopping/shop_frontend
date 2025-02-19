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
      setLike(!!likedProducts[foundProduct.product_id]);
    }
  }, [product_id, products, user]);

  if (!product) {
    return <div className="container mt-5 text-center"></div>;
  }

  // 등록자가 구매완료를 눌렀을 시 메시지 보내기가 블락 처리되도록 하는 메서드
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

  console.log(product);
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

        {/* 우측 상세 정보 */}
        <div className="d-flex flex-column justify-content-center col">
          <div className="d-flex align-items-center justify-content-between">
            {/* 
              [제목] 2줄까지만 표시 + 말줄임표 
              (원하면 -webkit-line-clamp 값을 늘려도 됨)
            */}
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

          {/* 
            [내용] 3줄까지만 표시 + 말줄임표 
            기존에 over-box 클래스가 있지만, 추가로 line clamp 적용
          */}
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

          {/* 
            [가격] 1줄로 표시 + 말줄임표
            긴 숫자를 여러 줄에 걸쳐 표시하고 싶으면 WebkitLineClamp 값을 2 이상으로
          */}
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

          {product.seller_id === user.user_id ? (
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
