import React, { useState } from "react";
import "./CustomerCenter.css";

const CustomerCenter = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("회원");

  const categories = ["회원", "배송", "상품", "기타"];

  const faqs = {
    회원: [
      {
        question: "회원가입은 어떻게 하나요?",
        answer:
          "회원가입은 홈페이지 상단의 회원가입 버튼을 눌러 진행할 수 있습니다.",
      },
      {
        question: "비밀번호를 잊어버렸어요.",
        answer: "로그인 페이지에서 비밀번호 찾기 기능을 이용해주세요.",
      },
    ],
    배송: [
      {
        question: "배송 기간은 얼마나 걸리나요?",
        answer: "일반적으로 2~3일 소요됩니다.",
      },
    ],
    상품: [
      {
        question: "상품 교환 및 환불이 가능한가요?",
        answer: "구매 후 7일 이내에는 교환 및 환불이 가능합니다.",
      },
    ],
    기타: [
      {
        question: "기타 문의는 어디서 하나요?",
        answer: "고객센터 전화 또는 1:1 문의 게시판을 이용해주세요.",
      },
    ],
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="customer-center-container">
      <h2 className="title">고객센터</h2>
      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="faq-list">
        {faqs[selectedCategory].map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className={`faq-question ${openIndex === index ? "open" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="toggle-icon">
                {openIndex === index ? "▼" : "▲"}
              </span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerCenter;
