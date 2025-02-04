<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Documentation - Binance API Dashboard</title>
  <link rel="stylesheet" href="documentation.css">
</head>
<body>
  <!-- Navigation -->
  <nav style="background-color: #2A2A2A; padding: 1rem; text-align: center;">
    <a href="index.html" style="margin-right: 1rem; color: #F5F5F5; text-decoration: none;">Dashboard</a>
    <a href="documentation.html" class="active" style="color: #F3BA2F; text-decoration: none;">Documentation</a>
  </nav>

  <div class="container" style="padding: 2rem; font-family: Arial, sans-serif; color: #F5F5F5;">
    <h1>Documentation - Binance API Dashboard</h1>

    <!-- Introduction -->
    <section id="introduction" style="margin-bottom: 2rem;">
      <h2>Introduction</h2>
      <p>The <strong>Binance API Dashboard</strong> is a web application designed to provide real-time insights into cryptocurrency trends. It allows users to visualize live and historical price data, simulate cryptocurrency trades, and gain valuable market insights.</p>
    </section>

    <!-- Features -->
    <section id="features" style="margin-bottom: 2rem;">
      <h2>Features</h2>
      <ul>
        <li>Real-time price tracking for Bitcoin (BTC), Ethereum (ETH), and Binance Coin (BNB).</li>
        <li>Interactive chart for historical price analysis over multiple timeframes.</li>
        <li>Simulated trading functionality based on live market prices.</li>
      </ul>
    </section>

    <!-- Technology Stack -->
    <section id="technology-stack" style="margin-bottom: 2rem;">
      <h2>Technology Stack</h2>
      <p>This project is built using the following technologies:</p>
      <ul>
        <li><strong>Frontend:</strong> HTML, CSS, JavaScript</li>
        <li><strong>Charting Library:</strong> Chart.js</li>
        <li><strong>API:</strong> Binance API</li>
      </ul>
    </section>

    <!-- Setup -->
    <section id="setup" style="margin-bottom: 2rem;">
      <h2>Setup</h2>
      <p>To set up the project locally:</p>
      <ol>
        <li>Clone the repository:</li>
        <pre><code>git clone https://github.com/yourusername/Binance-Api-Dashboard.git</code></pre>
        <li>Open the <code>index.html</code> file in a web browser.</li>
      </ol>
    </section>

    <!-- How It Works -->
    <section id="how-it-works" style="margin-bottom: 2rem;">
      <h2>How It Works</h2>
      <p>The application interacts with the Binance API to fetch live and historical data. It uses Chart.js to display the data in an interactive format, and JavaScript handles the logic for simulated trades.</p>
      <p style="margin-top: 1rem; color: #F3BA2F;">[Insert Diagram: Data Flow from Binance API to Chart]</p>
    </section>

    <!-- API Reference -->
    <section id="api-reference" style="margin-bottom: 2rem;">
      <h2>API Reference</h2>
      <p>The project utilizes the following Binance API endpoints:</p>
      <ul>
        <li><strong>Real-Time Prices:</strong> <code>https://api.binance.com/api/v3/ticker/price</code></li>
        <li><strong>Historical Data:</strong> <code>https://api.binance.com/api/v3/klines</code></li>
      </ul>
      <p style="margin-top: 1rem; color: #F3BA2F;">[Insert Table: API Endpoint Parameters]</p>
    </section>

    <!-- Future Enhancements -->
    <section id="future-enhancements" style="margin-bottom: 2rem;">
      <h2>Future Enhancements</h2>
      <ul>
        <li>Add user authentication for saving custom watchlists.</li>
        <li>Include additional cryptocurrencies.</li>
        <li>Enable data export to CSV format.</li>
      </ul>
    </section>

    <!-- Screenshots -->
    <section id="screenshots" style="margin-bottom: 2rem;">
      <h2>Screenshots</h2>
      <p style="margin-top: 1rem; color: #F3BA2F;">[Insert Screenshot: Dashboard Overview]</p>
    </section>
  </div>
</body>
</html>
