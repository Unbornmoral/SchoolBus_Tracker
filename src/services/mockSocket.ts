type Position = { lat: number; lng: number };

class MockSocket {
  private listeners: ((pos: Position) => void)[] = [];
  private currentPos: Position = { lat: 40.7128, lng: -74.0060 }; // Start in NYC
  private interval: NodeJS.Timeout | null = null;

  connect() {
    this.startStreaming();
  }

  onPositionUpdate(callback: (pos: Position) => void) {
    this.listeners.push(callback);
  }

  private startStreaming() {
    this.interval = setInterval(() => {
      // Simulate movement
      this.currentPos = {
        lat: this.currentPos.lat + (Math.random() - 0.5) * 0.001,
        lng: this.currentPos.lng + (Math.random() - 0.5) * 0.001
      };
      this.listeners.forEach(cb => cb(this.currentPos));
    }, 2000);
  }

  disconnect() {
    if (this.interval) clearInterval(this.interval);
    this.listeners = [];
  }
}

export const mockSocket = new MockSocket();
