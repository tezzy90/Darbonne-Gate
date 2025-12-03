import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { PARCEL_COORDINATES, KEY_LOCATIONS } from '../constants';

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons (using colored versions of standard marker)
const createCustomIcon = (color: string) => {
  return new L.DivIcon({
    className: 'custom-marker',
    html: `<div style="
            background-color: ${color};
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

const parcelIcon = createCustomIcon('#D4AF37'); // Bayou Gold
const huntingIcon = createCustomIcon('#10B981'); // Emerald
const fishingIcon = createCustomIcon('#0EA5E9'); // Sky Blue
const infraIcon = createCustomIcon('#6B7280'); // Gray

// Component to update map center when coordinates change
const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const InteractiveMap: React.FC = () => {
  const center: [number, number] = [PARCEL_COORDINATES.lat, PARCEL_COORDINATES.lng];

  // 35 miles in meters = 56327
  const catchmentRadius = 56327;

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden border border-stone-800 shadow-2xl relative z-0">
      <MapContainer
        center={center}
        zoom={9}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater center={center} />

        {/* Catchment Radius */}
        <Circle
          center={center}
          radius={catchmentRadius}
          pathOptions={{ color: '#D4AF37', fillColor: '#D4AF37', fillOpacity: 0.1, weight: 1, dashArray: '5, 10' }}
        >
          <Popup>
            <div className="text-center">
              <strong className="block text-stone-800">35-Mile Catchment Area</strong>
              <span className="text-xs text-stone-600">Primary Market</span>
            </div>
          </Popup>
        </Circle>

        {/* Parcel Marker */}
        <Marker position={center} icon={parcelIcon}>
          <Popup>
            <div className="text-center">
              <strong className="block text-bayou-dark text-lg">D'Arbonne Gate</strong>
              <span className="text-sm text-stone-600">Future RV Resort Site</span>
            </div>
          </Popup>
        </Marker>

        {/* Key Locations */}
        {/* D'Arbonne NWR */}
        <Marker position={[32.5833, -92.3333]} icon={huntingIcon}>
          <Popup>
            <strong>D'Arbonne National Wildlife Refuge</strong><br />
            <span className="text-xs">Premier Waterfowl Hunting (3.1 mi)</span>
          </Popup>
        </Marker>

        {/* Lake D'Arbonne State Park */}
        <Marker position={[32.6833, -92.4167]} icon={fishingIcon}>
          <Popup>
            <strong>Lake D'Arbonne State Park</strong><br />
            <span className="text-xs">Top-Rated Crappie Fishing (5.2 mi)</span>
          </Popup>
        </Marker>

        {/* Monroe (Approx center) */}
        <Marker position={[32.5093, -92.1193]} icon={infraIcon}>
          <Popup>
            <strong>Monroe, LA</strong><br />
            <span className="text-xs">Major Metro Hub (24.8 mi)</span>
          </Popup>
        </Marker>

      </MapContainer>

      {/* Legend Overlay */}
      <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg shadow-lg z-[1000] text-xs space-y-2 backdrop-blur-sm border border-stone-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#D4AF37] border border-white shadow-sm"></div>
          <span className="font-semibold text-stone-800">D'Arbonne Gate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#10B981] border border-white shadow-sm"></div>
          <span className="text-stone-600">Hunting Access</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#0EA5E9] border border-white shadow-sm"></div>
          <span className="text-stone-600">Fishing Access</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-[#D4AF37] border-dashed"></div>
          <span className="text-stone-600">35-Mile Radius</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
