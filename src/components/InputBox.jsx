import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";

function InputBox({ sendMessage }) {
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const handleEmojiClick = (emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <style>{`
        .input-area {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: #ffffff;
          border-top: 1px solid #e5e7eb;
        }

        .input-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          background: #f3f4f6;
          border-radius: 24px;
          padding: 4px 12px;
          gap: 8px;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .input-wrap:focus-within {
          background: #ffffff;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59,130,246,0.1);
        }

        .input-wrap input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #1f2937;
          font-size: 14px;
          padding: 10px 0;
          font-family: inherit;
        }

        .input-wrap input::placeholder {
          color: #9ca3af;
        }

        .emoji-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
        }

        .emoji-btn:hover {
          background: #e5e7eb;
          color: #3b82f6;
          transform: scale(1.1);
        }

        .attach-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
        }

        .attach-btn:hover {
          background: #e5e7eb;
          color: #3b82f6;
          transform: scale(1.05);
        }

        .send-btn {
          background: #3b82f6;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: white;
          flex-shrink: 0;
        }

        .send-btn:hover {
          background: #2563eb;
          transform: scale(1.05);
        }

        .mic-btn {
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #6b7280;
          flex-shrink: 0;
        }

        .mic-btn:hover {
          background: #e5e7eb;
          color: #3b82f6;
          transform: scale(1.05);
        }

        /* Emoji Picker Styles */
        .emoji-picker-container {
          position: absolute;
          bottom: 80px;
          left: 20px;
          z-index: 1000;
          animation: slideUp 0.2s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Fix emoji picker internal alignment */
        .epr-main {
          border-radius: 16px !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1) !important;
          --epr-bg-color: #ffffff !important;
          --epr-category-label-bg-color: #ffffff !important;
        }

        /* Fix search input alignment */
        .epr-header {
          padding: 12px !important;
        }

        .epr-search-container {
          margin-bottom: 0 !important;
        }

        input.epr-search {
          padding: 10px 36px !important;
          font-size: 14px !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 12px !important;
          background: #f9fafb !important;
          color: #1f2937 !important;
        }

        input.epr-search::placeholder {
          color: #9ca3af !important;
        }

        input.epr-search:focus {
          border-color: #3b82f6 !important;
          outline: none !important;
          background: #ffffff !important;
        }

        /* Fix search icon position */
        .epr-search-container .epr-search-icon {
          left: 24px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
        }

        /* Remove duplicate search text */
        .epr-search-container .epr-emoji-search::before {
          display: none !important;
        }

        /* Fix category labels */
        .epr-emoji-category-label {
          font-size: 12px !important;
          font-weight: 600 !important;
          color: #374151 !important;
          background: #ffffff !important;
        }

        /* Fix emoji list padding */
        .epr-body {
          padding: 8px !important;
        }
      `}</style>

      <div className="input-area">
        <div className="input-wrap">
          {/* Emoji button with picker */}
          <div style={{ position: "relative" }}>
            <button 
              className="emoji-btn" 
              title="Emoji"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </button>
            
            {showEmojiPicker && (
              <div ref={emojiPickerRef} className="emoji-picker-container">
                <EmojiPicker 
                  onEmojiClick={handleEmojiClick}
                  width={350}
                  height={400}
                  theme="light"
                  lazyLoadEmojis={true}
                />
              </div>
            )}
          </div>

          <input
            value={input}
            placeholder="Type a message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          {/* Attach button */}
          <button className="attach-btn" title="Attach">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
            </svg>
          </button>
        </div>

        {/* Send or Mic */}
        {input.trim() ? (
          <button className="send-btn" onClick={handleSend} title="Send">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </button>
        ) : (
          <button className="mic-btn" title="Voice message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <rect x="9" y="2" width="6" height="11" rx="3" />
              <path d="M19 10a7 7 0 01-14 0" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
        )}
      </div>
    </>
  );
}

export default InputBox;