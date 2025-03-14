import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import api from "./axiosInstance";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  //로컬 토큰 들고오기
  const getToken = localStorage.getItem("JWT_TOKEN")
    ? JSON.stringify(localStorage.getItem("JWT_TOKEN"))
    : null;

  const [token, setToken] = useState(getToken);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const socketRef = useRef();
  const [selectedChatRoomId, setSelectedChatRoomId] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);

  // 현재 로그인 유저 관리
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
  });

  // currentUser가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (!currentUser?.userId) return;
      try {
        const response = await api.get(
          `/chat/rooms/unread?userId=${currentUser.userId}`
        );
        setUnreadCount(response.data);
      } catch (error) {
        console.error("안 읽은 메시지 수 불러오기 실패:", error);
      }
    };
    fetchUnreadCount();
  }, [currentUser, messages]);

  const fetchUser = async () => {
    const user = JSON.parse(localStorage.getItem("USER"));

    if (user?.email) {
      try {
        const { data } = await api.get(`/user`);

        setCurrentUser(data);
      } catch (error) {
        console.error("Error fetching current user", error);
      }
    }
  };

  // 처음 시작시 혹은 토큰이 바뀔때마다 유저정보 가져오기
  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  useEffect(() => {
    if (!currentUser?.userId) return; // 유저가 없으면 실행 X

    const chatRoomId = selectedChatRoomId || "global";

    if (socketRef.current) {
      const previousChatRoomId = sessionStorage.getItem("activeChatRoom");

      if (previousChatRoomId !== chatRoomId) {
        console.log("🔴 기존 WebSocket 닫기 (채팅방 변경 감지)");
        socketRef.current.close();
        socketRef.current = null;
      }
    }

    const connectWebSocket = () => {
      console.log("🌐 새로운 WebSocket 연결 시작...");

      const ws = new WebSocket(
        `ws://localhost:8090/ws/chat?userId=${currentUser.userId}&chatRoomId=${chatRoomId}`
      );
      console.log("🌐 WebSocket 연결 URL:", ws);

      ws.onopen = () => {
        console.log("✅ WebSocket 연결 성공");
        socketRef.current = ws;
        sessionStorage.setItem("activeChatRoom", chatRoomId);

        if (selectedChatRoomId) {
          api.post(
            `/chat/rooms/${selectedChatRoomId}/mark-as-read?userId=${currentUser.userId}`
          );
        }
      };

      const markAsRead = async (chatRoomId) => {
        try {
          await api.post(
            `/chat/rooms/${chatRoomId}/mark-as-read?userId=${currentUser.userId}`
          );

          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.chatRoomId === chatRoomId ? { ...msg, isRead: true } : msg
            )
          );

          console.log(`✅ 채팅방(${chatRoomId}) 메시지 읽음 처리 완료`);
        } catch (error) {
          console.error("❌ 메시지 읽음 처리 실패:", error);
        }
      };

      ws.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);

        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, receivedMessage.message];
          return updatedMessages.map((msg) => ({
            ...msg,
            senderId: msg.sender?.userId || msg.senderId,
            receiverId: msg.receiver?.userId || msg.receiverId,
            isMine:
              (msg.sender?.userId || msg.senderId) === currentUser?.userId,
            isRead: msg.isRead || msg.isMine,
          }));
        });

        if (selectedChatRoomId === receivedMessage.message.chatRoomId) {
          markAsRead(receivedMessage.message.chatRoomId);
        }
      };

      ws.onclose = (event) => {
        console.log("❌ WebSocket 연결 종료", event.code, event.reason);
        socketRef.current = null;
        sessionStorage.removeItem("activeChatRoom");
      };

      ws.onerror = (error) => {
        console.error("🔴 WebSocket 오류:", error);
      };
    };

    connectWebSocket();
  }, [currentUser?.userId, selectedChatRoomId]);

  return (
    <ContextApi.Provider
      value={{
        token,
        setToken,
        currentUser,
        setCurrentUser,
        messages,
        setMessages,
        unreadCount,
        setUnreadCount,
        socket: socketRef.current,
        setSelectedChatRoomId,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

// useMyContext() 컨텍스트 사용
export const useMyContext = () => {
  const context = useContext(ContextApi);

  return context;
};
