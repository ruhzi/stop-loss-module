# main.py

from fastapi import FastAPI
from pydantic import BaseModel
from stop_loss_manager import register_stop_loss_logic, stop_loss_orders
import uvicorn

from fastapi.middleware.cors import CORSMiddleware




app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class StopLossRequest(BaseModel):
    market: str
    threshold: float
    size: float

@app.post("/api/register")
def register_stop_loss(order: StopLossRequest):
    register_stop_loss_logic(order.market, order.threshold, order.size)
    return {
        "status": "registered",
        "market": order.market,
        "threshold": order.threshold,
        "size": order.size,
    }

# ✅ New endpoint for frontend to display all current orders
@app.get("/api/orders")
def get_orders():
    return stop_loss_orders

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
