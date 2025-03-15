import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./famousProduct.css";
import { Link } from "react-router-dom";
import api from "../../api/axiosInstance";

const FamousProduct = () => {
  const [products, setProducts] = useState([]);
  const latestProducts = [...products].reverse().slice(0, 8);

  useEffect(() => {
    api
      .get(`/product/main`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("상품 로드 실패:", error));
  }, []);

  const BASE_URL = "http://172.30.1.71:8090";

  return (
    <div className="container container1">
      <h1 className="d-flex justify-content-center fw-bold mt-3">
        등록된 상품
      </h1>
      <div className="d-flex justify-content-end">
        <Link to="/product" className="btn btn-link btn-about">
          더보기 &gt;
        </Link>
      </div>

      <div className="row row1">
        {latestProducts.length > 0 ? (
          latestProducts.map((product) => (
            <div key={product.productId} className="col-md-3 mb-4">
              <Link to={`/product/${product.productId}`}>
                <div className="card">
                  <div className="position-relative card-img">
                    {product.status === "판매중" ? (
                      <img
                        src={`${BASE_URL}/product/images/${product.images?.[0]?.imageName}`}
                        className="card-img-top"
                        alt={product.description}
                      />
                    ) : (
                      <>
                        <img
                          src={`${BASE_URL}/product/images/${product.images?.[0]?.imageName}`}
                          className="card-img-top opacity-50"
                          alt={product.description}
                        />
                        <img
                          className="soldout-main"
                          src="/soldout1.png"
                          alt="판매완료"
                        />
                      </>
                    )}
                  </div>
                  <div className="card-body">
                    <p className="card-title">{product.title}</p>
                    <p className="card-price mb-0">
                      가격 : {product.price.toLocaleString()}원
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center fw-bold mt-3">등록된 상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default FamousProduct;
