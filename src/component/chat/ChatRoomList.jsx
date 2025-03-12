import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import "./chatRoomList.css";
import { useMyContext } from "../../api/ContextApi";

const ChatRoomList = ({ setUnreadCounts }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const { currentUser } = useMyContext();
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:8090";

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await api.get("/chat/rooms");
        const rooms = response.data;

        // Promise.all은 모든 api 응답을 처리하는거거
        const updatedRooms = await Promise.all(
          rooms.map(async (room) => {
            try {
              const unreadResponse = await api.get(
                `/chat/rooms/${room.chatRoomId}/unread-count?userId=${currentUser.userId}`
              );
              return { ...room, unreadCount: unreadResponse.data };
            } catch (error) {
              return { ...room, unreadCount: 0 };
            }
          })
        );
        setChatRooms(updatedRooms);

        const totalUnread = updatedRooms.reduce(
          (acc, room) => acc + room.unreadCount,
          0
        );
        setUnreadCounts(totalUnread);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChatRooms();
  }, [currentUser.userId]);

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
                {room.product === null ? (
                  <p className="mb-0 fw-bold room_name">삭제된 상품입니다.</p>
                ) : (
                  <>
                    <p className="mb-0 fw-bold room_name">{room.name}</p>
                    <p className="mb-0 text-muted room_user_name d-flex align-items-center">
                      {room.user2 === null ? (
                        "탈퇴한 계정"
                      ) : (
                        <>{room.user2.username}</>
                      )}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              {room.unreadCount > 0 && (
                <div
                  className="bg-warning rounded-circle text-center unread-badge"
                  style={{ width: "25px", height: "25px" }}
                >
                  {room.unreadCount}
                </div>
              )}
              <button
                className="btn btn-primary btn-sm chat-btn"
                onClick={() => navigate(`/chat/${room.chatRoomId}`)}
              >
                입장
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomList;
