import { useEffect, useRef } from "react";
import Message from "./Message";

function ChatBox({ messages, typing }) {
  const endRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div className="chat-box">
      <div className="date-separator">
        <span>Today</span>
      </div>

      {messages.map((msg, index) => (
        <Message key={index} {...msg} />
      ))}

      {typing && (
        <div className="typing-row">
          <div className="typing-bubble">
            <span /><span /><span />
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}

export default ChatBox;