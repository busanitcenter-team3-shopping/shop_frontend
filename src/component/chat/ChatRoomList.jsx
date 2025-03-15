import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import "./chatRoomList.css";
import { useMyContext } from "../../api/ContextApi";

const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const { currentUser, setUnreadCount, socket } = useMyContext();
  const navigate = useNavigate();

  const BASE_URL = "http://172.30.1.71:8090";

  // 채팅방 목록 및 unreadCount 가져오기
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await api.get("/chat/rooms");
        const rooms = response.data;

        const updatedRooms = await Promise.all(
          rooms.map(async (room) => {
            try {
              const unreadResponse = await api.get(
                `/chat/rooms/${room.chatRoomId}/unread-count?userId=${currentUser.userId}`
              );
              return { ...room, unreadCount: unreadResponse.data };
            } catch (error) {
              console.error("❌ 특정 채팅방 unreadCount 가져오기 실패:", error);
              return { ...room, unreadCount: 0 };
            }
          })
        );

        setChatRooms(updatedRooms);

        // 전체 안 읽은 메시지 개수 업데이트
        const totalUnread = updatedRooms.reduce(
          (acc, room) => acc + room.unreadCount,
          0
        );
        setUnreadCount(totalUnread);

        console.log("📢 전체 unreadCount 업데이트 완료:", totalUnread);
        console.log("채팅방 목록 불러오기 성공:", updatedRooms);
      } catch (error) {
        console.error("채팅방 목록 가져오기 실패:", error);
      }
    };

    fetchChatRooms();
  }, [currentUser.userId]);

  useEffect(() => {
    console.log("🚀 useEffect 실행됨!");
    console.log("🔎 현재 socket 값:", socket);

    if (!socket) {
      console.warn("⚠ socket이 null 또는 undefined입니다. 실행 중단!");
      return;
    }

    socket.onmessage = (event) => {
      console.log("📩 WebSocket 메시지 수신 이벤트 발생! 원본 데이터:", event);
      const data = JSON.parse(event.data);
      console.log("📩 실시간 메시지 수신:", data);

      const receivedChatRoomId = data.chatRoomId; // 🔍 chatRoomId 추출
      console.log(`🔎 받은 chatRoomId: ${receivedChatRoomId}`);

      setChatRooms((prevRooms) => {
        return prevRooms.map((room) => {
          if (room.chatRoomId == receivedChatRoomId) {
            console.log(`📩 채팅방(${room.chatRoomId}) unreadCount 증가`);
            return {
              ...room,
              unreadCount: data.unreadCount ?? (room.unreadCount || 0) + 1,
            };
          }
          return room;
        });
      });

      if (data.unreadCount !== undefined) {
        console.log(`📩 전체 안 읽은 메시지 업데이트: ${data.unreadCount}`);
        setUnreadCount(data.unreadCount);
      }
    };
  }, [socket]);

  // 채팅방 입장 시 unreadCount 초기화
  const handleEnterChatRoom = (chatRoomId) => {
    console.log("📩 채팅방 입장:", chatRoomId);
    navigate(`/chat/${chatRoomId}`);

    setChatRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.chatRoomId === chatRoomId ? { ...room, unreadCount: 0 } : room
      )
    );

    setUnreadCount((prev) => {
      const room = chatRooms.find((room) => room.chatRoomId === chatRoomId);
      return prev - (room?.unreadCount || 0);
    });
  };

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
                onClick={() => handleEnterChatRoom(room.chatRoomId)}
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
