# event_listener.py

from web3 import Web3
import json
from stop_loss_manager import register_stop_loss_logic

# --- Load ABI ---
with open("abi.json") as f:
    abi = json.load(f)

# --- Setup Web3 Connection ---
w3 = Web3(Web3.HTTPProvider("https://arb-sepolia.g.alchemy.com/v2/YOUR_API_KEY"))
contract_address = "0xYourContractAddress"
contract = w3.eth.contract(address=contract_address, abi=abi)

print(f"🔗 Connected to chain: {w3.is_connected()}")

def handle_event(event):
    id = event["args"]["id"]
    market = event["args"]["market"]
    threshold = event["args"]["threshold"]
    size = event["args"]["size"]

    print(f"📥 New On-Chain Stop-Loss | Market: {market}, Threshold: {threshold}, Size: {size}")
    register_stop_loss_logic(market, threshold, size)  # Register in in-memory list

def log_loop():
    event_filter = contract.events.StopLossRegistered.create_filter(fromBlock="latest")
    while True:
        for event in event_filter.get_new_entries():
            handle_event(event)

if __name__ == "__main__":
    try:
        log_loop()
    except KeyboardInterrupt:
        print("👋 Listener stopped.")
