import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./detailProduct.css";
import { Link } from "react-router-dom";

const DetailProduct = () => {
  const [mainImg, setMainImg] = useState("/lion.png");
  const [quantity, setQuantity] = useState(1);
  const [like, setLike] = useState(false);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="d-flex col">
          <div className="d-flex flex-column me-3 gap-1">
            <button className="imgbtn" onClick={() => setMainImg("/lion.png")}>
              <img src="/lion.png" className="mb-2 sub-img" />
            </button>
            <button className="imgbtn" onClick={() => setMainImg("/car.jpg")}>
              <img src="/car.jpg" className="mb-2 sub-img" />
            </button>
            <button
              className="imgbtn"
              onClick={() => setMainImg("/icecream.jpg")}
            >
              <img src="/icecream.jpg" className="mb-2 sub-img" />
            </button>
          </div>
          <img className="mainImg" src={mainImg} />
        </div>

        <div className="d-flex flex-column justify-content-center col ">
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="fw-bold">상품 제목(카메라)</h2>
            {/* 찜 추가 */}
            <img
              src={like ? "/colorHeart.png" : "/heart.png"}
              alt="찜"
              style={{ width: "30px", height: "30px" }}
              onClick={() => setLike(!like)}
            />
          </div>
          <p>
            판매자: <Link to="/brand">Canon</Link>
          </p>
          <p className="over-box">
            만연체는 문체의 이름에 걸맞게 서술의 호흡이 긴 문체로서, 상황을
            상세하고 장황하게 나타내고자 하거나 화자의 심정을 구체적으로
            묘사하고자 할 때, 즉 다각적인 묘사를 통해 작가의 정취를 고스란히
            독자에게 전달하고 싶을 때에 쓰인다. 이렇게 기나긴 서술과 묘사를
            추구하는 문체이니 만큼 문장이 시작되면 몇 줄에서 몇 십 줄은 지나거나
            때로는 아예 문단 하나가 통째로 끝나야 문장의 끝맺음이 이루어지고
            마침표가 찍히는 것을 볼 수 있다. 주로 소설, 연설문, 서간문, 기행문,
            일기 등, 정보 전달이나 가독성이 중요하기보다는 자유로운 서술 방식이
            허용되는 글에서 잘 쓰이는데, 장황하고 복잡한 서술을 즐겨쓰던 고전
            소설에서 만연체를 제법 자주 볼 수 있고, 의외로 법조계에서도 법령이
            적용되는 모든 상황들을 법령의 설명에 포함시키기 위해 만연체가 주로
            사용된다. 보다 구체적인 예시로는, 한국 문학에서 박태원의 방란장
            주인이 만연체의 끝판왕으로 꼽히고, 법정 판결문의 경우 일상생활에서
            접하게 되는 만연체 문장의 대표격이면서 중요성도 매우 높은 예시다.
            만연체라고 해서 무조건 길게 쓰기만 하면 되는 것은 아니고 표현력과
            가독성에 유의해야 하며, 간결체와의 대비가 매우 극적이므로 간결체와
            비교하여 살펴보는 것도 좋다.
          </p>
          <h3 className="fw-bold">180,000원</h3>

          <div className="d-flex align-items-center my-3">
            <button
              className="btn btn-outline-secondary"
              variant="outline-secondary"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              &lt;
            </button>
            <span className="mx-2">{quantity}</span>
            <button
              className="btn btn-outline-secondary"
              variant="outline-secondary"
              onClick={() => setQuantity(quantity + 1)}
            >
              &gt;
            </button>
          </div>

          <div className="d-flex gap-3">
            <button
              variant="outline-primary"
              className="btn btn-outline-warning w-10"
            >
              장바구니 담기
            </button>
            <button variant="primary" className="btn btn-outline-primary w-10">
              바로 구매
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
