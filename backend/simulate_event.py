from event_listener import handle_event

# Fake event data that mimics the real StopLossRegistered log
fake_event = {
    "args": {
        "id": 999,  # not used in logic
        "market": "BTC",
        "threshold": 23000,
        "size": 1.25,
        "user": "0x000000000000000000000000000000000000dEaD"
    }
}

handle_event(fake_event)
