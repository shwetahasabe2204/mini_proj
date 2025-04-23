import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

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

const MapPicker = ({ latitude, longitude, setCoordinates }: MapPickerProps) => {
  const position: [number, number] =
    latitude && longitude ? [latitude, longitude] : [20.5937, 78.9629] // Default to India center

  return (
    <MapContainer
      center={position}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: '300px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {latitude && longitude && <Marker position={[latitude, longitude]} />}
      <LocationMarker setCoordinates={setCoordinates} />
    </MapContainer>
  )
}

export default MapPicker
