import './App.css'
import {
  FiBell,
  FiSettings,
  FiSearch,
  FiSliders,
  FiHeart,
} from 'react-icons/fi'
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
  { label: 'Вилла', icon: PiBuildings },
  { label: 'Апартаменты', icon: PiBuildingApartment },
  { label: 'Квартира', icon: PiBuilding },
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
    isFavorite: true,
  },
  {
    id: 2,
    tag: 'Home',
    name: 'Eleanor Pena Property',
    location: '1901 Thornridge Cir. Shilo 81063',
    price: 1200,
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    isFavorite: false,
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
    isFavorite: false,
  },
  {
    id: 2,
    tag: 'Home',
    name: 'Darrell Steward Property',
    location: 'Connecticut 35624',
    price: 980,
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    isFavorite: true,
  },
]

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header__location">
          <span className="header__location-icon">
            <IoLocationOutline size={20} />
          </span>
          <div className="header__location-info">
            <span className="header__location-label">Location</span>
            <button type="button" className="header__location-select">
              Lahore, Pakistan
            </button>
          </div>
        </div>

        <div className="header__actions">
          <button type="button" className="header__action-btn">
            <FiBell size={18} />
            <span className="header__action-indicator" />
          </button>
          <button type="button" className="header__action-btn">
            <FiSettings size={18} />
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
                <IconComponent size={20} />
              </span>
              <span className="categories__label">{type.label}</span>
            </button>
          )
        })}
      </nav>

      <section className="section">
        <div className="section__header">
          <h2 className="section__title">Recommended Property</h2>
          <button type="button" className="section__link">
            See all
          </button>
        </div>

        <div className="property-list property-list--horizontal">
          {recommendedProperties.map((property) => (
            <article className="property-card" key={property.id}>
              <div className="property-card__image">
                <img src={property.image} alt={property.name} />
                <button
                  type="button"
                  className={`property-card__favorite ${
                    property.isFavorite ? 'property-card__favorite--active' : ''
                  }`}
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
          <button type="button" className="section__link">
            See all
          </button>
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
                    property.isFavorite ? 'property-card__favorite--active' : ''
                  }`}
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
    </div>
  )
}

export default App
