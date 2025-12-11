import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export default function LocationMap({ latitude = -1.2841, longitude = 36.8155, title = "Quick and Quality Shipping Services" }) {
  const position = [latitude, longitude];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Find Us on the Map</h2>
            <p className="text-gray-500">
              Visit our office in Nairobi, Kenya
            </p>
          </div>

          <div className="rounded-xl overflow-hidden shadow-elegant border" style={{ height: '450px' }}>
            <MapContainer
              center={position}
              zoom={15}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup className="leaflet-popup">
                  <div className="text-center">
                    <h3 className="font-bold text-red-800 mb-2">{title}</h3>
                    <p className="text-sm">123 Moi Avenue, Nairobi Kenya</p>
                    <p className="text-sm mt-2 font-semibold text-red-800">+254790814158</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          <div className="mt-6 text-center text-gray-600 text-sm">
            <p>📍 Located at 123 Moi Avenue, Nairobi, Kenya</p>
            <p>Click the marker on the map to see more details</p>
          </div>
        </div>
      </div>
    </section>
  );
}
