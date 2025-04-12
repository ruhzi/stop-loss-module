# test_backend_flow.py

from stop_loss_manager import register_stop_loss_logic, check_prices, stop_loss_orders

register_stop_loss_logic("ETH", 1600, 0.5)
print("Before:", stop_loss_orders)

check_prices("ETH", 1599)  # should trigger
print("After:", stop_loss_orders)
