import { useEffect, useRef, useState } from 'react'
import './App.css'
import {
  FiBell,
  FiSearch,
  FiSliders,
  FiHeart,
  FiChevronDown,
  FiArrowRight,
  FiX,
  FiSend,
  FiGlobe,
  FiPhone,
} from 'react-icons/fi'
import {
  FaHome,
  FaHeart as FaHeartSolid,
  FaGavel,
  FaComment,
  FaUser,
  FaAndroid,
  FaApple,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IoLocationOutline } from 'react-icons/io5'
import {
  PiHouseLine,
  PiBuildings,
  PiBuildingApartment,
  PiBuilding,
  PiWarehouse,
} from 'react-icons/pi'

const propertyTypes = [
  { label: 'Дом', icon: PiHouseLine },
  { label: 'Квартира', icon: PiBuilding },
  { label: 'Апартаменты', icon: PiBuildingApartment },
  { label: 'Вилла', icon: PiBuildings },
]

const resortLocations = [
  'Costa Adeje, Tenerife',
  'Playa de las Américas, Tenerife',
  'Los Cristianos, Tenerife',
  'Puerto de la Cruz, Tenerife',
  'Santa Cruz de Tenerife, Tenerife',
  'La Laguna, Tenerife',
  'San Cristóbal de La Laguna, Tenerife',
  'Golf del Sur, Tenerife',
  'Callao Salvaje, Tenerife',
  'El Médano, Tenerife',
]

const navigationItems = [
  { id: 'home', label: 'Главная', icon: FaHome },
  { id: 'favourite', label: 'Понравились', icon: FaHeartSolid },
  { id: 'auction', label: 'Аукцион', icon: FaGavel },
  { id: 'chat', label: 'Чат', icon: FaComment },
  { id: 'profile', label: 'Профиль', icon: FaUser },
]

