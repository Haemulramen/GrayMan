"use client"; // 클라이언트 컴포넌트임을 명시

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

//TODO: 해당 함수 구현하기
// import { processSentences } from "../utils/dataProcessor";

// Chart.js에 필요한 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const sentences = [
  "This is a positive sentence.",
  "This is a negative sentence.",
  // 추가 문장들...
];

export default function Statistics() {
  const [data, setData] = useState({ positiveCount: 0, negativeCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const { positiveCount, negativeCount } = processSentences(sentences);
    const { positiveCount, negativeCount } = {
      positiveCount: 1,
      negativeCount: 1,
    };
    setData({ positiveCount, negativeCount });
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  const chartData = {
    labels: ["Positive", "Negative"],
    datasets: [
      {
        label: "Sentence Count",
        data: [data.positiveCount, data.negativeCount],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Statistics</h1>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Sentence Statistics" },
          },
        }}
      />
    </div>
  );
}
