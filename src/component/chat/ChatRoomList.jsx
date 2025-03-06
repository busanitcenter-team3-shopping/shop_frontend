import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await fetch("http://localhost:8090/chat/rooms");
        if (!response.ok) {
          throw new Error("채팅방 목록을 불러오는데 실패했습니다.");
        }
        const rooms = await response.json();
        setChatRooms(rooms);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChatRooms();
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
