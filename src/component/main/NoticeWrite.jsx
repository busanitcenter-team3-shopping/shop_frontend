import React, { useState } from "react";
import "./NoticeWrite.css";
import { useNavigate, useLocation } from "react-router-dom";

function NoticeWrite() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingNotice = location.state?.notice; // 수정 모드면 notice 데이터 전달됨

  const [title, setTitle] = useState(editingNotice ? editingNotice.title : "");
  const [content, setContent] = useState(
    editingNotice ? editingNotice.content : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit triggered", { title, content });

    const savedNotices = localStorage.getItem("notices");
    const notices = savedNotices ? JSON.parse(savedNotices) : [];

    if (editingNotice) {
      // 수정: 해당 notice의 id를 기준으로 업데이트
      const updatedNotices = notices.map((notice) =>
        notice.id === editingNotice.id ? { ...notice, title, content } : notice
      );
      localStorage.setItem("notices", JSON.stringify(updatedNotices));
      console.log("Notice updated", updatedNotices);
    } else {
      // 신규 작성: 고유 id 생성 후 추가
      const newNotice = {
        id: Date.now(),
        title,
        content,
        expanded: false,
      };
      notices.push(newNotice);
      localStorage.setItem("notices", JSON.stringify(notices));
      console.log("New notice added", newNotice);
    }

    // 저장 후 공지사항 목록 페이지로 이동
    navigate("/notice-board");
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
