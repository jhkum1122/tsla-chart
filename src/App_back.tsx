import React, { useEffect, useState } from "react";
import axios from "axios";
import TSLAChart from "./TSLAChart";

const App: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "TSLA Stock Price",
        data: [] as number[],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
      {
        label: "10-Day Moving Average",
        data: [] as number[],
        borderColor: "rgba(136,75,192,1)",
        backgroundColor: "rgba(136,75,192,0.2)",
      },
      {
        label: "20-Day Moving Average",
        data: [] as number[],
        borderColor: "rgba(192,75,192,1)",
        backgroundColor: "rgba(192,75,192,0.2)",
      },
      {
        label: "60-Day Moving Average",
        data: [] as number[],
        borderColor: "rgba(75,75,192,1)",
        backgroundColor: "rgba(75,75,192,0.2)",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_KEY = "Y1VTD1613XWP7VJH"; // 여기에 실제 Alpha Vantage API 키를 입력하세요.
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&apikey=${API_KEY}`
        );
        const data = response.data["Time Series (Daily)"];

        // 데이터를 변환하여 차트에 사용할 형식으로 만듭니다.
        const labels = Object.keys(data).slice(0, 180).reverse();
        const prices = labels.map((date) => parseFloat(data[date]["4. close"]));

        // 10일선 계산
        const movingAverage10 = calculateMovingAverage(prices, 10);
        // 20일선 계산
        const movingAverage20 = calculateMovingAverage(prices, 20);
        // 60일 이동평균선 계산
        const movingAverage60 = calculateMovingAverage(prices, 60);

        setChartData({
          labels,
          datasets: [
            {
              label: "TSLA Stock Price",
              data: prices,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
            },
            {
              label: "10-Day Moving Average",
              data: movingAverage10,
              borderColor: "rgba(136,75,192,1)",
              backgroundColor: "rgba(136,75,192,0.2)",
            },
            {
              label: "20-Day Moving Average",
              data: movingAverage20,
              borderColor: "rgba(192,75,192,1)",
              backgroundColor: "rgba(192,75,192,0.2)",
            },
            {
              label: "60-Day Moving Average",
              data: movingAverage60,
              borderColor: "rgba(75,75,192,1)",
              backgroundColor: "rgba(75,75,192,0.2)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // 이동평균선 계산 함수
  const calculateMovingAverage = (prices: number[], days: number): number[] => {
    const movingAverage: number[] = [];
    for (let i = days - 1; i < prices.length; i++) {
      let sum = 0;
      for (let j = i; j > i - days; j--) {
        sum += prices[j];
      }
      movingAverage.push(sum / days);
    }
    return movingAverage;
  };

  return (
    <div className="App">
      <h1>TSLA Chart</h1>
      <TSLAChart data={chartData} />
    </div>
  );
};

export default App;
