"use client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function DashboardChart({ vendas }: { vendas: number[] }) {
  const data = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Vendas Mensais",
        data: vendas,
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.2)",
      },
    ],
  };
  return <Line data={data} />;
}