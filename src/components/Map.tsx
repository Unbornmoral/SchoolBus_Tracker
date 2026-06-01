'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mockSocket } from '@/services/mockSocket';

// Note: Replace with actual token or use env variable
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoibW9ja21hcCIsImEiOiJjbHh6eXp6eXowMDEyMmpzYm54eXp6eXp6In0.mock-token';

export default function BusMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [lng, setLng] = useState(-74.0060);
  const [lat, setLat] = useState(40.7128);
  const [zoom, setZoom] = useState(14);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [lng, lat],
        zoom: zoom
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Create a custom bus marker
      const el = document.createElement('div');
      el.className = 'bus-marker';
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.backgroundColor = '#facc15';
      el.style.borderRadius = '50%';
      el.style.border = '4px solid white';
      el.style.boxShadow = '0 0 15px rgba(250, 204, 21, 0.5)';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.innerHTML = '<span style="font-size: 20px;">🚌</span>';

      marker.current = new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .addTo(map.current);

      mockSocket.connect();
      mockSocket.onPositionUpdate((pos) => {
        if (marker.current && map.current) {
          // Smooth interpolation would normally be handled by a library or requestAnimationFrame
          // For MVP, we'll just update position
          marker.current.setLngLat([pos.lng, pos.lat]);
          
          // Optionally pan map to follow bus
          // map.current.easeTo({ center: [pos.lng, pos.lat], duration: 1000 });
        }
      });
    } catch (e) {
      console.error('Mapbox error:', e);
    }

    return () => {
      mockSocket.disconnect();
      map.current?.remove();
    };
  }, []);

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden border border-white/5 relative">
      <div ref={mapContainer} className="w-full h-full" />
      <div className="absolute top-4 left-4 glass px-4 py-2 rounded-xl pointer-events-none">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Live Tracking</p>
        <p className="text-sm font-bold">Bus #42 - Active</p>
      </div>
    </div>
  );
}
