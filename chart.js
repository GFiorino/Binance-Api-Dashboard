const priceChart = new Chart(elements.chartCanvas, {
  type: "line",
  data: {
    labels: [],
    datasets: [],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, // Ensure it adapts to the container
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10, // Add padding to avoid content overflowing
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
          text: "Price (USD)",
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
          color: "#F5F5F5", // Ensure the legend matches the theme
        },
      },
    },
  },
});
