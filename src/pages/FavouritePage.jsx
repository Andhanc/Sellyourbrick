import { FiHeart } from 'react-icons/fi'
import { FaHeart as FaHeartSolid } from 'react-icons/fa'
import { IoLocationOutline } from 'react-icons/io5'
import './FavouritePage.css'

function FavouritePage({
  favoriteProperties,
  allProperties,
  onToggleFavorite,
  onPropertyClick,
  navigationItems,
  activeNav,
  onNavChange,
}) {
  // Получаем все лайкнутые объявления
  const likedProperties = allProperties.filter((property) => {
    const key = `${property.category}-${property.id}`
    return favoriteProperties.get(key) === true
  })

  return (
    <div className="app favourite-page">
      <header className="favourite-page__header">
        <h1 className="favourite-page__title">Избранное</h1>
        {likedProperties.length > 0 && (
          <p className="favourite-page__subtitle">
            {likedProperties.length}{' '}
            {likedProperties.length === 1 ? 'объявление' : 'объявлений'}
          </p>
        )}
      </header>

      {likedProperties.length === 0 ? (
        <div className="favourite-page__empty">
          <div className="favourite-page__empty-icon">
            <FiHeart size={64} />
          </div>
          <h2 className="favourite-page__empty-title">Нет избранных объявлений</h2>
          <p className="favourite-page__empty-text">
            Нажимайте на сердечко, чтобы добавлять объявления в избранное
          </p>
        </div>
      ) : (
        <section className="favourite-page__content">
          <div className="favourite-page__grid">
            {likedProperties.map((property) => {
              const key = `${property.category}-${property.id}`
              const isFavorite = favoriteProperties.get(key) === true

              return (
                <article
                  key={key}
                  className="property-card property-card--favourite"
                  onClick={() => onPropertyClick(property.category, property.id)}
                >
                  <div className="property-card__image">
                    <img src={property.image} alt={property.name} />
                    <button
                      type="button"
                      className={`property-card__favorite ${
                        isFavorite ? 'property-card__favorite--active' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleFavorite(property.category, property.id)
                      }}
                      aria-pressed={isFavorite}
                      aria-label={
                        isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'
                      }
                    >
                      {isFavorite ? <FaHeartSolid size={18} /> : <FiHeart size={18} />}
                    </button>
                  </div>

                  <div className="property-card__content">
                    <span className="property-card__badge">{property.tag}</span>
                    <h3 className="property-card__title">{property.name}</h3>
                    <div className="property-card__location-row">
                      <IoLocationOutline size={16} className="property-card__location-icon" />
                      <p className="property-card__location">{property.location}</p>
                    </div>
                    <div className="property-card__price">
                      <span className="property-card__price-amount">
                        ${property.price}
                      </span>
                      <span className="property-card__price-period">/Month</span>
                    </div>
                    {property.beds && property.baths && property.sqft && (
                      <div className="property-card__features">
                        <span className="property-card__feature">
                          {property.beds} Bed
                        </span>
                        <span className="property-card__feature">
                          {property.baths} Bath
                        </span>
                        <span className="property-card__feature">
                          {property.sqft?.toLocaleString()} Sqft
                        </span>
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}

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
                aria-pressed={isActive}
              >
                <IconComponent size={28} />
              </button>
            )
          }

          return (
            <button
              key={item.id}
              type="button"
              className={`bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
              onClick={() => onNavChange(item.id)}
              aria-label={item.label}
              aria-pressed={isActive}
            >
              <IconComponent size={26} />
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default FavouritePage

