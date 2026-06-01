import { create } from 'zustand';

interface BusState {
  busPosition: { lat: number; lng: number };
  busStatus: 'on-route' | 'delayed' | 'stopped';
  estimatedArrival: string;
  setBusPosition: (pos: { lat: number; lng: number }) => void;
  setBusStatus: (status: 'on-route' | 'delayed' | 'stopped') => void;
  setEstimatedArrival: (time: string) => void;
}

export const useBusStore = create<BusState>((set) => ({
  busPosition: { lat: 40.7128, lng: -74.0060 },
  busStatus: 'on-route',
  estimatedArrival: '12 min',
  setBusPosition: (pos) => set({ busPosition: pos }),
  setBusStatus: (status) => set({ busStatus: status }),
  setEstimatedArrival: (time) => set({ estimatedArrival: time }),
}));
