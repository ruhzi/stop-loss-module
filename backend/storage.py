# storage.py

import json
from typing import List, Dict

FILE_PATH = "orders.json"

def save_orders(orders: List[Dict]):
    try:
        with open(FILE_PATH, "w") as f:
            json.dump(orders, f)
    except Exception as e:
        print(f"[Storage] Failed to save orders: {e}")

def load_orders() -> List[Dict]:
    try:
        with open(FILE_PATH, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []
    except Exception as e:
        print(f"[Storage] Failed to load orders: {e}")
        return []
