import React from "react";
import { Line } from "react-chartjs-2";

const LogChart = () => {
  const data = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "Log Chart Example",
        data: [10, 50, 100, 500, 1000],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        yAxisID: "y-axis-1",
        type: "line",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
      },
      y: {
        type: "logarithmic",
        position: "left",
        min: 1,
        max: 10000,
        ticks: {
          // callback: function (value, index, values) {
          //   return Number(value.toString());
          // },
        },
        scaleLabel: {
          display: true,
          labelString: "Value (Log Scale)",
        },
      },
    },
  };

  // return <Line data={data} options={options} />;
};

export default LogChart;
