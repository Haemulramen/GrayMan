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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Statistics({ origin_count, positive_count }) {
  const [data, setData] = useState({ positiveCount: 0, totalCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const totalCount = origin_count;
    const positiveCount = positive_count;
    setData({ positiveCount, totalCount });
    setLoading(false);
  }, [origin_count, positive_count]);

  if (loading) return <p>Loading...</p>;

  const chartData = {
    labels: ["핵심문장", "전체문장"],
    datasets: [
      {
        label: "Sentence Count",
        data: [data.positiveCount, data.totalCount],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 border-b-2 mb-4">
      <h1 className="font-semibold text-xl">객관화 정도</h1>
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
