# stop_loss_manager.py
from typing import List, Dict
from trade_executor import execute_trade
from storage import save_orders, load_orders

stop_loss_orders: List[Dict] = load_orders()

def register_stop_loss_logic(market: str, threshold: float, size: float, address: str):
    order = {
        "market": market,
        "threshold": threshold,
        "size": size,
        "address": address,
        "triggered": False,
    }
    stop_loss_orders.append(order)
    save_orders(stop_loss_orders)
    print(f"📝 Registered stop-loss: {market} @ ${threshold} for {size} | Wallet: {address}")

def check_prices(market: str, current_price: float):
    for order in stop_loss_orders:
        if (
            order["market"] == market and
            not order["triggered"] and
            current_price <= order["threshold"]
        ):
            print(f"🚨 Triggered {market} at ${current_price:.2f}! Executing trade...")
            success = execute_trade(market, order["size"])
            if success:
                order["triggered"] = True
                save_orders(stop_loss_orders)