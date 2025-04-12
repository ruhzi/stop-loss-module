# 🛑 Decentralized Stop-Loss Module – Backend

A backend system for a decentralized stop-loss trading module built using **FastAPI** and **Web3.py**, integrated with **Hyperliquid Testnet** for price feeds and **Arbitrum Sepolia** for on-chain state syncing.

---

## 🚀 Features

- Register stop-loss orders via REST API
- Subscribe to live price feeds using WebSockets
- Auto-execute market sell trades (mock or real)
- Persist state locally using JSON
- Sync triggered orders on-chain via smart contract
- Listen to `StopLossRegistered` on-chain events and reflect them in backend
- Basic unit tests to verify registration and trigger logic

---

## 🧱 Tech Stack

- **Python 3.10+**
- **FastAPI** (REST API)
- **Web3.py** (Blockchain interactions)
- **httpx** (HTTP client)
- **websockets** (Hyperliquid feed)
- **dotenv** (Environment config)
- **unittest** (Testing)

---

## 📁 Project Structure

