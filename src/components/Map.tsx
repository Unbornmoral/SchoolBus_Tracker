'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mockSocket } from '@/services/mockSocket';

// Note: Ensure this is set in your .env.local
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoibW9ja21hcCIsImEiOiJjbHh6eXp6eXowMDEyMmpzYm54eXp6eXp6In0.mock-token';

// Placeholder route coordinates
const routeCoordinates: [number, number][] = [
  [-74.0060, 40.7128],
  [-74.0070, 40.7138],
  [-74.0080, 40.7148],
  [-74.0090, 40.7158],
  [-74.0100, 40.7168],
  [-74.0110, 40.7178],
];

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
        zoom: zoom,
        attributionControl: false
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current.on('load', () => {
        if (!map.current) return;

        // Add Route Polyline
        map.current.addSource('route', {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              'coordinates': routeCoordinates
            }
          }
        });

        map.current.addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'route',
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#facc15',
            'line-width': 6,
            'line-opacity': 0.6
          }
        });

        // Add Glow effect to route
        map.current.addLayer({
          'id': 'route-glow',
          'type': 'line',
          'source': 'route',
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#facc15',
            'line-width': 12,
            'line-blur': 8,
            'line-opacity': 0.3
          }
        });

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
        el.style.transition = 'transform 0.5s ease-out';
        el.innerHTML = '<span style="font-size: 20px;">🚌</span>';

        marker.current = new mapboxgl.Marker(el)
          .setLngLat([lng, lat])
          .addTo(map.current);

        mockSocket.connect();
        mockSocket.onPositionUpdate((pos) => {
          if (marker.current && map.current) {
            // Smoothly move marker
            marker.current.setLngLat([pos.lng, pos.lat]);
            
            // Pan map to follow if needed
            // map.current.easeTo({ center: [pos.lng, pos.lat], duration: 1000 });
          }
        });
      });

    } catch (e) {
      console.error('Mapbox error:', e);
    }

    return () => {
      mockSocket.disconnect();
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden border border-white/5 relative">
      <div ref={mapContainer} className="w-full h-full min-h-[300px]" />
      <div className="absolute top-4 left-4 glass px-4 py-2 rounded-xl pointer-events-none z-10">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Live Tracking</p>
        <p className="text-sm font-bold">Bus #42 - Active</p>
      </div>
      {!mapboxgl.accessToken?.includes('pk.') && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 z-20 p-6 text-center">
          <p className="text-sm text-slate-300">
            Mapbox Token Missing.<br/>Please add <code className="bg-white/10 px-1 rounded">NEXT_PUBLIC_MAPBOX_TOKEN</code> to your environment.
          </p>
        </div>
      )}
    </div>
  );
}
