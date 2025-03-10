import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useMyContext } from "../../api/ContextApi"; 
import "./chat.css";
import api from "../../api/axiosInstance";

const Chat = () => {
  const { chatRoomId } = useParams();
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [chatRoomData, setChatRoomData] = useState(null);
  const { currentUser, messages, setMessages } = useMyContext();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://10.100.202.18:8090/chat/rooms/${chatRoomId}/messages`
        );
        if (!response.ok) throw new Error("채팅 메시지를 불러오는 데 실패했습니다.");

        const fetchedMessages = await response.json();
        setMessages(fetchedMessages); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();

    const ws = new WebSocket(`ws://10.100.202.18:8090/ws/chat?userId=${currentUser.userId}`);

    ws.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, receivedMessage];
        return updatedMessages;
      });
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [chatRoomId, currentUser.userId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (socket && messageInput.trim() !== "") {
      const receiverId =
        currentUser.userId === chatRoomData?.user2?.userId
          ? chatRoomData?.user1?.userId
          : chatRoomData?.user2?.userId;

      const messageData = {
        senderId: currentUser.userId,
        receiverId: receiverId,
        chatRoomId: Number(chatRoomId),
        content: messageInput,
        isRead: false,
        timestamp: new Date().toISOString(),
      };

      socket.send(JSON.stringify(messageData));

      setMessages((prevMessages) => [...prevMessages, messageData]);

      setMessageInput("");
    }
  };

  useEffect(() => {
  }, [messages]);

  return (
    <div className="mt-2 container chatting-room">
      <div className="border p-3 rounded chatting" style={{ maxWidth: "800px", maxHeight: "400px", overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <div key={index} className={`d-flex mb-2 ${msg.sender?.userId === currentUser.userId ? "justify-content-end" : "justify-content-start"}`}>
            {msg.sender?.userId !== currentUser.userId && (
              <img src="/basicUser.png" className="me-2 rounded-circle" style={{ width: "40px", height: "40px" }} alt="프로필" />
            )}
            <div className={`p-2 rounded shadow-sm ${msg.sender?.userId === currentUser.userId ? "text-dark chatting-username" : "bg-light text-dark"}`} style={{ maxWidth: "100%", position: "relative" }}>
              <p className="mb-0">{msg.content}</p>
              {msg.sender?.userId === currentUser.userId && !msg.isRead && (
                <span className="unread-count">1</span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-group mt-3 chatting-serch">
        {chatRoomData?.user2 === null ? (
          <>
            <input type="text" className="form-control" disabled placeholder="탈퇴한 계정과 메시지를 입력할 수 없습니다." />
            <button disabled className="btn btn-primary">전송</button>
          </>
        ) : (
          <>
            <input
              type="text"
              className="form-control"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="메시지를 입력하세요..."
            />
            <button className="btn btn-primary" onClick={sendMessage}>전송</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
