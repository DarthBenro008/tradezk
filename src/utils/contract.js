import { Contract, Interface } from "ethers";

const abi = [
  {
    inputs: [
      { internalType: "address", name: "_usdcToken", type: "address" },
      { internalType: "address", name: "_pushProtocol", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      { indexed: false, internalType: "string", name: "upiId", type: "string" },
      {
        indexed: false,
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
    ],
    name: "OrderCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
    ],
    name: "OrderDeleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
    ],
    name: "OrderFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
    ],
    name: "OrderInterestPlaced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newRate",
        type: "uint256",
      },
    ],
    name: "OrderUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "checkReputation",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "string", name: "upiId", type: "string" },
      { internalType: "uint256", name: "rate", type: "uint256" },
    ],
    name: "createOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "orderId", type: "uint256" }],
    name: "deleteOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "orderId", type: "uint256" },
      { internalType: "uint256", name: "zkProof", type: "uint256" },
    ],
    name: "fulfillOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllOrders",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "orderId", type: "uint256" },
          { internalType: "address", name: "seller", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "string", name: "upiId", type: "string" },
          { internalType: "uint256", name: "rate", type: "uint256" },
          { internalType: "bool", name: "isDeleted", type: "bool" },
        ],
        internalType: "struct Tradezk.Order[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOrderId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "orders",
    outputs: [
      { internalType: "uint256", name: "orderId", type: "uint256" },
      { internalType: "address", name: "seller", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "string", name: "upiId", type: "string" },
      { internalType: "uint256", name: "rate", type: "uint256" },
      { internalType: "bool", name: "isDeleted", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "orderId", type: "uint256" }],
    name: "placeOrderInterest",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "orderId", type: "uint256" },
          { internalType: "address", name: "seller", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "string", name: "upiId", type: "string" },
          { internalType: "uint256", name: "rate", type: "uint256" },
          { internalType: "bool", name: "isDeleted", type: "bool" },
        ],
        internalType: "struct Tradezk.Order",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "push",
    outputs: [
      {
        internalType: "contract IPUSHCommInterface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "registerReputation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "reputation",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sendTestNotification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "orderId", type: "uint256" },
      { internalType: "uint256", name: "newRate", type: "uint256" },
    ],
    name: "updateOrderRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "usdcToken",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

export default class TradezkContract {
  _signer;
  _contract;
  constructor(signer) {
    this._signer = signer;
    this._contract = new Contract(
      "0x3D2DE24CF696eBe80dD768029b597A9b0e750c0A",
      abi,
      signer
    );
  }

  async reputation() {
    console.log("checking rep");
    const rep = await this._contract.reputation(
      "0xad18c8ac2F189Ca0a715122a46ef9ACB3dD6Bb5E"
    );
    console.log("reputation is:", rep);
  }

  async orders() {
    BigInt.prototype.toJSON = function () {
      return this.toString();
    };
    const orders = await this._contract.getAllOrders();
    const res = JSON.parse(JSON.stringify(orders));
    return res.map((x) => {
      const y = {
        id: x[0],
        sender: x[1],
        amount: x[2],
        upi: x[3],
        rate: x[4],
        deleted: x[5],
        rs: Number(x[2]) * Number(x[4]),
      };
      return y;
    });
  }

  generateCode() {
    const iface = new Interface(abi);
    const data = iface.encodeFunctionData("registerReputation", []);
    return data;
  }

  generateCodeForCreateOrder(amount, upi, rate) {
    const iface = new Interface(abi);
    const data = iface.encodeFunctionData("createOrder", [amount, upi, rate]);
    return data;
  }

  generateCodeForFullfill(orderId, zkProof) {
    const iface = new Interface(abi);
    const data = iface.encodeFunctionData("fulfillOrder", [orderId, zkProof]);
    return data;
  }
}
