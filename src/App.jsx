import { useState } from "react";
import ChatBox from "./components/ChatBox";
import InputBox from "./components/InputBox";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    { text: "Hey 👋 I'm your mini chat bot!", sender: "bot", time: new Date() }
  ]);
  const [typing, setTyping] = useState(false);

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userText = text.toLowerCase();
    setMessages((prev) => [...prev, { text, sender: "user", time: new Date() }]);
    setTyping(true);

    setTimeout(() => {
      let reply = "";
      if (userText.includes("hi") || userText.includes("hello")) {
        reply = random(["Hey 👋", "Hello there!", "Hi 😄 how are you?"]);
      } else if (userText.includes("how are")) {
        reply = random(["I'm doing great 😄", "All good here! What about you?", "Feeling awesome today 🚀"]);
      } else if (userText.includes("name")) {
        reply = "I'm your mini AI bot 🤖, you can call me whatever you want";
      }else if (userText.includes("what about")) {
        reply = random(["I'm doing great 😄", "All good here!", "Feeling awesome today 🚀"]);
      }else if (userText.includes("thankyou")) {
        reply = random(["😊", "Welcome", "🫱🏼‍🫲🏼"]);
      }else if (userText.includes("time")) {
        reply = `⏰ ${new Date().toLocaleTimeString()}`;
      } else if (userText.includes("joke")) {
        reply = random([
          "Why do developers hate bugs? 🐛 Because they're not features 😂",
          "I told my code a joke… it didn't compile 😭",
          "Debugging: removing bugs you created yourself 😅"
        ]);
      } else if (userText.includes("bye")) {
        reply = random(["Bye 👋", "See you soon!", "Take care 😄"]);
      } else if (userText.includes("ok")) {
        reply = random(["🫱🏼‍🫲🏼"]);
      } else {
        reply = random(["Tell me more!", "Nice 😄", "Hmm 👀", "I see!"]);
      }

      setMessages((prev) => [...prev, { text: reply, sender: "bot", time: new Date() }]);
      setTyping(false);
    }, 800);
  };

  return (
    <div className="app">
      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">
          <div className="header-left">
            <div className="avatar-wrap">
              <div className="avatar">🤖</div>
              <span className="online-dot" />
            </div>
            <div className="header-info">
              <h4>Chat Bot</h4>
              <span className="status">Online</span>
            </div>
          </div>
          <div className="header-actions">
            <button className="icon-btn" title="Call">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 14z" />
              </svg>
            </button>
            <button className="icon-btn" title="Video">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" />
              </svg>
            </button>
            <button className="icon-btn" title="More">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
              </svg>
            </button>
          </div>
        </div>

        <ChatBox messages={messages} typing={typing} />
        <InputBox sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default App;