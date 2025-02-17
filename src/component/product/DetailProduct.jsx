import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./detailProduct.css";
import { Link, useParams } from "react-router-dom";

const DetailProduct = ({ user, products }) => {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [like, setLike] = useState(false);

  useEffect(() => {
    const foundProduct = products.find(
      (item) => String(item.product_id) === product_id
    );

    if (foundProduct) {
      setProduct(foundProduct);
      setMainImg(foundProduct.images?.[0]);
    }
  }, [product_id, products]);

  if (!product) {
    return <div className="container mt-5 text-center"></div>;
  }

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
              onClick={() => setLike(!like)}
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

          <div className="d-flex gap-3">
            <button className="btn btn-outline-warning w-10 mt-3">
              메시지 보내기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
