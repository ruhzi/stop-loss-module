 decentralized stop-loss module built using Hyperliquid's testnet API, FastAPI backend, and a minimal vanilla JS + Tailwind frontend. The system allows users to set price-triggered stop-loss orders, which are executed based on real-time price feeds from Hyperliquid.

🚀 Features

🔐 Wallet-based order registration via MetaMask

📡 Real-time price tracking with Hyperliquid testnet WebSocket feed

⚙️ Trigger logic and trade execution via backend logic

💾 Off-chain order persistence using orders.json

📊 Frontend UI to register, view, and manage stop-loss orders per wallet

🔁 Mock mode for demo-safe trade simulation

🧱 Tech Stack

📦 Backend

Python + FastAPI — REST API server

WebSocket Client — Live price feed from Hyperliquid testnet

Local JSON storage — Persistent orders via orders.json

Trade executor — Sends POST requests to Hyperliquid API

🌐 Frontend

Vanilla JavaScript — UI logic with ethers.js

Tailwind CSS — Responsive, modern styling

MetaMask — Wallet connection + address detection

🧪 How It Works

User connects MetaMask → app.js captures wallet address

User registers stop-loss order

Saved to backend via /api/register

Registered on Hyperliquid via trade API (mocked or real)

Backend listens to price feed

If price <= threshold, order is triggered

Trade is executed (or simulated)

Triggered state saved → UI updates live via loadOrders()