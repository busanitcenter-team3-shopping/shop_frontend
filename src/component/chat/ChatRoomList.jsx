import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import "./chatRoomList.css";

const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:8090";

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await api.get("/chat/rooms");
        setChatRooms(response.data);
      } catch (error) {
        console.error("채팅방 로드 실패:", error);
      }
    };

    fetchChatRooms();
  }, []);
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">채팅방 목록</h2>
      <ul className="chat-list">
        {chatRooms.reverse().map((room) => (
          <li
            key={room.chatRoomId}
            className="list-group-item d-flex align-items-center justify-content-between chat-detail"
          >
            <div className="d-flex align-items-center chat-sta">
              {!room?.product ? (
                <img src="/no1.png" className="chat-img chat-no-img" />
              ) : (
                <img
                  src={`${BASE_URL}/product/images/${room?.product?.images[0]?.imageName}`}
                  className="chat-img"
                />
              )}
              <div className="chat-id">
              {room.product === null ? <p className="mb-0 fw-bold room_name">삭제된 상품입니다.</p> : <>
                    <p className="mb-0 fw-bold room_name">{room.name}</p>
                    <p className="mb-0 text-muted room_user_name d-flex align-items-center">
                      {room.user2 === null ? "탈퇴한 계정" : <>{room.user2.username}</>}
                    </p>
                  </>}
                  
              
              </div>
            </div>
              <button
                className="btn btn-primary btn-sm chat-btn"
                onClick={() => navigate(`/chat/${room.chatRoomId}`)}
              >
                입장
              </button>
          
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomList;
