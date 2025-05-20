import {Card, CardContent, CardHeader, CardTitle} from "../ui/card"
import {PolarAngleAxis, PolarGrid, Radar, RadarChart} from "recharts"
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "../ui/chart"

export default function SingleRadarChart({frameResult, tittle}) {

    const chartData = Object.keys(frameResult).map((label) => {
        return {
            label: label.split('_')[0], value: frameResult[label].value
        };
        // [
        //     { label: "legs",  value: 2 },
        //     { label: "arms",  value: 2 },
        //     { label: "back",  value: 2 },
        //     { label: "load",  value: 2 },
        //     { label: "risk",  value: 2 }
        // ]
    });

    return (
        <>
            <Card className={'h-full shadow-none'}>
                { tittle &&
                <CardHeader className="items-center pb-0">
                     <CardTitle>{tittle}</CardTitle>
                </CardHeader>
                }
                <CardContent className="p-0 pt-5 ">
                    <ChartContainer
                        config={{
                            value: {
                                label: "value",
                                color: "hsl(var(--chart-1))",
                            },
                            // mobile: {
                            //     label: "Mobile",
                            //     color: "hsl(var(--chart-2))",
                            // },
                        }}
                        className="mx-auto aspect-square max-h-[220px] h-full px-0"
                    >
                        <RadarChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 10,
                                bottom: 10,
                                left: 10,
                            }}
                        >
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <PolarAngleAxis
                                dataKey="label"
                                tick={({ x, y, textAnchor, value, index, ...props }) => {
                                    const data = chartData[index]
                                    return (
                                        <text
                                            x={x}
                                            y={index === 0 ? y - 10 : y}
                                            textAnchor={textAnchor}
                                            fontSize={13}
                                            fontWeight={500}
                                            {...props}
                                        >
                                            <tspan>{data.value}</tspan>

                                            <tspan
                                                x={x}
                                                dy={"1rem"}
                                                fontSize={12}
                                                className="fill-muted-foreground"
                                            >
                                                {data.label}
                                            </tspan>
                                        </text>
                                    )
                                }}
                            />

                            />
                            <PolarGrid />
                            <Radar
                                dataKey="value"
                                fill="var(--color-value)"
                                fillOpacity={0.6}
                            />
                            {/*<Radar dataKey="mobile" fill="var(--color-mobile)" />*/}
                        </RadarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </>
    )
}