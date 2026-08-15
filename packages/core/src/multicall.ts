// Multicall2 ABI (partial) - aggregate/tryAggregate style
export const MULTICALL2_ABI = [
  {
    "constant": true,
    "inputs": [
      {
        "components": [
          { "name": "target", "type": "address" },
          { "name": "callData", "type": "bytes" }
        ],
        "name": "calls",
        "type": "tuple[]"
      },
      { "name": "requireSuccess", "type": "bool" }
    ],
    "name": "tryAggregate",
    "outputs": [
      {
        "components": [
          { "name": "success", "type": "bool" },
          { "name": "returnData", "type": "bytes" }
        ],
        "name": "returnData",
        "type": "tuple[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
