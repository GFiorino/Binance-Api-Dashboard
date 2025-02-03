# Binance API Dashboard

## Overview
The **Binance API Dashboard** is a web-based application designed to track and compare the live price trends of **Bitcoin (BTC)**, **Ethereum (ETH)**, and **Binance Coin (BNB)**. This dashboard allows users to analyze historical trends across multiple timeframes and simulate cryptocurrency purchases.

## Features
### ✅ **Live Cryptocurrency Trends**
- Real-time price updates from the **Binance API**.
- Comparison of **Bitcoin, Ethereum, and Binance Coin** in one interactive chart.
- Historical trends displayed over different timeframes (24 hours, 1 week, 1 month, 3 months, 1 year).

### ✅ **Simulated Trade**
- Users can input an investment amount to simulate how much of each cryptocurrency they could purchase at current market rates.
- Results display the number of coins that could be bought based on the latest Binance prices.

### ✅ **User-Friendly Interface**
- Clean and modern UI for seamless interaction.
- Simple dropdown selection for timeframe adjustments.
- Interactive chart powered by **Chart.js**.

## Technology Stack
- **Frontend:** HTML, CSS, JavaScript
- **Charting Library:** Chart.js
- **API Data Source:** Binance API
- **Styling:** Custom CSS with responsive design

## Setup and Installation
### Prerequisites
- Web browser (Chrome, Firefox, Edge, or Safari)
- Internet connection

### Steps to Run the Project Locally
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/cryptocurrency-dashboard.git
   ```
2. Navigate to the project folder:
   ```bash
   cd cryptocurrency-dashboard
   ```
3. Open the `index.html` file in a web browser.
4. The dashboard will load automatically and start displaying live cryptocurrency trends.

## How It Works
### 📊 **Real-Time Price Updates**
- The dashboard fetches the latest cryptocurrency prices from **Binance API**.
- The chart updates dynamically when a new timeframe is selected.

### 📈 **Historical Data Fetching**
- The user selects a timeframe (**Last 24h, 1 Week, 1 Month, etc.**).
- The application sends a request to the Binance API to retrieve historical price data.
- The data is plotted on a line chart for easy comparison.

### 💰 **Simulated Trade Calculation**
- Users enter an investment amount (e.g., $1000).
- The system fetches live prices for BTC, ETH, and BNB.
- It calculates how much of each cryptocurrency can be purchased based on the entered amount.

## Future Enhancements
🚀 **Potential Features for Future Updates:**
- User authentication for saving custom watchlists.
- Additional cryptocurrencies beyond BTC, ETH, and BNB.
- Exporting trend data as CSV for analysis.
- Interactive tooltips with more detailed historical price data.

---
### 🔗 **Live Demo** (If Hosted)
[Live Version of the Dashboard](#)

### 📩 **Contact**
For any questions or feature requests, feel free to reach out!

---
⚡ **Built for cryptocurrency enthusiasts and traders looking for quick insights!**

