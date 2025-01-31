// Base URL for Binance API
const BINANCE_API_URL = "https://api.binance.com/api/v3/ticker/price";

// DOM Elements
const cryptoDropdown = document.getElementById("crypto-dropdown");
const priceDisplay = document.getElementById("price-display");

// Fetch Real-Time Price
async function fetchPrice(symbol) {
  try {
    const response = await fetch(`${BINANCE_API_URL}?symbol=${symbol}`);
    if (!response.ok) throw new Error("Failed to fetch price data");
    const data = await response.json();
    return parseFloat(data.price).toFixed(2); // Format price to 2 decimal places
  } catch (error) {
    console.error("Error fetching price:", error);
    return "Error fetching price";
  }
}

// Update Price Display
async function updatePrice() {
  const selectedSymbol = cryptoDropdown.value; // Get selected cryptocurrency
  priceDisplay.textContent = "Loading..."; // Show loading state
  const price = await fetchPrice(selectedSymbol);
  if (price !== "Error fetching price") {
    priceDisplay.textContent = `Current Price: $${price}`;
  } else {
    priceDisplay.textContent = price;
  }
}

// Event Listener for Dropdown
cryptoDropdown.addEventListener("change", updatePrice);

// Initial Load
window.addEventListener("DOMContentLoaded", () => {
  updatePrice(); // Fetch price for the default selection on page load
});
