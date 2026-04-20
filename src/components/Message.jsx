function Message({ text, sender, time }) {
  const formatTime = (date) => {
    if (!date) return "";
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={`message-row ${sender}`}>
      <div className="message-bubble">
        {text}
        <div className="bubble-meta">
          <span className="bubble-time">{formatTime(time)}</span>
          {sender === "user" && (
            <span className="read-ticks">✓✓</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;