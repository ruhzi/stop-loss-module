# event_listener.py

import os
import time
import json
from pathlib import Path
from web3 import Web3
from dotenv import load_dotenv
from stop_loss_manager import register_stop_loss_logic

# --- Load .env from project root ---
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

# --- Read environment variables ---
RPC_URL = f"https://arb-sepolia.g.alchemy.com/v2/{os.getenv('ALCHEMY_API_KEY')}"
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")

# --- Load ABI ---
with open("abi.json") as f:
    abi = json.load(f)

# --- Setup Web3 connection ---
w3 = Web3(Web3.HTTPProvider(RPC_URL))
contract = w3.eth.contract(address=Web3.to_checksum_address(CONTRACT_ADDRESS), abi=abi)

print(f"🔗 Connected to chain: {w3.is_connected()}")

# --- Handle incoming on-chain events ---
def handle_event(event):
    args = event["args"]
    market = args["market"]
    threshold = args["threshold"]
    size = args["size"]

    print(f"📥 [CHAIN] New Stop-Loss: {market} @ {threshold}, size: {size}")
    register_stop_loss_logic(market, threshold, size)

# --- Start event loop ---
def log_loop():
    event_filter = contract.events.StopLossRegistered.create_filter(fromBlock="latest")
    while True:
        for event in event_filter.get_new_entries():
            handle_event(event)
        time.sleep(2)  # Poll every 2 seconds

if __name__ == "__main__":
    try:
        log_loop()
    except KeyboardInterrupt:
        print("👋 Listener stopped.")
