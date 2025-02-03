// Resize chart dynamically based on its container
const resizeChartCanvas = () => {
  const canvas = document.getElementById('chart');
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
          color: "#F5F5F5", // Consistent with theme
        },
        ticks: {
          color: "#F5F5F5", // Consistent with theme
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (USD)",
          color: "#F5F5F5", // Consistent with theme
        },
        ticks: {
          color: "#F5F5F5", // Consistent with theme
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

// Resize chart dynamically when the window is resized
window.addEventListener("resize", resizeChartCanvas);
