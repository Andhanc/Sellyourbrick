import { FaUser, FaCrown, FaHeart } from 'react-icons/fa'
import { FiLock, FiFileText, FiChevronRight, FiCalendar, FiShoppingBag, FiHelpCircle, FiMoon, FiMessageCircle, FiFolder } from 'react-icons/fi'
import { IoLocationOutline } from 'react-icons/io5'
import './ProfilePage.css'

function ProfilePage({ navigationItems, activeNav, onNavChange }) {
  // Данные пользователя (в реальном приложении будут из API)
  const userData = {
    name: 'Shahid Miah',
    joinDate: '15 Nov 2024',
    location: 'Cooper Square NY',
    bio: 'Passionate about fitness and living a healthy lifestyle! I love mixing up my workouts',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1200&q=80',
  }

  const generalItems = [
    { id: 'profile-edit', label: 'Profile Edit', icon: FaUser },
    { id: 'password', label: 'Password', icon: FiLock },
    { id: 'subscription', label: 'Subscription', icon: FaCrown },
  ]

  const otherItems = [
    { id: 'favorites', label: 'Выбранные', icon: FaHeart },
    { id: 'theme', label: 'Смена темы', icon: FiMoon },
    { id: 'support', label: 'Написать в поддержку', icon: FiMessageCircle },
    { id: 'documents', label: 'Список документов', icon: FiFolder },
    { id: 'terms', label: 'Terms & Conditions', icon: FiFileText },
  ]

  const handleItemClick = (itemId) => {
    // Обработка клика по пункту меню
    console.log('Clicked:', itemId)
    // Здесь можно добавить навигацию или модальные окна
  }

  return (
    <div className="profile-page">
      {/* Баннер с кнопкой редактирования */}
      <div className="profile-banner">
        <img src={userData.banner} alt="Banner" className="profile-banner__image" />
        <button type="button" className="profile-banner__edit-btn">
          Edit Photo
        </button>
      </div>

      {/* Профиль пользователя */}
      <div className="profile-info">
        <div className="profile-avatar">
          <img src={userData.avatar} alt={userData.name} />
        </div>
        <h1 className="profile-name">{userData.name}</h1>
        <div className="profile-meta">
          <div className="profile-meta__item">
            <FiCalendar size={16} />
            <span>{userData.joinDate}</span>
          </div>
          <div className="profile-meta__item">
            <IoLocationOutline size={16} />
            <span>{userData.location}</span>
          </div>
        </div>
        <p className="profile-bio">{userData.bio}</p>
      </div>

      {/* Блок с тремя квадратами */}
      <div className="profile-quick-actions">
        <button
          type="button"
          className="profile-quick-action"
          onClick={() => handleItemClick('my-purchases')}
        >
          <FiShoppingBag size={24} className="profile-quick-action__icon" />
          <span className="profile-quick-action__label">Мои покупки</span>
        </button>
        <button
          type="button"
          className="profile-quick-action"
          onClick={() => handleItemClick('calendar')}
        >
          <FiCalendar size={24} className="profile-quick-action__icon" />
          <span className="profile-quick-action__label">Календарь</span>
        </button>
        <button
          type="button"
          className="profile-quick-action"
          onClick={() => handleItemClick('help')}
        >
          <FiHelpCircle size={24} className="profile-quick-action__icon" />
          <span className="profile-quick-action__label">?</span>
        </button>
      </div>

      {/* Секция General */}
      <div className="profile-section">
        <h2 className="profile-section__title">General</h2>
        <div className="profile-menu">
          {generalItems.map((item) => {
            const IconComponent = item.icon
            return (
              <button
                key={item.id}
                type="button"
                className="profile-menu__item"
                onClick={() => handleItemClick(item.id)}
              >
                <div className="profile-menu__item-content">
                  <IconComponent size={20} className="profile-menu__icon" />
                  <span className="profile-menu__label">{item.label}</span>
                </div>
                <FiChevronRight size={20} className="profile-menu__arrow" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Секция Others */}
      <div className="profile-section">
        <h2 className="profile-section__title">Others</h2>
        <div className="profile-menu">
          {otherItems.map((item) => {
            const IconComponent = item.icon
            return (
              <button
                key={item.id}
                type="button"
                className="profile-menu__item"
                onClick={() => handleItemClick(item.id)}
              >
                <div className="profile-menu__item-content">
                  <IconComponent size={20} className="profile-menu__icon" />
                  <span className="profile-menu__label">{item.label}</span>
                </div>
                <FiChevronRight size={20} className="profile-menu__arrow" />
              </button>
            )
          })}
        </div>
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

export default ProfilePage

