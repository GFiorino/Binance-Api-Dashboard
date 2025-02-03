// Resize chart dynamically based on its container
const resizeChartCanvas = () => {
  const canvas = document.getElementById("chart");
  const parent = canvas.parentElement;
  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight;
};

// Call resize before initializing the chart
resizeChartCanvas();

// Chart Initialization
const priceChart = new Chart(elements.chartCanvas, {
  type: "line",
  data: {
    labels: [], // Timestamps
    datasets: [], // Dynamic datasets will be added
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
          color: "#F5F5F5",
        },
        ticks: {
          color: "#F5F5F5",
        },
      },
      y: {
        title: {
          display: true,
          text: "Normalized Price (%)",
          color: "#F5F5F5",
        },
        ticks: {
          color: "#F5F5F5",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#F5F5F5",
        },
      },
    },
  },
});

// Timeframe options for Binance API
const timeframes = {
  "Last 24h": { interval: "1h", limit: 24 },
  "Last Week": { interval: "1d", limit: 7 },
  "Last Month": { interval: "1d", limit: 30 },
  "Last 3 Months": { interval: "1d", limit: 90 },
  "Last Year": { interval: "1w", limit: 52 },
};

// Function to fetch historical data for a specific timeframe
const fetchHistoricalData = async (symbol, timeframe) => {
  const { interval, limit } = timeframes[timeframe];
  const url = `${BINANCE_KLINES_URL}?symbol=${symbol}&interval=${interval}&limit=${limit}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.map((candle) => ({
      time: new Date(candle[0]).toLocaleDateString([], { month: "short", day: "numeric" }),
      price: parseFloat(candle[4]),
    }));
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return [];
  }
};

// Function to update the chart
const updateChart = async (timeframe = "Last 24h") => {
  const historicalData = await Promise.all(
    cryptoSymbols.map((symbol) => fetchHistoricalData(symbol, timeframe))
  );

  if (historicalData.length > 0 && historicalData[0].length > 0) {
    priceChart.data.labels = historicalData[0].map((entry) => entry.time);

    priceChart.data.datasets = historicalData.map((data, index) => {
      const maxPrice = Math.max(...data.map((entry) => entry.price));
      return {
        label: `${cryptoLabels[index]} (Normalized)`,
        data: data.map((entry) => (entry.price / maxPrice) * 100),
        borderColor: `rgba(${(index + 1) * 80}, ${(index + 1) * 60}, 200, 1)`,
        backgroundColor: `rgba(${(index + 1) * 80}, ${(index + 1) * 60}, 200, 0.1)`,
        borderWidth: 2,
        fill: true,
      };
    });

    priceChart.update();
  } else {
    console.error("No data available for the selected timeframe.");
  }
};

// Event listener for timeframe dropdown
const timeframeDropdown = document.getElementById("timeframe-dropdown");
timeframeDropdown.addEventListener("change", (e) => {
  const selectedTimeframe = e.target.value;
  updateChart(selectedTimeframe);
});

// Automatically load the chart on page load with the default timeframe
window.addEventListener("DOMContentLoaded", () => {
  updateChart("Last 24h");
  resizeChartCanvas();
});
