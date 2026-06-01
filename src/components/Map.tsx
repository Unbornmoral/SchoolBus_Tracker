'use client';

import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockSocket } from '@/services/mockSocket';

// Route coordinates in [lat, lng] format
const routeCoordinates: [number, number][] = [
  [40.7128, -74.0060],
  [40.7138, -74.0070],
  [40.7148, -74.0080],
  [40.7158, -74.0090],
  [40.7168, -74.0100],
  [40.7178, -74.0110],
];

// Stop coordinates (markers)
const stopCoordinates: [number, number][] = [
  [40.7128, -74.0060],
  [40.7148, -74.0080],
  [40.7178, -74.0110],
];

// Component to handle map centering and updates
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    // Optionally pan map to follow bus
    // map.panTo(center);
  }, [center, map]);
  return null;
}

export default function BusMap() {
  const [busPos, setBusPos] = useState<[number, number]>([40.7128, -74.0060]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Fix for default marker icons in Leaflet with Next.js
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    setIsClient(true);
    mockSocket.connect();
    mockSocket.onPositionUpdate((pos) => {
      setBusPos([pos.lat, pos.lng]);
    });

    return () => {
      mockSocket.disconnect();
    };
  }, []);

  // Custom Bus Icon
  const busIcon = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return L.divIcon({
      className: 'custom-bus-icon',
      html: `<div class="bus-marker" style="width: 40px; height: 40px; background-color: #facc15; border-radius: 50%; border: 4px solid white; box-shadow: 0 0 15px rgba(250, 204, 21, 0.5); display: flex; align-items: center; justify-content: center; transition: all 0.5s ease-out;"><span style="font-size: 20px;">🚌</span></div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  }, []);

  if (!isClient) return <div className="w-full h-full bg-slate-900 animate-pulse rounded-3xl" />;

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden border border-white/5 relative bg-slate-900">
      <MapContainer 
        center={[40.7128, -74.0060]} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {/* Route Polyline */}
        <Polyline 
          positions={routeCoordinates} 
          pathOptions={{ 
            color: '#facc15', 
            weight: 6, 
            opacity: 0.6,
            lineJoin: 'round',
            lineCap: 'round'
          }} 
        />

        {/* Route Glow (simulated with second polyline) */}
        <Polyline 
          positions={routeCoordinates} 
          pathOptions={{ 
            color: '#facc15', 
            weight: 12, 
            opacity: 0.2,
            lineJoin: 'round',
            lineCap: 'round',
            dashArray: '1, 1'
          }} 
        />

        {/* Stop Markers */}
        {stopCoordinates.map((stop, idx) => (
          <Marker key={idx} position={stop} />
        ))}

        {/* Bus Marker */}
        {busIcon && (
          <Marker position={busPos} icon={busIcon} />
        )}

        <MapController center={busPos} />
      </MapContainer>

      <div className="absolute top-4 left-4 glass px-4 py-2 rounded-xl pointer-events-none z-[1000]">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Live Tracking</p>
        <p className="text-sm font-bold">Bus #42 - Active</p>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-[1000]">
         <div className="glass px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            OSM + Leaflet
         </div>
      </div>
    </div>
  );
}
