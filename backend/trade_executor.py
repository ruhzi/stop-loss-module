# trade_executor.py

import os
import time
import httpx
from eth_account import Account
from eth_account.messages import encode_defunct
from dotenv import load_dotenv

load_dotenv()

API_URL = "https://api.hyperliquid-testnet.xyz"
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
WALLET_ADDRESS = os.getenv("WALLET_ADDRESS")
MOCK_MODE = os.getenv("MOCK_MODE", "false").lower() == "true"


def sign_message(msg_dict):
    """Sign a message using wallet's private key."""
    message = encode_defunct(text=str(msg_dict))
    signed = Account.sign_message(message, private_key=PRIVATE_KEY)
    return signed.signature.hex()


def execute_trade(market: str, size: float) -> bool:
    if MOCK_MODE:
        print(f"🤖 [MOCK MODE] Would execute trade: Sell {size} {market}")
        return True

    order_payload = {
        "coin": market,
        "isBuy": False,
        "sz": str(size),
        "limitPx": None,  # Market order
        "orderType": "market",
        "timestamp": int(time.time() * 1000),
    }

    signature = sign_message(order_payload)

    request = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "exchange",
        "params": [
            {
                "sender": WALLET_ADDRESS,
                "order": order_payload,
                "sig": signature
            }
        ]
    }

    try:
        headers = {"Content-Type": "application/json"}
        response = httpx.post(API_URL, json=request, headers=headers, timeout=10)
        response.raise_for_status()
        print(f"✅ Trade Executed: {response.json()}")
        return True
    except Exception as e:
        print(f"❌ Trade failed: {str(e)}")
        return False
