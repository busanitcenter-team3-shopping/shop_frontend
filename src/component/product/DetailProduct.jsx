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

  // 찜 여부 확인: 백엔드에서 Favorite 목록을 받아서 현재 상품이 찜되어 있는지 체크
  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const response = await api.get("/favorite");
        let isFavorited = false;
        response.data.forEach((fav) => {
          console.log("Favorite product:", fav.product); // 디버깅용 출력
          if (fav.product && fav.product.productId === product.productId) {
            isFavorited = true;
          }
        });
        setLike(isFavorited);
      } catch (error) {
        console.error("찜 여부 확인 실패", error);
      }
    };
    if (product) {
      if (user) {
        checkFavorite();
      } else {
      }
    }
  }, [product]);

  if (!product) {
    return <div className="container mt-5 text-center"></div>;
  }

  // 찜
  const toggleLike = async () => {
    try {
      setLoading(true);
      // 여기서 콘솔에 productId, userId 출력
      if (like) {
        // 찜 해제
        await api.delete(`/favorite/${product.productId}`);
        setLike(false);
      } else {
        // 찜 추가
        await api.post("/favorite", { productId: product.productId });
        setLike(true);
      }
    } catch (error) {
      console.error("찜 처리 실패", error);
    } finally {
      setLoading(false);
    }
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
    console.log(product.productId);
    const response = await api.delete(`/product/${product.productId}`);
    // 상품 삭제 후 업데이트

    if (response === 200) {
      alert("상품이 삭제되었습니다.");
    }
    navigate("/");
  };

  //메시지 보내기 (채팅방 생성)
  const createChatRoom = async () => {
    try {
      const response = await fetch("http://localhost:8090/chat/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
        body: new URLSearchParams({
          status: "OPEN",
          productId: product.productId,
          userId: currentUser.userId,
        }),
      });

      if (!response.ok) {
        throw new Error("채팅방 생성에 실패했습니다.");
      }

      const newRoom = await response.json();
      navigate(`/chat/${newRoom.chatRoomId}`);
    } catch (error) {
      console.error(error);
      alert("채팅방 생성하는 중 오류가 발생했습니다.");
    }
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
            {currentUser && product.user !== null && (
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

          {currentUser === null ? (
            <div></div>
          ) : (
            <div>
              {product.user?.userId === currentUser?.userId ? (
                <div className="d-flex gap-3">
                  {product.status === "판매완료" ? (
                    <>
                      <button className="btn btn-secondary w-10 mt-3" disabled>
                        수정하기
                      </button>
                      <button className="btn btn-secondary w-10 mt-3" disabled>
                        삭제하기
                      </button>
                    </>
                  ) : (
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
                  {product.status === "판매완료" ? (
                    <button
                      className="btn btn-secondary w-10 mt-3"
                      disabled
                      onClick={createChatRoom}
                    >
                      메시지 보내기
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger w-10 mt-3"
                      onClick={createChatRoom}
                    >
                      메시지 보내기
                    </button>
                  )}
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
