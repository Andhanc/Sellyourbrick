import { useState } from 'react'
import { FiSearch, FiArrowLeft } from 'react-icons/fi'
import './ChatListPage.css'

function ChatListPage({ navigationItems, activeNav, onNavChange, onChatSelect }) {
  // Список чатов (в реальном приложении будут из API)
  const [chats] = useState([
    {
      id: 1,
      name: 'Muhammad Farhan',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      lastMessage: 'Спасибо за ваш вопрос! Я постараюсь помочь вам.',
      timestamp: '10:30',
      unread: 2,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      lastMessage: 'Отличная квартира! Когда можем посмотреть?',
      timestamp: 'Вчера',
      unread: 0,
    },
    {
      id: 3,
      name: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      lastMessage: 'Договорились, встретимся завтра в 15:00',
      timestamp: '15:45',
      unread: 1,
    },
    {
      id: 4,
      name: 'Emma Brown',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      lastMessage: 'Можете прислать больше фотографий?',
      timestamp: '12:20',
      unread: 0,
    },
    {
      id: 5,
      name: 'James Miller',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      lastMessage: 'Спасибо за быстрый ответ!',
      timestamp: '09:15',
      unread: 0,
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="chat-list-page">
      {/* Header */}
      <header className="chat-list-header">
        <h1 className="chat-list-header__title">Чаты</h1>
      </header>

      {/* Поиск */}
      <div className="chat-list-search">
        <FiSearch size={18} className="chat-list-search__icon" />
        <input
          type="text"
          placeholder="Поиск чатов..."
          className="chat-list-search__input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Список чатов */}
      <div className="chat-list">
        {filteredChats.map((chat) => (
          <button
            key={chat.id}
            type="button"
            className="chat-list-item"
            onClick={() => onChatSelect(chat)}
          >
            <div className="chat-list-item__avatar">
              <img src={chat.avatar} alt={chat.name} />
              {chat.unread > 0 && (
                <span className="chat-list-item__badge">{chat.unread}</span>
              )}
            </div>
            <div className="chat-list-item__content">
              <div className="chat-list-item__header">
                <h3 className="chat-list-item__name">{chat.name}</h3>
                <span className="chat-list-item__time">{chat.timestamp}</span>
              </div>
              <p className="chat-list-item__message">{chat.lastMessage}</p>
            </div>
          </button>
        ))}
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

export default ChatListPage

