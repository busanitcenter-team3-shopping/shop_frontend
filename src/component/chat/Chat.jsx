import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMyContext } from "../../api/ContextApi";

const Chat = () => {
  const { chatRoomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [chatRoomData, setChatRoomData] = useState(null);
  const { currentUser } = useMyContext();

  useEffect(() => {
    const fetchChatRoomDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8090/chat/rooms/${chatRoomId}/details`
        );
        if (!response.ok) {
          throw new Error("채팅방 정보를 불러오는 데 실패했습니다.");
        }

        const chatRoomData = await response.json();
        setChatRoomData(chatRoomData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChatRoomDetails();

    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:8090/chat/rooms/${chatRoomId}/messages`
        );
        if (!response.ok) {
          throw new Error("채팅 메시지를 불러오는 데 실패했습니다.");
        }
        const messages = await response.json();
        setMessages(messages); // ✅ 메시지를 객체 형태로 저장
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();

    const ws = new WebSocket(
      `ws://localhost:8090/ws/chat?userId=${currentUser.userId}`
    );


    ws.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
    
      // ✅ 새 메시지를 기존 메시지 목록에 추가
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [chatRoomId, currentUser.userId]);

  const sendMessage = () => {
    if (socket && messageInput.trim() !== "") {
      const receiverId =
        currentUser.userId === chatRoomData.user2.userId
          ? chatRoomData.user1.userId
          : chatRoomData.user2.userId;
      const messageData = {
        senderId: currentUser.userId,
        receiverId: receiverId,
        chatRoomId: Number(chatRoomId),
        content: messageInput,
      };

      socket.send(JSON.stringify(messageData));

      setMessageInput(""); // 입력 필드 초기화
    }
  };
  return (
    <div>
      <h2>실시간 채팅</h2>

      <div>
      {messages.map((msg, index) => (
  <div key={index}>
    <strong>{msg.sender?.userId === currentUser.userId ? msg.sender?.username : msg.sender?.username}</strong>
    <br />
    {msg.content}
  </div>
))}
      </div>

      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="메시지를 입력하세요..."
      />
      <button onClick={sendMessage}>전송</button>
    </div>
  );
};

export default Chat;
