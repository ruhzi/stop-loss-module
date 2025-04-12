# price_feed.py

import asyncio
import websockets
import json
from stop_loss_manager import check_prices


async def subscribe_price_feed(market: str):
    uri = "wss://api.hyperliquid-testnet.xyz/ws"

    try:
        async with websockets.connect(uri) as ws:
            sub_msg = {
                "method": "subscribe",
                "subscription": {
                    "type": "l2Book",
                    "coin": market
                }
            }
            await ws.send(json.dumps(sub_msg))
            print(f"[WS] Subscribed to {market} feed")

            while True:
                message = await ws.recv()
                try:
                    data = json.loads(message)

                    if data.get("channel") == "l2Book" and "data" in data:
                        levels = data["data"]["levels"]
                        bid = float(levels[0][0]["px"])
                        ask = float(levels[1][0]["px"])
                        price = (bid + ask) / 2
                        print(f"[WS] {market} Price: ${price:.2f}")
                        check_prices(market, price)

                except (json.JSONDecodeError, KeyError) as e:
                    print(f"[WS] Message error: {e}")

    except websockets.exceptions.ConnectionClosed as e:
        print(f"[WS] WebSocket closed: {e}")
    except Exception as e:
        print(f"[WS] WebSocket error: {e}")


if __name__ == "__main__":
    try:
        asyncio.run(subscribe_price_feed("ETH"))
    except KeyboardInterrupt:
        print("[WS] Shutdown requested.")
