import { useEffect, useRef, useState } from 'react'
import './App.css'
import {
  FiBell,
  FiSearch,
  FiSliders,
  FiHeart,
  FiChevronDown,
} from 'react-icons/fi'
import {
  FaHome,
  FaHeart as FaHeartSolid,
  FaGavel,
  FaComment,
  FaUser,
} from 'react-icons/fa'
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
  const locationRef = useRef(null)

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
                  <FiHeart size={16} />
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
                  <FiHeart size={16} />
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
    </div>
  )
}

export default App
