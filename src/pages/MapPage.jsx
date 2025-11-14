import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import { FiSearch, FiCrosshair, FiArrowLeft } from 'react-icons/fi'
import { MdBed, MdOutlineBathtub } from 'react-icons/md'
import { BiArea } from 'react-icons/bi'
import { IoLocationOutline } from 'react-icons/io5'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './MapPage.css'

// Фикс для иконок Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Кастомная иконка для маркеров
const createCustomIcon = (isHovered = false) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="marker-pin ${isHovered ? 'marker-pin--hovered' : ''}">
        <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.163 0 0 7.163 0 16C0 24.837 16 40 16 40C16 40 32 24.837 32 16C32 7.163 24.837 0 16 0Z" fill="#FCD34D"/>
          <circle cx="16" cy="16" r="6" fill="#111827"/>
        </svg>
      </div>
    `,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  })
}

// Компонент для центрирования карты на местоположении пользователя
function CenterMap({ position, zoom }) {
  const map = useMap()
  useEffect(() => {
    if (position) {
      map.setView(position, zoom || 9)
    }
  }, [position, zoom, map])
  return null
}

function MapPage({ properties, onPropertyClick, onBack }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredProperty, setHoveredProperty] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [mapCenter, setMapCenter] = useState([28.2916, -16.6291]) // Координаты Тенерифе
  const [mapZoom, setMapZoom] = useState(9) // Оптимальный зум
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  // Обновление зума карты
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setZoom(mapZoom)
    }
  }, [mapZoom])

  // Получение местоположения пользователя
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation([latitude, longitude])
          setMapCenter([latitude, longitude])
          setMapZoom(10)
        },
        (error) => {
          console.error('Ошибка получения местоположения:', error)
          alert('Не удалось получить ваше местоположение')
        }
      )
    } else {
      alert('Геолокация не поддерживается вашим браузером')
    }
  }

  // Фильтрация свойств по поисковому запросу
  const filteredProperties = properties.filter((property) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      property.name?.toLowerCase().includes(query) ||
      property.location?.toLowerCase().includes(query) ||
      property.tag?.toLowerCase().includes(query)
    )
  })

  return (
    <div className="map-page">
      {/* Поиск вверху */}
      <div className="map-page__search-container">
        <button
          type="button"
          className="map-page__back-btn"
          onClick={onBack}
          aria-label="Назад"
        >
          <FiArrowLeft size={20} />
        </button>
        <div className="map-page__search">
          <FiSearch size={18} className="map-page__search-icon" />
          <input
            type="text"
            placeholder="Search.."
            className="map-page__search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="map-page__location-btn"
          onClick={handleGetLocation}
          aria-label="Мое местоположение"
        >
          <FiCrosshair size={18} />
        </button>
      </div>

      {/* Карта */}
      <div className="map-page__map-container">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          ref={(map) => {
            mapRef.current = map
            if (map) {
              mapInstanceRef.current = map
            }
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <CenterMap position={mapCenter} zoom={mapZoom} />

          {/* Маркеры для каждого апартамента */}
          {filteredProperties.map((property, index) => {
            if (!property.coordinates) return null
            const [lat, lng] = property.coordinates
            const isHovered = hoveredProperty?.id === property.id
            // Создаем уникальный ключ из category и id, если есть, иначе используем index
            const uniqueKey = property.category && property.id
              ? `${property.category}-${property.id}`
              : property.id || `property-${index}`

            return (
              <Marker
                key={uniqueKey}
                position={[lat, lng]}
                icon={createCustomIcon(isHovered)}
                eventHandlers={{
                  mouseover: () => {
                    setHoveredProperty(property)
                    // Немного отдаляем карту при наведении
                    if (mapInstanceRef.current && mapZoom > 8.5) {
                      setMapZoom(8.5)
                    }
                  },
                  mouseout: () => {
                    setHoveredProperty(null)
                    // Возвращаем зум обратно
                    if (mapInstanceRef.current && mapZoom < 9) {
                      setMapZoom(9)
                    }
                  },
                  click: () => onPropertyClick(property.category || 'recommended', property.id),
                }}
              />
            )
          })}
        </MapContainer>

        {/* Кастомное всплывающее окно - по центру экрана */}
        {hoveredProperty && (
          <div
            className="map-popup-custom"
            onClick={() => onPropertyClick(hoveredProperty.category || 'recommended', hoveredProperty.id)}
          >
            <div className="map-popup__content">
              <div className="map-popup__image">
                <img src={hoveredProperty.image} alt={hoveredProperty.name} />
                <span className="map-popup__badge">{hoveredProperty.tag}</span>
              </div>
              <div className="map-popup__info">
                <h3 className="map-popup__title">{hoveredProperty.name}</h3>
                <p className="map-popup__price">
                  ${hoveredProperty.price.toLocaleString()}
                  {hoveredProperty.price < 10000 && (
                    <span className="map-popup__price-period">/Month</span>
                  )}
                </p>
                <div className="map-popup__location">
                  <IoLocationOutline size={14} />
                  <span>{hoveredProperty.location}</span>
                </div>
                <div className="map-popup__features">
                  <span>
                    <MdBed size={16} />
                    {hoveredProperty.beds} Beds
                  </span>
                  <span>
                    <MdOutlineBathtub size={16} />
                    {hoveredProperty.baths} Baths
                  </span>
                  <span>
                    <BiArea size={16} />
                    {hoveredProperty.sqft}Sqft
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MapPage

