// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useMyContext } from "../../api/ContextApi";

// const Chat = () => {
//   const { chatRoomId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState("");
//   const [socket, setSocket] = useState(null);
//   const { currentUser } = useMyContext();

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8090/chat/rooms/${chatRoomId}/messages`
//         );
//         if (!response.ok) {
//           throw new Error("채팅 메시지를 불러오는 데 실패했습니다.");
//         }
//         const messages = await response.json();
//         setMessages(messages.map((msg) => msg.content)); // 기존 메시지를 UI에 표시
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchMessages();

//     const ws = new WebSocket(
//       `ws://localhost:8090/ws/chat?userId=${currentUser.userId}`
//     );

//     ws.onopen = () => {
//       console.log(`채팅방 ${chatRoomId} 연결 성공`);
//     };

//     ws.onmessage = (event) => {
//       console.log("메시지", event.data);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         JSON.parse(event.data).content,
//       ]);
//     };

//     ws.onerror = (error) => {
//       console.error("오류 발생: " + error);
//     };

//     ws.onclose = () => {
//       console.log("연결 종료");
//     };

//     setSocket(ws);

//     return () => {
//       ws.close();
//     };
//   }, [chatRoomId]);

//   const sendMessage = () => {
//     if (socket && messageInput.trim() !== "") {
//       const messageData = {
//         userId: currentUser.userId,
//         content: messageInput,
//         chatRoomId: Number(chatRoomId),
//       };

//       console.log("메시지 전송", messageData);
//       socket.send(JSON.stringify(messageData));
//       setMessageInput("");
//     }
//   };
//   return (
//     <div>
//       <h2>실시간 채팅</h2>

//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>{msg}</div>
//         ))}
//       </div>

//       <input
//         type="text"
//         value={messageInput}
//         onChange={(e) => setMessageInput(e.target.value)}
//         placeholder="메시지를 입력하세요..."
//       />
//       <button onClick={sendMessage}>전송</button>
//     </div>
//   );
// };

// export default Chat;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMyContext } from "../../api/ContextApi";

const Chat = () => {
  const { chatRoomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);
  const { currentUser } = useMyContext();

  useEffect(() => {
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

    ws.onopen = () => {
      console.log(`채팅방 ${chatRoomId} 연결 성공`);
    };

    ws.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      console.log("💬 메시지 수신:", receivedMessage);

      // ✅ 새 메시지를 기존 메시지 목록에 추가
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    ws.onerror = (error) => {
      console.error("❌ WebSocket 오류:", error);
    };

    ws.onclose = () => {
      console.log("🔌 WebSocket 연결 종료");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [chatRoomId, currentUser.userId]);

  const sendMessage = () => {
    if (socket && messageInput.trim() !== "") {
      const messageData = {
        senderId: currentUser.userId, // ✅ userId → senderId로 변경
        chatRoomId: Number(chatRoomId),
        content: messageInput,
      };

      console.log("📩 메시지 전송:", messageData);
      socket.send(JSON.stringify(messageData));

      // ✅ 화면에 즉시 추가 (로그인한 사용자의 메시지)
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...messageData, sender: { id: currentUser.userId } },
      ]);

      setMessageInput(""); // 입력 필드 초기화
    }
  };

  return (
    <div>
      <h2>실시간 채팅</h2>

      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>
              {msg.sender?.id === currentUser.userId ? "나" : "상대"}:
            </strong>{" "}
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
