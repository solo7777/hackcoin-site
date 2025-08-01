const contractAddress = "0x1Fa5036a3df254Ead1A5930BD208Ac760b1C2010";
const contractABI = [
  // Mint
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Burn
  {
    "inputs": [
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let signer;
let contract;

async function connectWallet() {
  if (window.ethereum) {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractABI, signer);
      document.getElementById("status").innerText = "✅ Wallet connected.";
    } catch (err) {
      document.getElementById("status").innerText = `❌ ${err.message}`;
    }
  } else {
    alert("Install MetaMask!");
  }
}

async function mint() {
  const amount = document.getElementById("mintAmount").value;
  const ownerAddress = "0xb47e41F6BE46dB20d55eE2d35AfEd227e9178010"; // 🔁 нова адреса

  if (!contract) return alert("Connect wallet first.");
  try {
    const tx = await contract.mint(ownerAddress, ethers.utils.parseUnits(amount, 18));
    await tx.wait();
    document.getElementById("status").innerText = `✅ Minted ${amount} HackCoin to ${ownerAddress}.`;
  } catch (err) {
    document.getElementById("status").innerText = `❌ ${err.message}`;
  }
}

async function burn() {
  const amount = document.getElementById("burnAmount").value;
  if (!contract) return alert("Connect wallet first.");
  try {
    const tx = await contract.burn(ethers.utils.parseUnits(amount, 18));
    await tx.wait();
    document.getElementById("status").innerText = `🔥 Burned ${amount} HackCoin.`;
  } catch (err) {
    document.getElementById("status").innerText = `❌ ${err.message}`;
  }
}
