"use client";

import { useState } from "react";
import axios from "axios";

export default function App() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://13.209.91.211:8000/news/chatting/",
        { question }
      );
      const newMessage = {
        question: question,
        answer: response.data.answer,
      };
      setChatHistory((prevHistory) => [...prevHistory, newMessage]);
      setQuestion(""); // 질문 입력 필드 초기화
    } catch (error) {
      setError("Error fetching the answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" rounded-md border-2 p-2">
      <h1>뉴스에 대해 궁금한 것을 물어보세요!</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={question}
          onChange={handleInputChange}
          placeholder="Enter your question"
          style={{ padding: "10px", width: "300px" }}
        />
        <button type="submit" style={{ padding: "10px", marginLeft: "10px" }}>
          submit
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div
        style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}
      >
        {chatHistory.map((chat, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <div style={{ fontWeight: "bold" }}>You:</div>
            <div style={{ marginBottom: "5px" }}>{chat.question}</div>
            <div style={{ fontWeight: "bold" }}>Chatbot:</div>
            <div>{chat.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
