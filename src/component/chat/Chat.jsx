import React, { useEffect, useState } from 'react'

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [socket,setSocket] = useState(null)

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8090/chat");

    ws.onopen = () => {
      console.log("연결 성공")
    };

    ws.onmessage = (event) => {
      console.log("메시지", event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.onerror = (error) => {
      console.error("오류 발생: " + error)
    };

    ws.onclose = () => {
      console.log("연결 종료");
    };

    setSocket(ws);

    return() => {
      ws.close();
    };
  },[]);

  const sendMessage = () => {
    if(socket && messageInput.trim() !== "") {
      socket.send(messageInput);
      setMessageInput("");
    }
  };
  return (
    <div>
      <h2>실시간 채팅</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
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
  )
}

export default Chat

