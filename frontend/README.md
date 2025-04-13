# Stop-Loss Module Frontend

A modern React application for managing stop-loss orders using Hyperliquid's testnet API.

## Features

- Connect MetaMask wallet
- Create stop-loss orders for ETH and BTC
- View and monitor your active stop-loss orders
- Real-time order status updates

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension

## Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```
   cd frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Running the Application

1. Start the development server:
   ```
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To build the application for production:

```
npm run build
```

The built files will be in the `dist` directory.

## Backend Integration

This frontend is designed to work with the Stop-Loss Module backend. Make sure the backend server is running on `http://localhost:8000` before using this application.

## Technologies Used

- React
- Tailwind CSS
- ethers.js
- React Router
- Axios
- React Toastify
