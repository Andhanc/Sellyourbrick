import { useState } from 'react'
import {
  FiArrowLeft,
  FiShare2,
  FiHeart,
  FiPhone,
} from 'react-icons/fi'
import {
  FaHeart as FaHeartSolid,
  FaComment,
} from 'react-icons/fa'
import { IoLocationOutline } from 'react-icons/io5'
import { MdBed, MdOutlineBathtub } from 'react-icons/md'
import { BiArea } from 'react-icons/bi'
import '../App.css'
import './PropertyDetailPage.css'

function PropertyDetailPage({
  property,
  isFavorite,
  onBack,
  onToggleFavorite,
  onShare,
  onBookNow,
  onCallBroker,
  onChatBroker,
  navigationItems,
  activeNav,
  onNavChange,
}) {
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)

  // Показываем 4 миниатюры: 3 обычных + 1 с overlay "+10+"
  const visibleImages = property.images?.slice(0, 3) || []
  const totalImages = property.images?.length || 0
  const remainingImages = totalImages > 3 ? totalImages - 3 : 0

  return (
    <div className="app property-detail-page">
      {/* Header с кнопками поверх изображения */}
      <div className="property-detail__header-overlay">
        <button
          type="button"
          className="property-detail__header-btn"
          onClick={onBack}
          aria-label="Назад"
        >
          <FiArrowLeft size={20} />
        </button>
        <div className="property-detail__header-actions">
          <button
            type="button"
            className="property-detail__header-btn"
            onClick={onShare}
            aria-label="Поделиться"
          >
            <FiShare2 size={20} />
          </button>
          <button
            type="button"
            className={`property-detail__header-btn ${
              isFavorite ? 'property-detail__header-btn--active' : ''
            }`}
            onClick={onToggleFavorite}
            aria-label="Добавить в избранное"
          >
            {isFavorite ? <FaHeartSolid size={20} /> : <FiHeart size={20} />}
          </button>
        </div>
      </div>

      {/* Главное изображение */}
      <div className="property-detail__hero">
        <img
          src={property.image}
          alt={property.name}
          className="property-detail__hero-image"
        />
      </div>

      {/* Миниатюры изображений - между главной картинкой и белой частью */}
      <div className="property-detail__thumbnails-wrapper">
        <div className="property-detail__thumbnails">
          {visibleImages.map((img, index) => (
            <div key={index} className="property-detail__thumbnail">
              <img src={img} alt={`${property.name} ${index + 1}`} />
            </div>
          ))}
          {remainingImages > 0 && visibleImages.length > 0 && (
            <div className="property-detail__thumbnail property-detail__thumbnail--overlay">
              <div className="property-detail__thumbnail-overlay">
                <span className="property-detail__thumbnail-count">
                  +{remainingImages}
                </span>
                <img
                  src={property.images?.[3] || property.image}
                  alt={`${property.name} еще ${remainingImages} фото`}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Контент карточки */}
      <div className="property-detail__content">

        {/* Название и цена */}
        <div className="property-detail__title-section">
          <span className="property-detail__badge">{property.tag}</span>
          <div className="property-detail__title-row">
            <h1 className="property-detail__title">{property.name}</h1>
            <div className="property-detail__price">
              <span className="property-detail__price-amount">
                ${property.price}
              </span>
              <span className="property-detail__price-period">/Month</span>
            </div>
          </div>
        </div>

        {/* Адрес */}
        <div className="property-detail__location">
          <IoLocationOutline
            size={18}
            className="property-detail__location-icon"
          />
          <span className="property-detail__location-text">
            {property.location}
          </span>
        </div>

        {/* Характеристики */}
        <div className="property-detail__features">
          <div className="property-detail__feature">
            <MdBed size={22} />
            <span>{property.beds} Bed</span>
          </div>
          <div className="property-detail__feature">
            <MdOutlineBathtub size={22} />
            <span>{property.baths} Bath</span>
          </div>
          <div className="property-detail__feature">
            <BiArea size={22} />
            <span>{property.sqft?.toLocaleString()} Sqft</span>
          </div>
        </div>

        {/* Описание */}
        <div className="property-detail__description">
          <h2 className="property-detail__description-title">Description</h2>
          <p
            className={`property-detail__description-text ${
              descriptionExpanded
                ? 'property-detail__description-text--expanded'
                : ''
            }`}
          >
            {property.description}
          </p>
          {property.description?.length > 150 && (
            <button
              type="button"
              className="property-detail__description-toggle"
              onClick={() => setDescriptionExpanded(!descriptionExpanded)}
            >
              {descriptionExpanded ? 'Read Less' : 'Read More...'}
            </button>
          )}
        </div>

        {/* Брокер */}
        {property.broker && (
          <div className="property-detail__broker">
            <h2 className="property-detail__broker-title">Listing Broker</h2>
            <div className="property-detail__broker-info">
              <img
                src={property.broker.avatar}
                alt={property.broker.name}
                className="property-detail__broker-avatar"
              />
              <div className="property-detail__broker-details">
                <h3 className="property-detail__broker-name">
                  {property.broker.name}
                </h3>
                <p className="property-detail__broker-phone">
                  {property.broker.phone}
                </p>
              </div>
              <div className="property-detail__broker-actions">
                <button
                  type="button"
                  className="property-detail__broker-btn"
                  onClick={onChatBroker}
                  aria-label="Чат с брокером"
                >
                  <FaComment size={18} />
                </button>
                <button
                  type="button"
                  className="property-detail__broker-btn"
                  onClick={onCallBroker}
                  aria-label="Позвонить брокеру"
                >
                  <FiPhone size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Кнопка Book Now */}
        <button
          type="button"
          className="property-detail__book-btn"
          onClick={onBookNow}
        >
          Book Now
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        {navigationItems.map((item) => {
          const IconComponent = item.icon
          const isActive = activeNav === item.id
          return (
            <button
              key={item.id}
              type="button"
              className={`bottom-nav__item ${
                isActive ? 'bottom-nav__item--active' : ''
              }`}
              onClick={() => onNavChange(item.id)}
              aria-label={item.label}
              aria-pressed={isActive}
            >
              <IconComponent />
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default PropertyDetailPage

