import {
    Chart,
    LineElement,
    ChartData,
    LinearScale,
    ScatterController,
    PointElement,
    ChartOptions,
    Tooltip,
    Legend,
    Title,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { DataSet } from "./App";

Chart.register(
    LinearScale,
    ScatterController,
    PointElement,
    LineElement,
    Legend,
    Title,
    Tooltip
);

const palette = ["#9FC088", "#E8C07D", "#CC704B", "#614124"];

export const TheChart = ({ dataset, filter }: { dataset: DataSet, filter: string}) => {
    const data: ChartData<"scatter"> = {
        datasets: [
            {
                label: "Alle utøvere",
                backgroundColor: palette[0],
                borderColor: palette[0],
                pointRadius: 4,
                pointHitRadius: 15,
                data: dataset.data.map((entry) => ({
                    y: entry.ClassAgeFrom,
                    x: entry.NetTime / 60_000,
                    name: entry.NameFormatted,
                })),
            },
            {
                backgroundColor: palette[1],
                borderColor: palette[1],
                pointRadius: 10,
                pointHitRadius: 15,
                label: filter,
                data: dataset.data
                    .filter((entry) => entry.NameFormatted.includes(filter))
                    .map((entry) => ({
                        y: entry.ClassAgeFrom,
                        x: entry.NetTime / 60_000,
                        name: entry.NameFormatted,
                    })),
            },
        ],
    };

    const options: ChartOptions<"scatter"> = {
        scales: {
            y: {
                suggestedMax: 80,
                suggestedMin: 0,
                ticks: { callback: value => `Fra ${value} år` },
            },
            x: {
                ticks: {
                    callback: value => `${value} min`
                }
            }
        },
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (ctx) {
                        // @ts-expect-error
                        return `${ctx.raw.name} ${
                            Math.floor(ctx.parsed.x * 100) / 100
                        }`;
                    },
                },
            },
        },
    };

    return <Scatter data={data} options={options} />;
};
