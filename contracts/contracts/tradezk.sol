// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";

interface IPUSHCommInterface {
    function sendNotification(
        address _channel,
        address _recipient,
        bytes calldata _identity
    ) external;
}

contract Tradezk {
    address public owner;
    IERC20 public usdcToken; // Assuming USDC is an ERC-20 token
    IPUSHCommInterface public push;

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

    event OrderCreated(
        uint256 orderId,
        address seller,
        uint256 amount,
        string upiId,
        uint256 rate
    );
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

    constructor(address _usdcToken, address _pushProtocol) {
        owner = msg.sender;
        usdcToken = IERC20(_usdcToken);
        push = IPUSHCommInterface(_pushProtocol);
    }

    function checkReputation() external view returns (uint256) {
        return reputation[msg.sender];
    }

    function registerReputation() external {
        reputation[msg.sender] = 100;
    }

    function sendTestNotification() external {
        push.sendNotification(
            0xad18c8ac2F189Ca0a715122a46ef9ACB3dD6Bb5E, // from channel - recommended to set channel via dApp and put it's value -> then once contract is deployed, go back and add the contract address as delegate for your channel
            msg.sender, // to recipient, put address(this) in case you want Broadcast or Subset. For targeted put the address to which you want to send
            bytes(
                string(
                    // We are passing identity here: https://push.org/docs/notifications/notification-standards/notification-standards-advance/#notification-identity
                    abi.encodePacked(
                        "0", // this represents minimal identity, learn more: https://push.org/docs/notifications/notification-standards/notification-standards-advance/#notification-identity
                        "+", // segregator
                        "3", // define notification type:  https://push.org/docs/notifications/build/types-of-notification (1, 3 or 4) = (Broadcast, targeted or subset)
                        "+", // segregator
                        "Sold USDC Succesfully!", // this is notification title
                        "+", // segregator
                        "Your order has been completed!" // notification body
                    )
                )
            )
        );
    }

    function placeOrderInterest(
        uint256 orderId
    )
        external
        orderExists(orderId)
        orderNotDeleted(orderId)
        returns (Order memory)
    {
        require(
            reputation[msg.sender] >= 5,
            "Insufficient reputation to place order interest"
        );

        // Deduct 5 reputation points
        reputation[msg.sender] -= 5;

        // Emit an event to indicate interest
        emit OrderInterestPlaced(orderId, msg.sender);

        // Return the details of the order
        return orders[orderId];
    }

    function createOrder(
        uint256 amount,
        string memory upiId,
        uint256 rate
    ) external {
        uint256 orderId = nextOrderId++;

        // Transfer USDC to the contract
        require(
            usdcToken.transferFrom(msg.sender, address(this), amount),
            "Failed to transfer USDC"
        );

        Order storage newOrder = orders[orderId];
        newOrder.orderId = orderId;
        newOrder.seller = msg.sender;
        newOrder.amount = amount;
        newOrder.upiId = upiId;
        newOrder.rate = rate;

        push.sendNotification(
            0xad18c8ac2F189Ca0a715122a46ef9ACB3dD6Bb5E, // from channel - recommended to set channel via dApp and put it's value -> then once contract is deployed, go back and add the contract address as delegate for your channel
            orders[orderId].seller, // to recipient, put address(this) in case you want Broadcast or Subset. For targeted put the address to which you want to send
            bytes(
                string(
                    // We are passing identity here: https://push.org/docs/notifications/notification-standards/notification-standards-advance/#notification-identity
                    abi.encodePacked(
                        "0", // this represents minimal identity, learn more: https://push.org/docs/notifications/notification-standards/notification-standards-advance/#notification-identity
                        "+", // segregator
                        "3", // define notification type:  https://push.org/docs/notifications/build/types-of-notification (1, 3 or 4) = (Broadcast, targeted or subset)
                        "+", // segregator
                        "Order placed Succesfully!", // this is notification title
                        "+", // segregator
                        "Your order has been placed to sell USDC!" // notification body
                    )
                )
            )
        );

        emit OrderCreated(orderId, msg.sender, amount, upiId, rate);
    }

    function updateOrderRate(
        uint256 orderId,
        uint256 newRate
    ) external onlyOwner orderExists(orderId) orderNotDeleted(orderId) {
        orders[orderId].rate = newRate;
        emit OrderUpdated(orderId, newRate);
    }

    function deleteOrder(
        uint256 orderId
    ) external onlyOwner orderExists(orderId) orderNotDeleted(orderId) {
        // Transfer remaining USDC back to the seller
        usdcToken.transfer(orders[orderId].seller, orders[orderId].amount);

        orders[orderId].isDeleted = true;
        emit OrderDeleted(orderId);
    }

    function fulfillOrder(
        uint256 orderId,
        uint256 zkProof
    ) external orderExists(orderId) orderNotDeleted(orderId) {
        require(
            reputation[msg.sender] >= 5,
            "Insufficient reputation to fulfill order"
        );

        // Perform zk-SNARK verification here (not implemented in this example)

        // Release escrow funds to the buyer
        usdcToken.transfer(msg.sender, orders[orderId].amount);

        // Reward the buyer with 5 reputation points
        reputation[msg.sender] -= 5;

        // Close the order
        orders[orderId].isDeleted = true;

        push.sendNotification(
            0xad18c8ac2F189Ca0a715122a46ef9ACB3dD6Bb5E, // from channel - recommended to set channel via dApp and put it's value -> then once contract is deployed, go back and add the contract address as delegate for your channel
            orders[orderId].seller, // to recipient, put address(this) in case you want Broadcast or Subset. For targeted put the address to which you want to send
            bytes(
                string(
                    // We are passing identity here: https://push.org/docs/notifications/notification-standards/notification-standards-advance/#notification-identity
                    abi.encodePacked(
                        "0", // this represents minimal identity, learn more: https://push.org/docs/notifications/notification-standards/notification-standards-advance/#notification-identity
                        "+", // segregator
                        "3", // define notification type:  https://push.org/docs/notifications/build/types-of-notification (1, 3 or 4) = (Broadcast, targeted or subset)
                        "+", // segregator
                        "Sold USDC Succesfully!", // this is notification title
                        "+", // segregator
                        "Your order has been completed!" // notification body
                    )
                )
            )
        );

        emit OrderFulfilled(orderId, msg.sender);
    }

    function getAllOrders() external view returns (Order[] memory) {
        // Create an array to store open orders
        Order[] memory openOrders = new Order[](nextOrderId - 1);

        // Iterate through orders to find open orders
        uint256 index = 0;
        for (uint256 i = 1; i < nextOrderId; i++) {
            if (!orders[i].isDeleted) {
                openOrders[index] = orders[i];
                index++;
            }
        }

        return openOrders;
    }
}
