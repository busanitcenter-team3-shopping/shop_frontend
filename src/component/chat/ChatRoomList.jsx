import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";

const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await api.get("/chat/rooms");
        setChatRooms(response.data);
      } catch (error) {
        console.error("채팅방 로드 실패:", error);
      }
    };

    fetchChatRooms(); // useEffect 내부에서 함수 실행
  }, []);

  return (
    <div>
      <h2>채팅방 목록</h2>
      <ul>
        {chatRooms.map((room) => (
          <li key={room.chatRoomId}>
            <button onClick={() => navigate(`/chat/${room.chatRoomId}`)}>
              채팅방 {room.chatRoomId} - {room.status}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomList;
