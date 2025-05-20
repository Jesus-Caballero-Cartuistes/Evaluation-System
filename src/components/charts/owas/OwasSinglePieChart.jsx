import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../../ui/card"
import {Pie, PieChart} from "recharts"
import {ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent} from "../../ui/chart"

import {
    RelativeArmsRiskOwasTable,
    RelativeBackRiskOwasTable,
    RelativeLegsRiskOwasTable
} from "../../../tables/owasTables";

export default function OwasSinglePieChart({result, label, tittle}) {

    const count = {};
    const keys = Object.keys(result.Analysis);
    const total = keys.length;
    // Count the occurrences
    keys.forEach((frameKey) => {
        const frame = result.Analysis[frameKey].Owas;
        count[frame[`${label}`].value] = count[frame[`${label}`].value] + 1 || 1;
    });

    // Transform the count object into an array of objects
    const chartData = Object.entries(count).map(([label, value]) => ({label, value, fill: `var(--color-${label})`}));

    function calculateRelativeRisk(label, chartData, total) {
        let criticalRisk = {};
        if (label === 'legs'){
            chartData.forEach((item, index) => {
                criticalRisk[`[${index + 1}] ${(Math.ceil((item.value*100/total) / 10) * 10) - 10}% - ${Math.ceil((item.value*100/total) / 10) * 10}%`] = RelativeLegsRiskOwasTable[item.label][Math.ceil((item.value*100/total) / 10) * 10];
            });
        }
        else if (label === 'arms'){
            chartData.forEach((item, index) => {
                criticalRisk[`[${index + 1}] ${(Math.ceil((item.value*100/total) / 10) * 10) - 10}% - ${Math.ceil((item.value*100/total) / 10) * 10}%`] = RelativeArmsRiskOwasTable[item.label][Math.ceil((item.value*100/total) / 10) * 10];
            });
        }
        else if (label === 'back'){
            chartData.forEach((item, index) => {
                criticalRisk[`[${index + 1}] ${(Math.ceil((item.value*100/total) / 10) * 10) - 10}% - ${Math.ceil((item.value*100/total) / 10) * 10}%`] = RelativeBackRiskOwasTable[item.label][Math.ceil((item.value*100/total) / 10) * 10];
            });
        }
        return criticalRisk;
    }

    const relativeRisk = calculateRelativeRisk(label, chartData, total);

    const chartConfig = {
        1: {
            label: "1",
            color: "hsl(var(--chart-1))",
        },
        2: {
            label: "2",
            color: "hsl(var(--chart-2))",
        },
        3: {
            label: "3",
            color: "hsl(var(--chart-3))",
        },
        4: {
            label: "4",
            color: "hsl(var(--chart-4))",
        },
        5: {
            label: "5",
            color: "hsl(var(--chart-5))",
        },
    }

    return (
        <>
            <Card className="flex flex-col my-5 shadow-none">
                <CardHeader className="items-center p-1">
                    <CardTitle>{tittle}</CardTitle>
                    <CardDescription>Niveles de riesgo</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px] h-full px-0"
                    >
                        <PieChart>
                            <ChartTooltip
                                content={<ChartTooltipContent nameKey="label" hideLabel/>}
                            />
                            <Pie
                                data={chartData}
                                dataKey="value"
                                labelLine={false}
                                nameKey="label"
                            />
                            <ChartLegend
                                content={<ChartLegendContent nameKey="label" />}
                                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                            />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col  gap-2 text-sm ">
                    <div className="border rounded border-gray-200 px-3 py-2">
                        <h1 className="font-bold mb-2">Riesgo según Frecuencia Relativa:</h1>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div className="font-semibold">Frecuencia</div>
                            <div className="font-semibold">Riesgo</div>

                            {Object.entries(relativeRisk).map(([key, value]) => (
                                <>
                                    <div key={`freq-${key}`}>{key}</div>
                                    <div key={`risk-${key}`}>{value}</div>
                                </>
                            ))}
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}