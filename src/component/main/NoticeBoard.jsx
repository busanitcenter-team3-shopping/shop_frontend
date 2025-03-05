import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NoticeBoard.css";
import api from "../../api/axiosInstance";

function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // 백엔드 API를 통해 공지사항 목록을 불러오기
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await api.get("/notice/noticelist");
        // response.data는 공지사항 객체들의 배열이라고 가정
        setNotices(response.data);
      } catch (error) {
        console.error("공지사항 불러오기 실패:", error);
      }
    };

    fetchNotices();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("USER");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        // setIsAdmin(user.role === "ROLE_ADMIN");
        setIsAdmin(user.email === "ROLE_ADMIN");
      } catch (error) {
        console.error("USER 파싱 오류:", error);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, []);

  const toggleExpand = (noticeId) => {
    setNotices((prevNotices) =>
      prevNotices.map((notice) =>
        notice.noticeId === noticeId
          ? { ...notice, expanded: !notice.expanded }
          : notice
      )
    );
  };

  // 공지사항 삭제: 백엔드 DELETE 요청 후 상태 업데이트
  const deleteNotice = async (noticeId) => {
    console.log("삭제할 noticeId:", noticeId);
    try {
      await api.delete(`/notice/delete/${noticeId}`);
      setNotices((prev) =>
        prev.filter((notice) => notice.noticeId !== noticeId)
      );
    } catch (error) {
      console.error("공지사항 삭제 실패:", error);
    }
  };

  const startEdit = (notice) => {
    navigate("/notice-write", { state: { notice } });
  };

  return (
    <div className="notice-container">
      <h2 className="title">공지사항</h2>
      <div className="notice-list">
        {notices.map((notice) => (
          <div key={notice.noticeId} className="notice-item">
            <div
              className="notice-header"
              onClick={() => toggleExpand(notice.noticeId)}
            >
              <div className="notice-title">{notice.title}</div>
              <span className={`arrow ${notice.expanded ? "up" : "down"}`}>
                ▼
              </span>
            </div>
            {notice.expanded && (
              <div id="textarea" className="notice-content">
                <textarea
                  rows="5"
                  className="notice-textarea"
                  readOnly
                  value={notice.content}
                />
              </div>
            )}
            {isAdmin && (
              <>
                <button onClick={() => startEdit(notice)}>수정</button>
                <button onClick={() => deleteNotice(notice.noticeId)}>
                  삭제
                </button>
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
