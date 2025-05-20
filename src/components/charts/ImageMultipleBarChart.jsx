import {Bar, BarChart, CartesianGrid, LabelList, XAxis} from "recharts"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card"
import {ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent} from "../ui/chart"

export default function ImageMultipleBarChart({ result, description, type, group }) {

    const insightsOwas = ['legs', 'arms', 'back', 'load', 'risk'];
    const insightsRebaGroupA = ["back", "neck", "legs"]
    const insightsRebaGroupB = ["wrist", "arms", "forearm" ]

    const appendResult = (result, insight) => {
        const data = {};
        data['insight'] = insight;
        if (type === 'owas') {
            Object.keys(result).forEach((image, index) => {
                data[`Imagen-${index + 1}`] = result[image].Analysis.Owas[insight].value;
            });
            return data;
        }
        if (type === 'reba') {
            if (group === 'group_a') {
                Object.keys(result).forEach((image, index) => {
                    data[`Imagen-${index + 1}`] = result[image].Analysis.Reba.group_a.insights[insight].value;
                });
                return data;
            }
            if (group === 'group_b') {
                Object.keys(result).forEach((image, index) => {
                    data[`Imagen-${index + 1}`] = result[image].Analysis.Reba.group_b.insights[insight].value;
                });
                return data;
            }
        }
    };


    const appendConfig = (result) => {
        const config = {};
        Object.keys(result).forEach((image, index) => {
            // Usamos el operador módulo (%) para reiniciar el índice de color a partir de 1 después de 5
            const chartIndex = (index % 5) + 1;
            config[`Imagen-${index + 1}`] = {
                label: `Imagen-${index + 1}`,
                color: `hsl(var(--chart-${chartIndex}))`,  // Usamos el índice limitado de 1 a 5
            };
        });

        return config;
    };


    const appendData = (type, group) => {
        if (type === 'owas') {
            return insightsOwas.map((insight) => appendResult(result, insight));
        }
        if (type === 'reba') {
            if (group === 'group_a') {
                return insightsRebaGroupA.map((insight) => appendResult(result, insight));
            }
            if (group === 'group_b') {
                return insightsRebaGroupB.map((insight) => appendResult(result, insight));
            }
        }
    }

    const chartData = appendData(type, group)
    const chartConfig = appendConfig(result);
    console.log(chartData);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Bar Chart - Multiple</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="insight"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        {Object.keys(result).map((image, index) => (
                            <Bar
                                key={index}
                                dataKey={`Imagen-${index + 1}`}
                                fill={`var(--color-Imagen-${index + 1})`}
                            >
                                <LabelList dataKey={`Imagen-${index + 1}`}
                                           position="insideTop"
                                           offset={8}
                                           className="fill-foreground"
                                           fontSize={12}
                                />
                            </Bar>
                        ))}
                    </BarChart>
                </ChartContainer>
            </CardContent>
            {/*<CardFooter className="flex-col items-start gap-2 text-sm">*/}
            {/*    <div className="flex gap-2 font-medium leading-none">*/}
            {/*        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />*/}
            {/*    </div>*/}
            {/*    <div className="leading-none text-muted-foreground">*/}
            {/*        Showing total visitors for the last 6 months*/}
            {/*    </div>*/}
            {/*</CardFooter>*/}
        </Card>
    )
}
