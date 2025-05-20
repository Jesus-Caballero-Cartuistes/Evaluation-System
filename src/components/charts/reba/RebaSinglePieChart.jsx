import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../ui/card"
import {Pie, PieChart} from "recharts"
import {ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent} from "../../ui/chart"

export default function RebaSinglePieChart({result, group, label, tittle}) {

    const count = {};
    const keys = Object.keys(result.Analysis);
    const total = keys.length;
    // Count the occurrences
    keys.forEach((frameKey) => {
        const frame = result.Analysis[frameKey].Reba[group];
        count[frame.insights[`${label}`].value] = count[frame.insights[`${label}`].value] + 1 || 1;
    });

    // Transform the count object into an array of objects
    const chartData = Object.entries(count).map(([label, value]) => ({label, value, fill: `var(--color-${label})`}));


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
            <Card className="flex flex-col my-5">
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
            </Card>
        </>
    )
}