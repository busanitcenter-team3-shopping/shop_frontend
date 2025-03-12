import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useMyContext } from "../../api/ContextApi";
import "./chat.css";
import api from "../../api/axiosInstance";

const Chat = ({ markMessagesAsRead }) => {
  const { chatRoomId } = useParams();
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [chatRoomData, setChatRoomData] = useState(null);
  const { currentUser, messages, setMessages } = useMyContext();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchChatRoomDetails = async () => {
      if (chatRoomId !== null) {
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
      } else {
        return;
      }
    };

    fetchChatRoomDetails();

    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:8090/chat/rooms/${chatRoomId}/messages`
        );
        if (!response.ok)
          throw new Error("채팅 메시지를 불러오는 데 실패했습니다.");

        const fetchedMessages = await response.json();
        setMessages(fetchedMessages);
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

  useEffect(() => {
    markMessagesAsRead(chatRoomId);
  }, [chatRoomId, markMessagesAsRead]);

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

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: { userId: currentUser.userId }, content: messageInput },
      ]);

      setMessageInput("");
    }
  };

  useEffect(() => {}, [messages]);

  //판매
  const handleSellProduct = async () => {
    const buyerId = chatRoomData.user1.userId;
    try {
      const response = await api.post(`/chat/purchase/${chatRoomId}`, {
        buyerId: buyerId,
      });

      if (response.status === 200) {
        alert("상품이 판매 되었습니다.");
        setChatRoomData((prev) => ({
          ...prev,
          product: { ...prev.product, status: "판매완료" },
        }));
      } else {
        throw new Error("상품 판매 실패했습니다.");
      }
    } catch (error) {
      console.error("판매 실패");
    }
  };

  return (
    <div className="mt-2 container cattiong-room">
      <div className="chatting-title">
        <div className="d-flex align-items-center">
          <img
            src="/basicUser.png"
            className="me-2 rounded-circle"
            style={{ width: "40px", height: "40px" }}
          ></img>

          {chatRoomData?.user2 === null ? (
            "탈퇴한 계정"
          ) : (
            <>
              {chatRoomData?.user2?.username === currentUser.username
                ? chatRoomData?.user1?.username
                : chatRoomData?.user2?.username}
            </>
          )}
        </div>
        {chatRoomData?.product?.status === undefined ? (
          <div></div>
        ) : (
          <>
            {chatRoomData?.user2?.username === currentUser.username ? (
              chatRoomData?.product?.status === "판매완료" ? (
                <div></div>
              ) : (
                <button className="btn btn-primary" onClick={handleSellProduct}>
                  판매하기
                </button>
              )
            ) : (
              <div></div>
            )}
          </>
        )}
      </div>

      <div
        className="border p-3 rounded chatting"
        style={{ maxWidth: "800px", maxHeight: "400px", overflowY: "auto" }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`d-flex mb-2 ${
              msg.sender?.userId === currentUser.userId
                ? "justify-content-end"
                : "justify-content-start"
            }`}
          >
            {msg.sender?.userId === currentUser.userId && !msg.isRead && (
              <div className="unread-count">1</div>
            )}
            {msg.sender?.userId !== currentUser.userId && (
              <img
                src="/basicUser.png"
                className="me-2 rounded-circle"
                style={{ width: "40px", height: "40px" }}
              ></img>
            )}
            <div
              className={`p-2 rounded shadow-sm ${
                msg.sender?.userId === currentUser.userId
                  ? "text-dark chatting-username"
                  : "bg-light text-dark"
              }`}
              style={{ maxWidth: "100%", position: "relative" }}
            >
              <p className="mb-0">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-group mt-3 chatting-serch">
        {chatRoomData?.user2 === null ? (
          <>
            <input
              type="text"
              className="form-control "
              disabled
              placeholder="탈퇴한 계정과 메시지를 입력할수 없습니다."
            />{" "}
            <button disabled className="btn btn-primary">
              전송
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              className="form-control "
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="메시지를 입력하세요..."
            />
            <button className="btn btn-primary" onClick={sendMessage}>
              전송
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
