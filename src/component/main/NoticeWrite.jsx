import React, { useState } from "react";
import "./NoticeWrite.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function NoticeWrite() {
  const navigate = useNavigate();
  const location = useLocation();
  const existingNotice = location.state?.notice || { title: "", content: "" };

  const [title, setTitle] = useState(existingNotice.title);
  const [content, setContent] = useState(existingNotice.content);

  const handleSave = () => {
    console.log("Saved Notice:", { title, content });
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="notice-write-container">
      <h2 className="title">
        {existingNotice.title ? "공지 수정" : "공지 작성"}
      </h2>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="notice-input"
      />
      <textarea
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="notice-textarea"
      />
      <button onClick={handleSave} className="notice-save-button">
        저장
      </button>
    </div>
  );
}

export default NoticeWrite;
