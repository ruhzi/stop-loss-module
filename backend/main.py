# main.py
from fastapi import FastAPI
from pydantic import BaseModel
from stop_loss_manager import register_stop_loss_logic, stop_loss_orders
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StopLossRequest(BaseModel):
    market: str
    threshold: float
    size: float
    address: str

@app.post("/api/register")
def register_stop_loss(order: StopLossRequest):
    register_stop_loss_logic(order.market, order.threshold, order.size, order.address)
    return {
        "status": "registered",
        "market": order.market,
        "threshold": order.threshold,
        "size": order.size,
        "address": order.address
    }

@app.get("/api/orders")
def get_orders(address: str = None):
    if address:
        return [order for order in stop_loss_orders if order.get("address") == address]
    return stop_loss_orders

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)