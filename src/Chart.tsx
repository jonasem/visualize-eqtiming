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
import { DataSet, Gender } from "./App";

Chart.register(
    LinearScale,
    ScatterController,
    PointElement,
    LineElement,
    Legend,
    Title,
    Tooltip
);

const palette = ["#9FC088", "#5F9048", "#CC704B", "#614124"];

export const TheChart = ({ dataset, filter, gender }: 
    { dataset: DataSet, filter: string, gender: Gender }
) => {
    const data = makeDataset(filter, gender, dataset);
    const options = makeOptions();

    return <Scatter data={data} options={options} />;
};

function makeOptions(): ChartOptions<"scatter"> {
    return {
        scales: {
            y: {
                suggestedMax: 80,
                suggestedMin: 0,
                ticks: { callback: value => `Fra ${value} år` },
            },
            x: {
                suggestedMin: 0,
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
                        return `${ctx.raw.name} ${Math.floor(ctx.parsed.x * 100) / 100}`;
                    },
                },
            },
        },
    };
}

function makeDataset(filter: string, gender: Gender, dataset: DataSet): ChartData<"scatter"> {
    let data = dataset.data.filter(entry => entry.NetTime > 0);
    data = data.filter(entry => entry.Gender == gender || gender == 'B');

    
    const sumByAge = data.reduce((memo, entry) => {
        const ageSlot = memo[entry.ClassAgeFrom] ?? [];
        ageSlot.push(entry.NetTime / 60_000);
        memo[entry.ClassAgeFrom] = ageSlot;
        return memo;
    } , [] as { [key: number]: number[]});
    const average = (numbers: number[]) => numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const averages = Object.entries(sumByAge).map(([age, sum]) => ({ y: Number(age), x: average(sum), name: 'Gjennomsnitt' }))
    
    return {
        datasets: [
            {
                backgroundColor: palette[1],
                borderColor: palette[1],
                pointRadius: 9,
                pointHoverRadius: 15,
                pointHitRadius: 15,
                label: filter,
                data: dataset.data
                    .filter((entry) => entry.NameFormatted.includes(filter))
                    .map((entry) => ({
                        y: entry.ClassAgeFrom,
                        x: entry.NetTime / 60000,
                        name: entry.NameFormatted,
                    })),
            },
            {
                label: "Gjennomsnitt",
                backgroundColor: palette[2],
                pointRadius: 6,
                pointHitRadius: 10,
                data: averages,
            },
            {
                label: "Alle utøvere",
                backgroundColor: palette[0] + "66",
                pointRadius: 6,
                pointHitRadius: 15,
                data: data.map((entry) => ({
                    y: entry.ClassAgeFrom,
                    x: entry.NetTime / 60000,
                    name: entry.NameFormatted,
                })),
            },
            
        ],
    };
}

