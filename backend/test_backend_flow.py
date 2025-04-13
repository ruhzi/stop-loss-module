# test_backend_flow.py

from stop_loss_manager import register_stop_loss_logic, check_prices, stop_loss_orders

register_stop_loss_logic("ETH", 1600, 0.5, "0xB795f6ec04e01a82f75Db171387f293F0ed1b203")
print("Before:", stop_loss_orders)

check_prices("ETH", 1599)  # should trigger
print("After:", stop_loss_orders)
