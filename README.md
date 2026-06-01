# SchoolBus_Tracker 🚌

A premium, AI-powered School Bus Tracking System with 3D visualization and real-time safety metrics.

## 🚀 Key Features

- **Live GPS Tracking**: Real-time bus location on a high-fidelity map with animated markers.
- **Route Visualization**: Dynamic route polylines with futuristic glow effects.
- **Role-Based Dashboards**:
  - **Parents**: Track child's commute, ETAs, and safety alerts.
  - **Drivers**: Manage student check-ins, routes, and emergency alerts.
  - **Admins**: Fleet-wide analytics, system health, and management.
- **3D Backgrounds**: Immersive deep-space 3D environment using React Three Fiber.
- **Responsive Design**: Mobile-first layout optimized for all devices.

## 🛠 Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **UI/Styling**: Tailwind CSS, Framer Motion, Lucide React
- **3D Engine**: React Three Fiber / Drei
- **Map Engine**: Mapbox GL
- **State Management**: Zustand
- **Icons**: Lucide React

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- A Mapbox Access Token (Get one at [mapbox.com](https://www.mapbox.com/))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Unbornmoral/SchoolBus_Tracker.git
   cd SchoolBus_Tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root and add your Mapbox token:
   ```env
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## 📍 Map Debugging & Integration

If the map is not appearing:
1. Ensure `NEXT_PUBLIC_MAPBOX_TOKEN` is correctly set in your environment (Vercel or local `.env`).
2. The `BusMap` component is dynamically imported with `ssr: false` to ensure it only runs in the browser.
3. Check the browser console for Mapbox 401 (Invalid Token) or 403 (URL not allowed) errors.

## 📄 License

MIT
