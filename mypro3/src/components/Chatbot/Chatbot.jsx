import React, { useState, useEffect, useRef } from 'react'
import axios from '../../axios'
import './Chatbot.css'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '반가워요! 교육생님! 💡\n저는 여러분의 프로젝트 기획과 아키텍처 설계를 도와줄 **AI 프로젝트 멘토**입니다.\n\n주제 선정, 기술 스택 범위(Scope) 조절, 외부 API 연동 등 무엇이든 편하게 물어보세요!',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messageEndRef = useRef(null)

  // 메시지 업데이트 시 자동 스크롤 다운
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // 마크다운과 줄바꿈을 이쁘게 렌더링하는 헬퍼 함수
  const formatMessage = (text) => {
    return text.split('\n').map((line, index) => {
      // **볼드체** 파싱 -> <strong> 태그 변환
      let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

      // 글머리 기호 (* 또는 -) 파싱 -> 불릿 기호 변환
      if (formattedLine.trim().startsWith('* ')) {
        formattedLine = '• ' + formattedLine.trim().substring(2)
      } else if (formattedLine.trim().startsWith('- ')) {
        formattedLine = '• ' + formattedLine.trim().substring(2)
      }

      return (
        <span key={index} style={{ display: 'block', minHeight: '1.2em' }}>
          <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
        </span>
      )
    })
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { sender: 'user', text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // 백엔드 컨텍스트 패스(/project-smhrd) 및 프록시 포트 연동 요청
      const response = await axios.post('/project-smhrd/api/chatbot', {
        question: input,
      })

      const botAnswer = response.data.answer || '답변을 가져오지 못했습니다.'
      setMessages((prev) => [...prev, { sender: 'bot', text: botAnswer }])
    } catch (error) {
      console.error('Chatbot API Error:', error)
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: '죄송합니다. 백엔드 서버와 통신하는 중 문제가 발생했습니다.\n서버가 정상적으로 켜져 있는지 확인해 주세요!',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chatbot-container">
      {/* 1. 플로팅 아바타 버튼 */}
      <button
        className={`chatbot-fab-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="AI 프로젝트 멘토 챗봇 열기"
      >
        {isOpen ? '❌' : '🤖'}
      </button>

      {/* 2. 글래스모피즘 채팅 창 */}
      {isOpen && (
        <div className="chatbot-chat-window">
          {/* 헤더 */}
          <div className="chatbot-chat-header">
            <div className="avatar-info">
              <span className="avatar-icon">🧑‍💻</span>
              <div>
                <h5>AI 프로젝트 멘토</h5>
                <p className="status-online">
                  <span className="status-dot"></span>실시간 큐레이팅 중
                </p>
              </div>
            </div>
          </div>

          {/* 메시지 영역 */}
          <div className="chatbot-chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message-bubble-wrapper ${msg.sender}`}>
                <div className={`chat-message-bubble ${msg.sender}`}>{formatMessage(msg.text)}</div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message-bubble-wrapper bot">
                <div className="chat-message-bubble bot thinking-dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          {/* 입력 폼 */}
          <div className="chatbot-chat-input-wrapper">
            <input
              type="text"
              placeholder="프로젝트 주제, 스택 범위 등을 물어보세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="chat-send-btn" onClick={handleSend}>
              보내기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
