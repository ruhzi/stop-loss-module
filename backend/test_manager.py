# test_manager.py

import unittest
from stop_loss_manager import register_stop_loss_logic, check_prices, stop_loss_orders


class TestStopLossManager(unittest.TestCase):

    def setUp(self):
        stop_loss_orders.clear()

    def test_register_order(self):
        register_stop_loss_logic("ETH", 1600.0, 0.5)
        self.assertEqual(len(stop_loss_orders), 1)
        self.assertEqual(stop_loss_orders[0]["market"], "ETH")
        self.assertEqual(stop_loss_orders[0]["threshold"], 1600.0)
        self.assertFalse(stop_loss_orders[0]["triggered"])

    def test_trigger_on_threshold(self):
        register_stop_loss_logic("ETH", 1600.0, 0.5)
        check_prices("ETH", 1599.0)
        self.assertTrue(stop_loss_orders[0]["triggered"])

    def test_no_retrigger(self):
        register_stop_loss_logic("ETH", 1600.0, 0.5)
        check_prices("ETH", 1599.0)
        check_prices("ETH", 1598.0)
        triggered = [o for o in stop_loss_orders if o["triggered"]]
        self.assertEqual(len(triggered), 1)


if __name__ == "__main__":
    unittest.main()
