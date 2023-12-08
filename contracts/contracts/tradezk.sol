// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";

contract Tradezkusdc {
    address public owner;
    IERC20 public usdcToken; // Assuming USDC is an ERC-20 token

    struct Order {
        uint256 orderId;
        address seller;
        uint256 amount;
        string upiId;
        uint256 rate;
        bool isDeleted;
    }

    mapping(uint256 => Order) public orders;
    uint256 public nextOrderId = 1;

    mapping(address => uint256) public reputation;

    event OrderCreated(uint256 orderId, address seller, uint256 amount, string upiId, uint256 rate);
    event OrderUpdated(uint256 orderId, uint256 newRate);
    event OrderDeleted(uint256 orderId);
    event OrderFulfilled(uint256 orderId, address buyer);
    event OrderInterestPlaced(uint256 orderId, address buyer);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier orderExists(uint256 orderId) {
        require(orders[orderId].seller != address(0), "Order does not exist");
        _;
    }

    modifier orderNotDeleted(uint256 orderId) {
        require(!orders[orderId].isDeleted, "Order is already deleted");
        _;
    }

    constructor(address _usdcToken) {
        owner = msg.sender;
        usdcToken = IERC20(_usdcToken);
    }

    function checkReputation() external view returns (uint256) {
        return reputation[msg.sender];
    }

    function placeOrderInterest(uint256 orderId) external orderExists(orderId) orderNotDeleted(orderId) returns (Order memory) {
        require(reputation[msg.sender] >= 5, "Insufficient reputation to place order interest");

        // Deduct 5 reputation points
        reputation[msg.sender] -= 5;

        // Emit an event to indicate interest
        emit OrderInterestPlaced(orderId, msg.sender);

        // Return the details of the order
        return orders[orderId];
    }

    function createOrder(uint256 amount, string memory upiId, uint256 rate) external {
        uint256 orderId = nextOrderId++;

        // Transfer USDC to the contract
        require(usdcToken.transferFrom(msg.sender, address(this), amount), "Failed to transfer USDC");

        Order storage newOrder = orders[orderId];
        newOrder.orderId = orderId;
        newOrder.seller = msg.sender;
        newOrder.amount = amount;
        newOrder.upiId = upiId;
        newOrder.rate = rate;

        emit OrderCreated(orderId, msg.sender, amount, upiId, rate);
    }

    function updateOrderRate(uint256 orderId, uint256 newRate) external onlyOwner orderExists(orderId) orderNotDeleted(orderId) {
        orders[orderId].rate = newRate;
        emit OrderUpdated(orderId, newRate);
    }

    function deleteOrder(uint256 orderId) external onlyOwner orderExists(orderId) orderNotDeleted(orderId) {
        // Transfer remaining USDC back to the seller
        usdcToken.transfer(orders[orderId].seller, orders[orderId].amount);

        orders[orderId].isDeleted = true;
        emit OrderDeleted(orderId);
    }

    function fulfillOrder(uint256 orderId, uint256 zkProof) external orderExists(orderId) orderNotDeleted(orderId) {
        require(reputation[msg.sender] >= 5, "Insufficient reputation to fulfill order");

        // Perform zk-SNARK verification here (not implemented in this example)

        // Release escrow funds to the buyer
        usdcToken.transfer(msg.sender, orders[orderId].amount);

        // Reward the buyer with 5 reputation points
        reputation[msg.sender] -= 5;

        // Close the order
        orders[orderId].isDeleted = true;

        emit OrderFulfilled(orderId, msg.sender);
    }
}
