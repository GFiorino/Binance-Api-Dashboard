// DOM Element for Chart
const chartCanvas = document.getElementById("chart").getContext("2d");

// Initialize Chart with Binance Yellow Theme
let priceChart = new Chart(chartCanvas, {
  type: "line",
  data: {
    labels: [], // Timestamps
    datasets: [
      {
        data: [], // Prices
        borderColor: "#F3BA2F", // Binance Yellow
        backgroundColor: "rgba(243, 186, 47, 0.1)", // Light yellow fill
        borderWidth: 2,
        tension: 0.4, // Smooth line
        pointRadius: 2, // Small dots for better visibility
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      title: {
        display: true,
        text: "Historical Price Chart", // Updated title
        color: "#F3BA2F", // Binance Yellow
        font: {
          size: 16,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
          color: "#F5F5F5",
          font: {
            size: 14,
          },
        },
        ticks: {
          color: "#F5F5F5", // Light text color
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Subtle grid lines
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (USD)",
          color: "#F5F5F5",
          font: {
            size: 14,
          },
        },
        ticks: {
          color: "#F5F5F5", // Light text color
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Subtle grid lines
        },
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 10,
        bottom: 10,
      },
    },
    animation: {
      duration: 1000, // Smooth animation
    },
  },
});
