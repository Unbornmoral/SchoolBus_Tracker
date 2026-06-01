type Position = { lat: number; lng: number };

// Same coordinates as in Map.tsx
const routeCoordinates: [number, number][] = [
  [-74.0060, 40.7128],
  [-74.0070, 40.7138],
  [-74.0080, 40.7148],
  [-74.0090, 40.7158],
  [-74.0100, 40.7168],
  [-74.0110, 40.7178],
];

class MockSocket {
  private listeners: ((pos: Position) => void)[] = [];
  private currentStep = 0;
  private interval: NodeJS.Timeout | null = null;

  connect() {
    this.startStreaming();
  }

  onPositionUpdate(callback: (pos: Position) => void) {
    this.listeners.push(callback);
  }

  private startStreaming() {
    if (this.interval) return;
    
    this.interval = setInterval(() => {
      // Follow the route
      const coord = routeCoordinates[this.currentStep];
      const pos = { lng: coord[0], lat: coord[1] };
      
      this.listeners.forEach(cb => cb(pos));
      
      this.currentStep = (this.currentStep + 1) % routeCoordinates.length;
    }, 3000);
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.listeners = [];
  }
}

export const mockSocket = new MockSocket();
