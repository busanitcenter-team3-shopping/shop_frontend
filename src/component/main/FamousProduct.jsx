import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./famousProduct.css";
import { Link } from "react-router-dom";

const FamousProduct = ({ products }) => {
  const latestProducts = [...products].reverse().slice(0, 8);

  return (
    <div className="container container1">
      <h1 className="d-flex justify-content-center fw-bold mt-3">
        등록된 상품
      </h1>
      <div className="d-flex justify-content-end">
        <Link to="/products" className="btn btn-link btn-about">
          더보기 &gt;
        </Link>
      </div>

      <div className="row row1">
        {latestProducts.length > 0 ? (
          latestProducts.map((product) => (
            <div key={product.product_id} className="col-md-3 mb-4">
              <Link to={`/product/${product.product_id}`}>
                <div className="card">
                  <div className="position-relative card-img">
                    <img
                      src={product.images?.[0]}
                      className="card-img-top"
                      alt={product.title}
                    />
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
