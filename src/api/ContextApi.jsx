// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import api from "./axiosInstance";

// const ContextApi = createContext();

// export const ContextProvider = ({ children }) => {
//   // 로컬 토큰 가져오기
//   const getToken = localStorage.getItem("JWT_TOKEN")
//     ? JSON.stringify(localStorage.getItem("JWT_TOKEN"))
//     : null;

//   const [token, setToken] = useState(getToken);
//   const [messages, setMessages] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const socketRef = useRef();
//   const [selectedChatRoomId, setSelectedChatRoomId] = useState(
//     localStorage.getItem("chatRoomId") || null
//   );

//   // 현재 로그인 유저 관리
//   const [currentUser, setCurrentUser] = useState(() => {
//     return JSON.parse(localStorage.getItem("currentUser")) || null;
//   });

//   // currentUser가 변경될 때마다 localStorage에 저장
//   useEffect(() => {
//     if (currentUser) {
//       localStorage.setItem("currentUser", JSON.stringify(currentUser));
//     } else {
//       localStorage.removeItem("currentUser");
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     const fetchUnreadCount = async () => {
//       if (!currentUser?.userId) return;
//       try {
//         const response = await api.get(
//           `/chat/rooms/unread?userId=${currentUser.userId}`
//         );
//         setUnreadCount(response.data);
//       } catch (error) {
//         console.error("안 읽은 메시지 수 불러오기 실패:", error);
//       }
//     };
//     fetchUnreadCount();
//   }, [currentUser, messages]);

//   useEffect(() => {
//     if (!socketRef.current) return;
  
//     console.log("✅ WebSocket 활성화됨!");
  
//     socketRef.current.addEventListener("message", (event) => {
//       const receivedData = JSON.parse(event.data);
//       console.log("📩 WebSocket 메시지 수신:", receivedData);
  
//       // 🔹 실시간으로 isRead 처리
//       if (receivedData.event === "messageRead") {
//         console.log(`📩 읽음 처리 감지: ${receivedData}`);
  
//         setMessages((prevMessages) =>
//           prevMessages.map((msg) =>
//             msg.chatRoomId === receivedData.chatRoomId &&
//             msg.receiverId === receivedData.userId &&
//             !msg.isRead
//               ? { ...msg, isRead: true }
//               : msg
//           )
//         );
//       }
//     });
  
//     return () => {
//       if (socketRef.current) {
//         socketRef.current.removeEventListener("message");
//       }
//     };
//   }, [socketRef.current]);
  

//   const fetchUser = async () => {
//     const user = JSON.parse(localStorage.getItem("USER"));

//     if (user?.email) {
//       try {
//         const { data } = await api.get(`/user`);
//         setCurrentUser(data);
//       } catch (error) {
//         console.error("Error fetching current user", error);
//       }
//     }
//   };

//   // 처음 시작시 혹은 토큰이 바뀔 때 유저 정보 가져오기
//   useEffect(() => {
//     if (token) {
//       fetchUser();
//     }
//   }, [token]);

//   const markAsRead = async (chatRoomId) => {
//     setMessages((prevMessages) => {
//       const updatedMessages = prevMessages.map((msg) =>
//         msg.chatRoomId === chatRoomId && msg.receiverId === currentUser.userId
//           ? { ...msg, isRead: true }
//           : msg
//       );
//       return [...updatedMessages];
//     });
//     try {
//       console.log("markAsRead :" + chatRoomId);
      
//       await api.post(
//         `/chat/rooms/${chatRoomId}/mark-as-read?userId=${currentUser.userId}`
//       );

//       setUnreadCount((prev) => Math.max(prev - 1, 0));

//       console.log(`✅ 채팅방(${chatRoomId}) 메시지 읽음 처리 완료`);
//     } catch (error) {
//       console.error("❌ 메시지 읽음 처리 실패:", error);
//     }
//   };

//   useEffect(() => {
//     if (selectedChatRoomId) {
//       localStorage.setItem("chatRoomId", selectedChatRoomId);
//     }
//   }, [selectedChatRoomId]);

//   useEffect(() => {
//     if (!currentUser?.userId) return; // 유저가 없으면 실행 X

//     const chatRoomId = selectedChatRoomId || "global";

//     if (socketRef.current) {
//       const previousChatRoomId = sessionStorage.getItem("activeChatRoom");

//       if (previousChatRoomId !== chatRoomId) {
//         console.log("🔴 기존 WebSocket 닫기 (채팅방 변경 감지)");
//         socketRef.current.close();
//         socketRef.current = null;
//       }
//     }

//     const connectWebSocket = () => {
//       console.log("🌐 새로운 WebSocket 연결 시작...");

//       const ws = new WebSocket(
//         `ws://172.30.1.71:8090/ws/chat?userId=${currentUser.userId}&chatRoomId=${chatRoomId}`
//       );
//       console.log("🌐 WebSocket 연결 URL:", ws);

//       ws.onopen = () => {
//         console.log("✅ WebSocket 연결 성공");
//         socketRef.current = ws;
//         sessionStorage.setItem("activeChatRoom", chatRoomId);
//       };

//       ws.onmessage = async (event) => {
//         const receivedData =
//           typeof event.data === "string" ? JSON.parse(event.data) : event.data;
//         const receivedMessage = receivedData.message;
//         const chatRoomId = receivedData.chatRoomId;

//         console.log(
//           `📩 실시간 메시지 수신: 채팅방(${chatRoomId}), isRead: ${receivedMessage.isRead}`
//         );

//         setMessages((prevMessages) => {
//           const updatedMessages = [...prevMessages, receivedMessage];
//           return updatedMessages.map((msg) => ({
//             ...msg,
//             senderId: msg.sender?.userId || msg.senderId,
//             receiverId: msg.receiver?.userId || msg.receiverId,
//             isMine:
//               (msg.sender?.userId || msg.senderId) === currentUser?.userId,
//             isRead: receivedMessage.isRead,
//           }));
//         });

//         // 🔹 메시지 읽음 이벤트 처리
//         if (receivedData.event === "messageRead") {
//           setMessages((prevMessages) =>
//             prevMessages.map((msg) =>
//               msg.receiverId === receivedData.userId && !msg.isRead
//                 ? { ...msg, isRead: true }
//                 : msg
//             )
//           );
//         }

//         // 🔹 현재 유저가 해당 채팅방에 있는지 확인하고 읽음 처리 API 호출
//         const isUserInRoom = await api.get(
//           `/chat/rooms/${receivedData.chatRoomId}/isUserInRoom?userId=${currentUser.userId}`
//         );

//         if (isUserInRoom.data) {
//           markAsRead(receivedData.chatRoomId);
//         }
//       };

//       ws.onclose = (event) => {
//         console.log("❌ WebSocket 연결 종료", event.code, event.reason);
//         socketRef.current = null;
//         sessionStorage.removeItem("activeChatRoom");
//       };

//       ws.onerror = (error) => {
//         console.error("🔴 WebSocket 오류:", error);
//       };
//     };

//     connectWebSocket();
//   }, [currentUser?.userId, selectedChatRoomId]);

//   return (
//     <ContextApi.Provider
//       value={{
//         token,
//         setToken,
//         currentUser,
//         setCurrentUser,
//         messages,
//         setMessages,
//         unreadCount,
//         setUnreadCount,
//         socket: socketRef.current,
//         setSelectedChatRoomId,
//         selectedChatRoomId,
//       }}
//     >
//       {children}
//     </ContextApi.Provider>
//   );
// };

// // useMyContext() 컨텍스트 사용
// export const useMyContext = () => {
//   return useContext(ContextApi);
// };
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
  // 로컬 토큰 가져오기
  const getToken = localStorage.getItem("JWT_TOKEN")
    ? JSON.stringify(localStorage.getItem("JWT_TOKEN"))
    : null;

  const [token, setToken] = useState(getToken);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const socketRef = useRef();
  const [selectedChatRoomId, setSelectedChatRoomId] = useState(
    localStorage.getItem("chatRoomId") || null
  );

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

  // 안 읽은 메시지 수 가져오기
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

  // 처음 시작시 혹은 토큰이 바뀔 때 유저 정보 가져오기
  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  // ✅ 실시간 메시지 읽음 처리
  const markAsRead = async (chatRoomId) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.chatRoomId === chatRoomId && msg.receiverId === currentUser.userId
          ? { ...msg, isRead: true }
          : msg
      )
    );

    try {
      console.log("markAsRead :" + chatRoomId);
      await api.post(
        `/chat/rooms/${chatRoomId}/mark-as-read?userId=${currentUser.userId}`
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
      console.log(`✅ 채팅방(${chatRoomId}) 메시지 읽음 처리 완료`);
    } catch (error) {
      console.error("❌ 메시지 읽음 처리 실패:", error);
    }
  };

  useEffect(() => {
    if (selectedChatRoomId) {
      localStorage.setItem("chatRoomId", selectedChatRoomId);
    }
  }, [selectedChatRoomId]);

  useEffect(() => {
    if (!currentUser?.userId) return;

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
        `ws://172.30.1.71:8090/ws/chat?userId=${currentUser.userId}&chatRoomId=${chatRoomId}`
      );
      console.log("🌐 WebSocket 연결 URL:", ws);

      ws.onopen = () => {
        console.log("✅ WebSocket 연결 성공");
        socketRef.current = ws;
        sessionStorage.setItem("activeChatRoom", chatRoomId);
      };

      ws.onmessage = async (event) => {
        const receivedData = JSON.parse(event.data);
        console.log("📩 실시간 메시지 수신:", receivedData);

        if (receivedData.event === "messageRead") {
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.chatRoomId === receivedData.chatRoomId &&
              msg.receiverId === receivedData.userId &&
              !msg.isRead
                ? { ...msg, isRead: true }
                : msg
            )
          );
        } else {
          setMessages((prevMessages) => [...prevMessages, receivedData.message]);
        }

        const isUserInRoom = await api.get(
          `/chat/rooms/${receivedData.chatRoomId}/isUserInRoom?userId=${currentUser.userId}`
        );

        if (isUserInRoom.data) {
          markAsRead(receivedData.chatRoomId);
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
        selectedChatRoomId,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

// useMyContext() 컨텍스트 사용
export const useMyContext = () => {
  return useContext(ContextApi);
};
