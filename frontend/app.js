const { ethers } = window;

const CONTRACT_ADDRESS = "0xB795f6ec04e01a82f75Db171387f293F0ed1b203"; // <-- Set this!

const ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "market", "type": "string" },
      { "internalType": "uint256", "name": "threshold", "type": "uint256" },
      { "internalType": "uint256", "name": "size", "type": "uint256" }
    ],
    "name": "registerStopLoss",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let provider, signer, contract;

async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask");
    return;
  }

  try {
    provider = new ethers.providers.Web3Provider(window.ethereum); // ✅ ethers v5
    await provider.send("eth_requestAccounts", []); // ✅ prompts MetaMask
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    const address = await signer.getAddress();
    document.getElementById("wallet-address").textContent = `Connected: ${address}`;
  } catch (err) {
    console.error("Wallet connection failed:", err);
    document.getElementById("status").textContent = "❌ Wallet connection failed.";
  }
}

async function registerStopLoss(market, threshold, size) {
  try {
    const parsedThreshold = ethers.utils.parseUnits(threshold.toString(), 0); // whole number
    const parsedSize = ethers.utils.parseUnits(size.toString(), 18); // supports decimals

    const tx = await contract.registerStopLoss(market, parsedThreshold, parsedSize);
    document.getElementById("status").textContent = "⏳ Waiting for confirmation...";
    await tx.wait();
    document.getElementById("status").textContent = "✅ Confirmed on-chain!";
    showModal();
    await loadOrders();
  } catch (err) {
    console.error(err);
    document.getElementById("status").textContent = `❌ Error: ${err.message}`;
  }
}

function showModal() {
  document.getElementById("success-modal").classList.remove("hidden");
  document.getElementById("success-modal").classList.add("flex");
}

function closeModal() {
  document.getElementById("success-modal").classList.remove("flex");
  document.getElementById("success-modal").classList.add("hidden");
}

// 📋 Load all stop-loss orders from backend
async function loadOrders() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/orders");
    const data = await res.json();

    const tbody = document.getElementById("orders-body");
    tbody.innerHTML = "";

    data.forEach((order) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="py-2 px-4">${order.market}</td>
        <td class="py-2 px-4">${order.threshold}</td>
        <td class="py-2 px-4">${order.size}</td>
        <td class="py-2 px-4">${order.triggered ? "✅" : "❌"}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error("Failed to load orders:", err);
  }
}

// 🔄 Handle form submission
document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const market = document.getElementById("market").value.trim();
  const threshold = document.getElementById("threshold").value;
  const size = document.getElementById("size").value;

  if (!market || isNaN(threshold) || isNaN(size)) {
    document.getElementById("status").textContent = "❗ Please enter valid inputs.";
    return;
  }

  if (!signer) {
    document.getElementById("status").textContent = "Connecting wallet...";
    await connectWallet();
  }

  document.getElementById("status").textContent = "Submitting order...";
  await registerStopLoss(market, threshold, size);
});

// Connect wallet on button click
document.getElementById("connect-wallet").addEventListener("click", connectWallet);

// Load orders on page load
window.addEventListener("DOMContentLoaded", loadOrders);
