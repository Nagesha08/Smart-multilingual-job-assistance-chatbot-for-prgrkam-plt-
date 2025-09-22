"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { renderToolResult } from "./utils" // Import renderToolResult from utils

interface ChatbotProps {
  language?: string
}

export function Chatbot({ language = "en" }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(language)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: { language: selectedLanguage },
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: getWelcomeMessage(selectedLanguage),
      },
    ],
  })

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage)
    // You could reload the chat with new language here
  }

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div
          className="position-fixed bottom-0 end-0 me-4 mb-4"
          style={{ zIndex: 1050, width: "380px", height: "500px" }}
        >
          <div className="card border-0 shadow-lg h-100">
            {/* Header */}
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <i className="fa-solid fa-robot"></i>
                <span className="fw-bold">Job Assistant</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                {/* Language Selector */}
                <select
                  className="form-select form-select-sm text-dark"
                  style={{ width: "auto", fontSize: "12px" }}
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="pa">ਪੰਜਾਬੀ</option>
                </select>
                <button
                  className="btn btn-sm text-white"
                  onClick={toggleChat}
                  style={{ border: "none", background: "none" }}
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="card-body p-0 d-flex flex-column" style={{ height: "380px" }}>
              <div className="flex-grow-1 overflow-auto p-3" style={{ maxHeight: "320px" }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-3 d-flex ${message.role === "user" ? "justify-content-end" : "justify-content-start"}`}
                  >
                    <div
                      className={`p-2 rounded max-w-75 ${
                        message.role === "user" ? "bg-primary text-white" : "bg-light text-dark border"
                      }`}
                      style={{ maxWidth: "75%" }}
                    >
                      <div className="small">
                        {message.role === "user" ? (
                          <>
                            <i className="fa-solid fa-user me-1"></i>You
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-robot me-1"></i>Assistant
                          </>
                        )}
                      </div>
                      <div className="mt-1" style={{ whiteSpace: "pre-wrap" }}>
                        {message.content}
                      </div>
                      {/* Display tool results if available */}
                      {message.toolInvocations?.map((tool, index) => (
                        <div key={index} className="mt-2 p-2 bg-white rounded border">
                          <small className="text-muted">
                            <i className="fa-solid fa-tools me-1"></i>
                            {tool.toolName === "jobSearch" && "Job Search Results"}
                            {tool.toolName === "resumeAnalysis" && "Resume Analysis"}
                            {tool.toolName === "interviewPrep" && "Interview Preparation"}
                          </small>
                          {tool.result && (
                            <div className="mt-1 small">{renderToolResult(tool.toolName, tool.result)}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="d-flex justify-content-start mb-3">
                    <div className="bg-light text-dark border p-2 rounded">
                      <div className="small">
                        <i className="fa-solid fa-robot me-1"></i>Assistant
                      </div>
                      <div className="mt-1">
                        <div className="spinner-border spinner-border-sm me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        Thinking...
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-top p-3">
                <form onSubmit={handleSubmit} className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder={getInputPlaceholder(selectedLanguage)}
                    value={input}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  <button type="submit" className="btn btn-primary btn-sm" disabled={isLoading || !input.trim()}>
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </form>
                <div className="mt-2">
                  <small className="text-muted">
                    Try: "Find software jobs in Chandigarh" or "Help me prepare for interview"
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 me-4 mb-4 shadow-lg"
          style={{ zIndex: 1040, width: "60px", height: "60px" }}
          onClick={toggleChat}
        >
          <i className="fa-solid fa-comments fa-lg"></i>
        </button>
      )}
    </>
  )
}

function getWelcomeMessage(language: string): string {
  const messages = {
    en: "Hello! I'm your job assistance chatbot. I can help you with:\n\n• Finding job opportunities\n• Analyzing your resume\n• Preparing for interviews\n• Career guidance\n\nHow can I assist you today?",
    hi: "नमस्ते! मैं आपका नौकरी सहायता चैटबॉट हूं। मैं आपकी मदद कर सकता हूं:\n\n• नौकरी के अवसर खोजने में\n• आपके रिज्यूमे का विश्लेषण करने में\n• इंटरव्यू की तैयारी में\n• करियर गाइडेंस में\n\nआज मैं आपकी कैसे सहायता कर सकता हूं?",
    pa: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਨੌਕਰੀ ਸਹਾਇਤਾ ਚੈਟਬੋਟ ਹਾਂ। ਮੈਂ ਤੁਹਾਡੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ:\n\n• ਨੌਕਰੀ ਦੇ ਮੌਕੇ ਲੱਭਣ ਵਿੱਚ\n• ਤੁਹਾਡੇ ਰਿਜ਼ਿਊਮੇ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਨ ਵਿੱਚ\n• ਇੰਟਰਵਿਊ ਦੀ ਤਿਆਰੀ ਵਿੱਚ\n• ਕਰੀਅਰ ਗਾਈਡੈਂਸ ਵਿੱਚ\n\nਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਸਹਾਇਤਾ ਕਰ ਸਕਦਾ ਹਾਂ?",
  }
  return messages[language as keyof typeof messages] || messages.en
}

function getInputPlaceholder(language: string): string {
  const placeholders = {
    en: "Ask me about jobs, resume, or interviews...",
    hi: "नौकरी, रिज्यूमे या इंटरव्यू के बारे में पूछें...",
    pa: "ਨੌਕਰੀ, ਰਿਜ਼ਿਊਮੇ ਜਾਂ ਇੰਟਰਵਿਊ ਬਾਰੇ ਪੁੱਛੋ...",
  }
  return placeholders[language as keyof typeof placeholders] || placeholders.en
}
