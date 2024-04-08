import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const FinancialChart = ({ data }) => {
  // Preparing the data for Chart.js
  const chartData = {
    labels: data.map((item) => item.date), // Extracting dates for labels
    datasets: [
      {
        label: "Net Income",
        data: data.map((item) => item.netIncome),
        borderColor: "#4F46E5", // Example color
        backgroundColor: "rgba(79, 70, 229, 0.2)", // Example color with transparency
      },
      {
        label: "Total Revenue",
        data: data.map((item) => item.totalRevenue),
        borderColor: "#10B981", // Example color
        backgroundColor: "rgba(16, 185, 129, 0.2)", // Example color with transparency
      },
      {
        label: "Shareholder Equity",
        data: data.map((item) => item.shareholderEquity),
        borderColor: "#F59E0B", // Example color
        backgroundColor: "rgba(245, 158, 11, 0.2)", // Example color with transparency
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to resize based on its container
    scales: {
      y: {
        // Defining the y-axis
        beginAtZero: true, // Ensures that the y-axis starts at 0
      },
    },
    plugins: {
      legend: {
        display: true, // Display legend (the label box)
      },
    },
  };

  return (
    <div style={{ width: "700px", height: "500px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default FinancialChart;
