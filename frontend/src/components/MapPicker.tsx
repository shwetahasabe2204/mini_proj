import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef, useState } from 'react'

type MapPickerProps = {
  latitude?: number
  longitude?: number
  setCoordinates: (lat: number, lng: number) => void
}

const LocationMarker = ({
  setCoordinates,
}: {
  setCoordinates: (lat: number, lng: number) => void
}) => {
  useMapEvents({
    click(e) {
      setCoordinates(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

const MapController = ({
  coordinates,
}: {
  coordinates: [number, number] | null
}) => {
  const map = useMap()

  useEffect(() => {
    if (coordinates) {
      map.flyTo(coordinates, 14, {
        duration: 1.5,
      })
    }
  }, [coordinates, map])

  return null
}

const MapPicker = ({ latitude, longitude, setCoordinates }: MapPickerProps) => {
  const defaultPosition: [number, number] = [20.5937, 78.9629] // India center
  const position: [number, number] =
    latitude && longitude ? [latitude, longitude] : defaultPosition

  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const [flyToPos, setFlyToPos] = useState<[number, number] | null>(null)

  const handleSearch = async () => {
    if (!search) return
    setSearching(true)

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`
      )
      const data = await res.json()

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat)
        const lng = parseFloat(data[0].lon)
        setCoordinates(lat, lng)
        setFlyToPos([lat, lng])
      }
    } catch (err) {
      console.error('Geocoding error:', err)
    }

    setSearching(false)
  }

  return (
    <div className="grid gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={handleSearch}
          disabled={searching}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {searching ? 'Searching...' : 'Search'}
        </button>
      </div>

      <MapContainer
        center={position}
        zoom={latitude && longitude ? 14 : 5}
        scrollWheelZoom={true}
        style={{ height: '300px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {latitude && longitude && (
          <Marker
            position={[latitude, longitude]}
            icon={L.icon({
              iconUrl:
                'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          />
        )}
        <LocationMarker setCoordinates={setCoordinates} />
        <MapController coordinates={flyToPos} />
      </MapContainer>
    </div>
  )
}

export default MapPicker
