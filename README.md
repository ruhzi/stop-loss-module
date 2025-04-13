# Stop-Loss Trading Module

A decentralized stop-loss module built using Hyperliquid's testnet API, FastAPI backend, and a React frontend with Tailwind CSS.

## Features

- 🔐 Wallet-based order registration via MetaMask
- 📡 Real-time price tracking with Hyperliquid testnet WebSocket feed
- ⚙️ Trigger logic and trade execution via backend logic
- 💾 Off-chain order persistence using orders.json
- 📊 Frontend UI to register, view, and manage stop-loss orders per wallet
- 🔁 Mock mode for demo-safe trade simulation

## Deployment on Render

### Prerequisites

- A Render account
- Git repository with this code

### Deployment Steps

1. **Fork or clone this repository**

2. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Select the repository
   - Choose "Python" as the environment

3. **Configure the service**
   - **Name**: stop-loss-api (or your preferred name)
   - **Environment**: Python
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **Set environment variables**
   - `MOCK_MODE`: Set to `true` for demo purposes
   - `PRIVATE_KEY`: Your Ethereum private key (for signing transactions)
   - `WALLET_ADDRESS`: Your Ethereum wallet address

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your application

### Environment Variables

The following environment variables are required:

- `PRIVATE_KEY`: Ethereum private key for signing transactions
- `WALLET_ADDRESS`: Ethereum wallet address
- `MOCK_MODE`: Set to `true` to enable mock mode (no real trades)

## Local Development

### Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## License

MIT