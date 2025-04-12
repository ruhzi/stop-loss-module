// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StopLossRegistry {
    struct StopLoss {
        address user;
        string market;
        uint256 threshold;
        uint256 size;
        bool triggered;
    }

    mapping(uint256 => StopLoss) public orders;
    uint256 public orderCount;

    event StopLossRegistered(uint256 indexed id, address indexed user, string market, uint256 threshold, uint256 size);
    event StopLossTriggered(uint256 indexed id, uint256 marketPrice);

    function registerStopLoss(string calldata market, uint256 threshold, uint256 size) external {
        orders[orderCount] = StopLoss(msg.sender, market, threshold, size, false);
        emit StopLossRegistered(orderCount, msg.sender, market, threshold, size);
        orderCount++;
    }

    function markTriggered(uint256 id, uint256 marketPrice) external {
        StopLoss storage sl = orders[id];
        require(!sl.triggered, "Already triggered");
        sl.triggered = true;
        emit StopLossTriggered(id, marketPrice);
    }
}
