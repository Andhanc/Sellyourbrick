import { useState, useEffect, useRef } from 'react'
import { FiArrowLeft, FiSend, FiZap } from 'react-icons/fi'
import './ChatPage.css'

function ChatPage({ chat, onBack, navigationItems, activeNav, onNavChange }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Здравствуйте! Чем могу помочь?',
      sender: chat.id,
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 2,
      text: 'Интересует квартира на Costa Adeje',
      sender: 'user',
      timestamp: new Date(Date.now() - 3300000),
    },
    {
      id: 3,
      text: 'Отлично! У нас есть несколько вариантов. Могу показать вам лучшие предложения.',
      sender: chat.id,
      timestamp: new Date(Date.now() - 3000000),
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [showAIHelp, setShowAIHelp] = useState(false)
  const [aiHelpText, setAiHelpText] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage('')

    // Имитация ответа
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        text: 'Спасибо за сообщение! Я свяжусь с вами в ближайшее время.',
        sender: chat.id,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, response])
    }, 1000)
  }

  const handleAIHelp = () => {
    setShowAIHelp(true)
    // Генерируем пример текста с помощью AI (имитация)
    const suggestions = [
      'Здравствуйте! Меня интересует просмотр квартиры. Когда удобно встретиться?',
      'Добрый день! Хотел бы узнать больше о вашем предложении. Можете прислать дополнительную информацию?',
      'Привет! Спасибо за быстрый ответ. Могу ли я задать несколько вопросов о недвижимости?',
    ]
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
    setAiHelpText(randomSuggestion)
  }

  const handleUseAIText = () => {
    setInputMessage(aiHelpText)
    setShowAIHelp(false)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="chat-page">
      {/* Header */}
      <header className="chat-header">
        <button type="button" className="chat-header__back" onClick={onBack}>
          <FiArrowLeft size={20} />
        </button>
        <div className="chat-header__avatar">
          <img src={chat.avatar} alt={chat.name} />
        </div>
        <div className="chat-header__info">
          <h2 className="chat-header__name">{chat.name}</h2>
          <span className="chat-header__status">Онлайн</span>
        </div>
      </header>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message ${
              message.sender === 'user' ? 'chat-message--user' : 'chat-message--other'
            }`}
          >
            <div className="chat-message__content">
              <p className="chat-message__text">{message.text}</p>
              <span className="chat-message__time">{formatTime(message.timestamp)}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* AI Help Modal */}
      {showAIHelp && (
        <div className="ai-help-overlay" onClick={() => setShowAIHelp(false)}>
          <div className="ai-help-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ai-help-modal__header">
              <div className="ai-help-modal__icon">
                <FiZap size={24} />
              </div>
              <h3 className="ai-help-modal__title">AI Помощник</h3>
              <button
                type="button"
                className="ai-help-modal__close"
                onClick={() => setShowAIHelp(false)}
              >
                ×
              </button>
            </div>
            <div className="ai-help-modal__content">
              <p className="ai-help-modal__text">{aiHelpText}</p>
            </div>
            <div className="ai-help-modal__actions">
              <button
                type="button"
                className="ai-help-modal__btn ai-help-modal__btn--secondary"
                onClick={() => setShowAIHelp(false)}
              >
                Отмена
              </button>
              <button
                type="button"
                className="ai-help-modal__btn ai-help-modal__btn--primary"
                onClick={handleUseAIText}
              >
                Использовать
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="chat-input-container">
        <button
          type="button"
          className="chat-input__ai-btn"
          onClick={handleAIHelp}
          title="Help with AI"
        >
          <FiZap size={20} />
        </button>
        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input
            ref={inputRef}
            type="text"
            className="chat-input"
            placeholder="Написать сообщение..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button type="submit" className="chat-input__send" disabled={!inputMessage.trim()}>
            <FiSend size={20} />
          </button>
        </form>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        {navigationItems.map((item, index) => {
          const IconComponent = item.icon
          const isCenter = index === 2
          const isActive = activeNav === item.id

          if (isCenter) {
            return (
              <button
                type="button"
                className={`bottom-nav__center ${isActive ? 'bottom-nav__center--active' : ''}`}
                key={item.id}
                onClick={() => onNavChange(item.id)}
                aria-label={item.label}
              >
                <IconComponent size={28} />
              </button>
            )
          }

          return (
            <button
              type="button"
              className={`bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
              key={item.id}
              onClick={() => onNavChange(item.id)}
              aria-label={item.label}
            >
              <IconComponent size={26} />
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default ChatPage

