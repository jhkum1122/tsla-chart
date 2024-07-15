/*
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TSLAChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
}

const TSLAChart: React.FC<TSLAChartProps> = ({ data }) => {
  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default TSLAChart;
*/

import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TSLAChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
}

const TSLAChart: React.FC<TSLAChartProps> = ({ data }) => {
  const chartRef = useRef<any>(null);

  // 클릭 이벤트 핸들러
  const handleClick = (event: any) => {
    const chart = chartRef.current.chartInstance;
    const activePoints = chart.getElementsAtEvent(event);

    if (activePoints.length > 0) {
      const clickedDatasetIndex = activePoints[0].datasetIndex;
      const clickedElementIndex = activePoints[0].index;

      if (
        clickedDatasetIndex >= 0 &&
        clickedElementIndex >= 0 &&
        data.datasets[clickedDatasetIndex] &&
        data.datasets[clickedDatasetIndex].data[clickedElementIndex]
      ) {
        const clickedData =
          data.datasets[clickedDatasetIndex].data[clickedElementIndex];
        console.log("Clicked Data:", clickedData);
        // 또는 원하는 다른 처리를 수행할 수 있습니다.
        // 예를 들어, 특정 DOM 요소에 클릭한 데이터를 출력하는 등의 작업을 수행할 수 있습니다.
      }
    }
  };

  return (
    <div>
      <Line
        ref={chartRef}
        data={data}
        options={{
          plugins: {
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          onClick: handleClick, // 클릭 이벤트 추가
        }}
      />
    </div>
  );
};

export default TSLAChart;
