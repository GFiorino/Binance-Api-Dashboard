const priceChart = new Chart(elements.chartCanvas, {
  type: "line",
  data: {
    labels: [], // Timestamps
    datasets: [
      {
        label: "Crypto 1",
        data: [],
        borderColor: "rgba(243, 186, 47, 1)", // Binance Yellow
        backgroundColor: "rgba(243, 186, 47, 0.2)",
        borderWidth: 2,
        tension: 0.4, // Smooth curve
      },
      {
        label: "Crypto 2",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)", // Cyan
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Crypto 3",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)", // Red
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true, // Ensures responsiveness
    maintainAspectRatio: false, // Allows the chart to scale freely
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (USD)",
        },
      },
    },
  },
});
