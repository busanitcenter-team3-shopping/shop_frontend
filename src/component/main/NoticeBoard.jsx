import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NoticeBoard.css";

function NoticeBoard() {
  const [notices, setNotices] = useState(() => {
    const savedNotices = localStorage.getItem("notices");
    return savedNotices
      ? JSON.parse(savedNotices)
      : [
          {
            id: 1,
            title: "공지 1",
            content: "공지 1의 내용입니다.",
            expanded: false,
          },
          {
            id: 2,
            title: "공지 2",
            content: "공지 2의 내용입니다.",
            expanded: false,
          },
          {
            id: 3,
            title: "공지 3",
            content: "공지 3의 내용입니다.",
            expanded: false,
          },
          {
            id: 4,
            title: "공지 4",
            content: "공지 4의 내용입니다.",
            expanded: false,
          },
        ];
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("notices", JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    const storedUser = localStorage.getItem("USER");
    console.log(storedUser);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        // setIsAdmin(user.role === "ROLE_ADMIN");
        setIsAdmin(user.email === "ROLE_ADMIN")
      } catch (error) {
        console.error("USER 파싱 오류:", error);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, []);

  const toggleExpand = (id) => {
    setNotices((prev) =>
      prev.map((notice) =>
        notice.id === id ? { ...notice, expanded: !notice.expanded } : notice
      )
    );
  };

  const deleteNotice = (id) => {
    setNotices((prev) => prev.filter((notice) => notice.id !== id));
  };

  const startEdit = (notice) => {
    navigate("/notice-write", { state: { notice } });
  };

  return (
    <div className="notice-container">
      <h2 className="title">공지사항</h2>
      <div className="notice-list">
        {notices.map((notice) => (
          <div key={notice.id} className="notice-item">
            <div
              className="notice-header"
              onClick={() => toggleExpand(notice.id)}
            >
              <div className="notice-title">{notice.title}</div>
              <span className={`arrow ${notice.expanded ? "up" : "down"}`}>
                ▼
              </span>
            </div>
            {notice.expanded && (
              <div id="textarea" contentEditable className="notice-content">
                <textarea className="notice-textarea">
                  {notice.content}
                </textarea>
              </div>
            )}
            {isAdmin && (
              <>
                <button onClick={() => startEdit(notice)}>수정</button>
                <button onClick={() => deleteNotice(notice.id)}>삭제</button>
              </>
            )}
          </div>
        ))}
      </div>
      {isAdmin && (
        <div className="notice-buttons">
          <button
            className="notice-button"
            onClick={() => navigate("/notice-write")}
          >
            글쓰기
          </button>
        </div>
      )}
    </div>
  );
}

export default NoticeBoard;