const recommendedProperties = [
  {
    id: 1,
    tag: 'Home',
    name: 'Mark Wilson Property',
    location: 'Dr. San Jose, South Dakota 83475',
    price: 1900,
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    tag: 'Home',
    name: 'Eleanor Pena Property',
    location: '1901 Thornridge Cir. Shilo 81063',
    price: 1200,
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
]

const nearbyProperties = [
  {
    id: 1,
    tag: 'Home',
    name: 'Bessie Cooper Property',
    location: '8502 Preston Rd. Inglewood',
    price: 1000,
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    tag: 'Home',
    name: 'Darrell Steward Property',
    location: 'Connecticut 35624',
    price: 980,
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
]

function App() {
  const [selectedLocation, setSelectedLocation] = useState(resortLocations[0])
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [favoriteProperties, setFavoriteProperties] = useState(() => {
    const initialFavorites = new Map()
    recommendedProperties.forEach((property) => {
      initialFavorites.set(`recommended-${property.id}`, false)
    })
    nearbyProperties.forEach((property) => {
      initialFavorites.set(`nearby-${property.id}`, false)
    })
    return initialFavorites
  })
  const [activeNav, setActiveNav] = useState('home')
  const [contactForm, setContactForm] = useState({
    email: '',
    fullName: '',
    message: '',
  })
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: 'Здравствуйте! Я ваш AI-консультант. Чем могу помочь?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [chatInput, setChatInput] = useState('')
  const [language, setLanguage] = useState('ru')
  const locationRef = useRef(null)
  const chatMessagesRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setIsLocationOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
    setIsLocationOpen(false)
  }

  const toggleFavorite = (category, id) => {
    const key = `${category}-${id}`
    setFavoriteProperties((prev) => {
      const updated = new Map(prev)
      updated.set(key, !prev.get(key))
      return updated
    })
  }

  const handleContactFormChange = (e) => {
    const { name, value } = e.target
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleContactFormSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', contactForm)
    setContactForm({
      email: '',
      fullName: '',
      message: '',
    })
    alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.')
  }

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev)
  }

  const handleChatInputChange = (e) => {
    setChatInput(e.target.value)
  }

  const handleChatSubmit = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage = chatInput.trim()
    setChatInput('')

    setChatMessages((prev) => {
      const newMessage = {
        id: prev.length + 1,
        text: userMessage,
        sender: 'user',
        timestamp: new Date(),
      }

      // Имитация ответа бота
      setTimeout(() => {
        setChatMessages((current) => {
          const botResponse = {
            id: current.length + 1,
            text: 'Спасибо за ваш вопрос! Я постараюсь помочь вам. Можете задать более подробный вопрос?',
            sender: 'bot',
            timestamp: new Date(),
          }
          return [...current, botResponse]
        })
      }, 1000)

      return [...prev, newMessage]
    })
  }

  useEffect(() => {
    if (chatMessagesRef.current && isChatOpen) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }, [chatMessages, isChatOpen])

  const handleLanguageChange = () => {
    setLanguage((prev) => (prev === 'ru' ? 'en' : 'ru'))
  }

  const handleSocialLink = (platform) => {
    const links = {
      instagram: 'https://instagram.com/',
      whatsapp: 'https://wa.me/79991234567',
      youtube: 'https://youtube.com/',
      twitter: 'https://twitter.com/',
    }
    if (links[platform]) {
      window.open(links[platform], '_blank')
    }
  }

  const handleDownloadApp = (platform) => {
    if (platform === 'android') {
      window.open('https://play.google.com/store/apps', '_blank')
    } else if (platform === 'ios') {
      window.open('https://apps.apple.com/', '_blank')
    }
  }

  const handleWhatsApp = () => {
    window.open('https://wa.me/79991234567', '_blank')
  }

  const handleCallManager = () => {
    window.location.href = 'tel:+79991234567'
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header__location">
          <span className="header__location-icon">
            <IoLocationOutline size={20} />
          </span>
          <div className="header__location-info" ref={locationRef}>
            <span className="header__location-label">Location</span>
            <button
              type="button"
              className="header__location-select"
              onClick={() => setIsLocationOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isLocationOpen}
            >
              <span className="header__location-value">{selectedLocation}</span>
              <FiChevronDown
                size={16}
                className={`header__location-select-icon ${
                  isLocationOpen ? 'header__location-select-icon--open' : ''
                }`}
              />
            </button>
            {isLocationOpen && (
              <div className="header__location-dropdown">
                {resortLocations.map((location) => (
                  <button
                    type="button"
                    className={`header__location-option ${
                      location === selectedLocation ? 'header__location-option--active' : ''
                    }`}
                    key={location}
                    onClick={() => handleLocationSelect(location)}
                  >
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="header__actions">
          <button type="button" className="header__action-btn">
            <FiBell size={18} />
            <span className="header__action-indicator" />
          </button>
        </div>
      </header>

      <section className="search">
        <div className="search__field">
          <FiSearch size={18} className="search__icon" />
          <input
            type="text"
            placeholder="Search"
            className="search__input"
          />
        </div>
        <button type="button" className="search__filter">
          <FiSliders size={18} />
        </button>
      </section>

      <nav className="categories">
        {propertyTypes.map((type) => {
          const IconComponent = type.icon
          return (
            <button type="button" className="categories__item" key={type.label}>
              <span className="categories__icon">
                <IconComponent size={28} />
              </span>
              <span className="categories__label">{type.label}</span>
            </button>
          )
        })}
      </nav>

      <section className="section">
        <div className="section__header">
          <h2 className="section__title">Recommended Property</h2>
        </div>

        <div className="property-list property-list--horizontal">
          {recommendedProperties.map((property) => (
            <article className="property-card" key={property.id}>
              <div className="property-card__image">
                <img src={property.image} alt={property.name} />
                <button
                  type="button"
                  className={`property-card__favorite ${
                    favoriteProperties.get(`recommended-${property.id}`)
                      ? 'property-card__favorite--active'
                      : ''
                  }`}
                  onClick={() => toggleFavorite('recommended', property.id)}
                  aria-pressed={favoriteProperties.get(`recommended-${property.id}`)}
                >
                  {favoriteProperties.get(`recommended-${property.id}`) ? (
                    <FaHeartSolid size={16} />
                  ) : (
                    <FiHeart size={16} />
                  )}
                </button>
              </div>

              <div className="property-card__content">
                <span className="property-card__badge">{property.tag}</span>
                <h3 className="property-card__title">{property.name}</h3>
                <p className="property-card__location">{property.location}</p>
                <div className="property-card__price">
                  <span className="property-card__price-amount">
                    ${property.price}
                  </span>
                  <span className="property-card__price-period">/Month</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--spaced">
        <div className="section__header">
          <h2 className="section__title">Nearby Property</h2>
        </div>

        <div className="property-list property-list--vertical">
          {nearbyProperties.map((property) => (
            <article
              className="property-card property-card--horizontal"
              key={property.id}
            >
              <div className="property-card__image property-card__image--small">
                <img src={property.image} alt={property.name} />
                <button
                  type="button"
                  className={`property-card__favorite ${
                    favoriteProperties.get(`nearby-${property.id}`)
                      ? 'property-card__favorite--active'
                      : ''
                  }`}
                  onClick={() => toggleFavorite('nearby', property.id)}
                  aria-pressed={favoriteProperties.get(`nearby-${property.id}`)}
                >
                  {favoriteProperties.get(`nearby-${property.id}`) ? (
                    <FaHeartSolid size={16} />
                  ) : (
                    <FiHeart size={16} />
                  )}
                </button>
              </div>

              <div className="property-card__content">
                <span className="property-card__badge">{property.tag}</span>
                <h3 className="property-card__title">{property.name}</h3>
                <p className="property-card__location">{property.location}</p>
                <div className="property-card__price">
                  <span className="property-card__price-amount">
                    ${property.price}
                  </span>
                  <span className="property-card__price-period">/Month</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-form-section">
        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleContactFormSubmit}>
            <div className="contact-form__header">
              <h2 className="contact-form__title">
                Есть вопросы?
                <span className="contact-form__title-accent">Напишите нам</span>
                <FiArrowRight className="contact-form__arrow" size={24} />
              </h2>
            </div>
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="email" className="contact-form__label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactFormChange}
                  className="contact-form__input"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="contact-form__field">
                <label htmlFor="fullName" className="contact-form__label">
                  ФИО
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={contactForm.fullName}
                  onChange={handleContactFormChange}
                  className="contact-form__input"
                  placeholder="Иванов Иван Иванович"
                  required
                />
              </div>
            </div>
            <div className="contact-form__field">
              <label htmlFor="message" className="contact-form__label">
                Описание вопроса
              </label>
              <textarea
                id="message"
                name="message"
                value={contactForm.message}
                onChange={handleContactFormChange}
                className="contact-form__textarea"
                placeholder="Опишите ваш вопрос подробно..."
                rows="5"
                required
              />
            </div>
            <button type="submit" className="contact-form__submit">
              <span>Отправить</span>
              <FiArrowRight size={18} />
            </button>
          </form>
        </div>
      </section>

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
                onClick={() => setActiveNav(item.id)}
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
              onClick={() => setActiveNav(item.id)}
              aria-label={item.label}
            >
              <IconComponent size={26} />
            </button>
          )
        })}
      </nav>

      <button
        type="button"
        className="ai-button"
        onClick={toggleChat}
        aria-label="AI Assistant"
        aria-expanded={isChatOpen}
      >
        AI
      </button>

      {isChatOpen && (
        <div className="chat-widget">
          <div className="chat-widget__header">
            <div className="chat-widget__header-info">
              <div className="chat-widget__avatar">AI</div>
              <div className="chat-widget__header-text">
                <h3 className="chat-widget__title">AI Консультант</h3>
                <span className="chat-widget__status">Онлайн</span>
              </div>
            </div>
            <button
              type="button"
              className="chat-widget__close"
              onClick={toggleChat}
              aria-label="Закрыть чат"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="chat-widget__messages" ref={chatMessagesRef}>
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`chat-widget__message ${
                  message.sender === 'user'
                    ? 'chat-widget__message--user'
                    : 'chat-widget__message--bot'
                }`}
              >
                <div className="chat-widget__message-content">
                  {message.text}
                </div>
                <div className="chat-widget__message-time">
                  {message.timestamp.toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            ))}
          </div>

          <form className="chat-widget__input-form" onSubmit={handleChatSubmit}>
            <input
              type="text"
              className="chat-widget__input"
              placeholder="Введите ваше сообщение..."
              value={chatInput}
              onChange={handleChatInputChange}
              autoFocus
            />
            <button
              type="submit"
              className="chat-widget__send"
              aria-label="Отправить сообщение"
            >
              <FiSend size={18} />
            </button>
          </form>
        </div>
      )}

      <footer className="footer">
        <div className="footer__container">
          {/* Секция с кнопками загрузки и контактами */}
          <section className="footer__actions">
            {/* Текстовые ссылки сверху */}
            <div className="footer__contact-links">
              <button
                type="button"
                className="footer__contact-link"
                onClick={handleWhatsApp}
                aria-label="Перейти в WhatsApp"
              >
                <span className="footer__contact-link-text">Перейти в WhatsApp</span>
                <span className="footer__contact-link-arrow">→</span>
              </button>
              <button
                type="button"
                className="footer__contact-link"
                onClick={handleCallManager}
                aria-label="Связаться с менеджером"
              >
                <span className="footer__contact-link-text">Связаться с менеджером</span>
                <span className="footer__contact-link-arrow">→</span>
              </button>
            </div>

            {/* Кнопки загрузки приложений */}
            <div className="footer__download-grid">
              <button
                type="button"
                className="footer__download-btn"
                onClick={() => handleDownloadApp('android')}
                aria-label="Загрузить на Android"
              >
                <div className="footer__download-icon footer__download-icon--android">
                  <FaAndroid size={32} />
                </div>
                <div className="footer__download-text">
                  <span className="footer__download-label">Загрузите на</span>
                  <span className="footer__download-platform">Android</span>
                </div>
              </button>

              <button
                type="button"
                className="footer__download-btn"
                onClick={() => handleDownloadApp('ios')}
                aria-label="Загрузить на iOS"
              >
                <div className="footer__download-icon footer__download-icon--ios">
                  <FaApple size={32} />
                </div>
                <div className="footer__download-text">
                  <span className="footer__download-label">Загрузите на</span>
                  <span className="footer__download-platform">iOS</span>
                </div>
              </button>
            </div>
          </section>

          <div className="footer__bottom">
            <div className="footer__social">
              <button
                type="button"
                className="footer__social-btn"
                onClick={() => handleSocialLink('instagram')}
                aria-label="Instagram"
              >
                <FaInstagram size={22} />
              </button>
              <button
                type="button"
                className="footer__social-btn"
                onClick={() => handleSocialLink('whatsapp')}
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={22} />
              </button>
              <button
                type="button"
                className="footer__social-btn"
                onClick={() => handleSocialLink('youtube')}
                aria-label="YouTube"
              >
                <FaYoutube size={22} />
              </button>
              <button
                type="button"
                className="footer__social-btn"
                onClick={() => handleSocialLink('twitter')}
                aria-label="X (Twitter)"
              >
                <FaXTwitter size={22} />
              </button>
            </div>

            <button
              type="button"
              className="footer__language-btn"
              onClick={handleLanguageChange}
              aria-label="Изменить язык"
            >
              {language === 'ru' ? (
                <>
                  <span className="footer__flag footer__flag--gb"></span>
                  <span>English version</span>
                </>
              ) : (
                <>
                  <span className="footer__flag footer__flag--ru"></span>
                  <span>Русская версия</span>
                </>
              )}
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
