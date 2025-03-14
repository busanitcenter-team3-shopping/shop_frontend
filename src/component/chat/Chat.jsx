import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMyContext } from "../../api/ContextApi";
import "./chat.css";
import api from "../../api/axiosInstance";
import { use } from "react";

const Chat = () => {
  const { chatRoomId } = useParams();
  const [messageInput, setMessageInput] = useState("");
  const [chatRoomData, setChatRoomData] = useState(null);
  const [currentChatRoomId, setCurrentChatRoomId] = useState(chatRoomId);
  const {
    currentUser,
    messages,
    setMessages,
    setUnreadCount,
    socket,
    setSelectedChatRoomId,
  } = useMyContext();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (chatRoomId) {
      localStorage.setItem("chatRoomId", chatRoomId);
      setCurrentChatRoomId(chatRoomId);
    } else {
      const storedChatRoomId = localStorage.getItem("chatRoomId");
      if (storedChatRoomId) {
        setCurrentChatRoomId(storedChatRoomId);
      }
    }
  }, [chatRoomId]);

  useEffect(() => {
    setMessages([]);
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

        console.log("🔵 API로 받은 메시지:", fetchedMessages);

        setMessages((prevMessages) => {
          // 기존 메시지와 새로운 메시지를 비교하여 업데이트
          const newMessages = fetchedMessages.filter(
            (msg) =>
              !prevMessages.some(
                (prevMsg) => prevMsg.messageId === msg.messageId
              )
          );
          return [...prevMessages, ...newMessages];
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [chatRoomId, currentUser.userId, setMessages]);

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

  useEffect(() => {
    if (chatRoomId) {
      setSelectedChatRoomId(chatRoomId);
    }

    return () => {
      setSelectedChatRoomId(null);
    };
  }, [chatRoomId]);

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
              msg.senderId === currentUser.userId
                ? "justify-content-end"
                : "justify-content-start"
            }`}
          >
            {msg.senderId === currentUser.userId && !msg.isRead && (
              <div className="unread-count">1</div>
            )}
            {msg.senderId !== currentUser.userId && (
              <img
                src="/basicUser.png"
                className="me-2 rounded-circle"
                style={{ width: "40px", height: "40px" }}
              ></img>
            )}
            <div
              className={`p-2 rounded shadow-sm ${
                msg.senderId === currentUser.userId
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
