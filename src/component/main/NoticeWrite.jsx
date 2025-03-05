import React, { useState } from "react";
import "./NoticeWrite.css";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/axiosInstance";

function NoticeWrite() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingNotice = location.state?.notice; // 수정 모드면 notice 데이터 전달됨

  const [title, setTitle] = useState(editingNotice ? editingNotice.title : "");
  const [content, setContent] = useState(
    editingNotice ? editingNotice.content : ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const savedNotices = localStorage.getItem("notices");
    // const notices = savedNotices ? JSON.parse(savedNotices) : [];

    try {
      if (editingNotice) {
        // 수정: PUT /notice/update/{id} 엔드포인트 호출
        const response = await api.put(
          `/notice/update/${editingNotice.noticeId}`,
          {
            title,
            content,
          }
        );
      } else {
        // 신규 작성: POST /notice/create 엔드포인트 호출
        const response = await api.post("/notice/create", {
          title,
          content,
        });
      }
      navigate("/notice-board");
    } catch (error) {
      console.error("공지사항 저장 실패:", error);
    }
  };

  return (
    <div className="notice-write-container">
      <h2>{editingNotice ? "공지 수정" : "공지 작성"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목:</label>
          <input
            className="title1"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>내용:</label>
          <textarea
            className="notice-text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="button-group notice-btn">
          <button type="submit">저장</button>
          <button type="button" onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoticeWrite;
