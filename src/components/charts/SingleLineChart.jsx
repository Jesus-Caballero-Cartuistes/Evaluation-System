import {Line, LineChart, ReferenceArea, XAxis, YAxis} from "recharts"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card"
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "../ui/chart"


const colorRanges = [
    {yMin: 0, yMax: 1, color: "rgba(255, 0, 0, 0.5)"},   // Rojo (Riesgo bajo)
    {yMin: 1, yMax: 2, color: "rgba(255, 165, 0, 0.7)"},   // Naranja (Riesgo moderado bajo)
    {yMin: 2, yMax: 3, color: "rgba(255, 165, 0, 0.5)"},   // Amarillo (Riesgo moderado)
    {yMin: 3, yMax: 4, color: "rgba(230, 255, 0, 0.5)"},   // Amarillo (Riesgo moderado)
    {yMin: 4, yMax: 5, color: "rgba(0, 255, 0, 0.5)"},     // Verde (Riesgo bajo)
    {yMin: 5, yMax: 6, color: "rgba(0, 255, 255, 0.5)"},   // Cian (Bajo riesgo)
    {yMin: 6, yMax: 7, color: "rgba(0, 255, 0, 0.5)"},     // Verde (Bajo riesgo)
    {yMin: 7, yMax: 8, color: "rgba(0, 0, 255, 0.5)"},     // Azul (Riesgo medio bajo)
    {yMin: 8, yMax: 9, color: "rgba(75, 0, 130, 0.5)"},    // Indigo (Riesgo medio)
    {yMin: 9, yMax: 10, color: "rgba(255, 0, 255, 0.5)"},  // Morado (Riesgo alto)
    {yMin: 10, yMax: 11, color: "rgba(255, 0, 0, 0.7)"},  // Rojo oscuro (Muy alto riesgo)
    {yMin: 11, yMax: 12, color: "rgba(139, 0, 0, 0.8)"},  // Rojo oscuro (Peligro extremo)
];


export default function SingleLineChart({tittle, description, result, label, type}) {

    const data = Object.keys(result.Analysis).map((frameKey, index) => {
        const frame = result.Analysis[frameKey];
        if (type === "reba") {
            return {
                Frame: `${index + 1}`,
                risk: frame.Reba.risk.value,
                group_a: frame.Reba.group_a.value,
                back: frame.Reba.group_a.insights.back.value,
                legs: frame.Reba.group_a.insights.legs.value,
                neck: frame.Reba.group_a.insights.neck.value,
                group_b: frame.Reba.group_b.value,
                wrist: frame.Reba.group_b.insights.wrist.value,
                arms: frame.Reba.group_b.insights.arms.value,
                forearm: frame.Reba.group_b.insights.forearm.value,
            };
        } else if (type === "owas") {
            return {
                Frame: `${index + 1}`,
                legs: frame.Owas.legs.value,
                arms: frame.Owas.arms.value,
                back: frame.Owas.back.value,
                load: frame.Owas.load.value,
                risk: frame.Owas.risk.value,
            };
        }

        // [
        //     { Frame: "1", legs: 2, arms: 1, back: 4, load: 2 },
        //     { Frame: "2", legs: 2, arms: 1, back: 4, load: 2 },
        //     { Frame: "3", legs: 2, arms: 1, back: 4, load: 2 }
        // ]
    });


    return (
        <Card className="my-5 shadow-none w-full">
            <CardHeader className="ps-5">
                {tittle && <CardTitle>{tittle}</CardTitle>}
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent className="p-0 pe-5">
                <ChartContainer
                    config={{
                        risk: {
                            label: "risk",
                            color: "hsl(var(--chart-1))",
                        },
                    }}
                    className="h-[200px] w-full"
                >
                    <LineChart data={data} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                        <XAxis dataKey="Frame"/>

                        {type === "owas" && (
                            <YAxis
                                domain={[0, 8]}
                                ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
                                label={<text style={{
                                    fontWeight: 'bold',
                                    transform: 'rotate(-90deg)',
                                    textAnchor: 'middle'
                                }}>Valor</text>}
                            />
                        )}
                        {type === "reba" && (
                            <YAxis
                                domain={[0, 12]}
                                ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                                label={<text style={{
                                    fontWeight: 'bold',
                                    transform: 'rotate(-90deg)',
                                    textAnchor: 'middle'
                                }}>Valor</text>}
                            />
                        )}

                        {colorRanges.map((range, index) => (
                            <ReferenceArea
                                key={index}
                                y1={range.yMin}
                                y2={range.yMax}
                                fill={range.color}
                            />
                        ))}
                        <Line
                            type="linear"
                            dataKey={label}
                            stroke="blue"
                            strokeWidth={2}
                            dot={false}
                        />

                        <ChartTooltip content={<ChartTooltipContent indicator="dot" hideLabel/>}/>
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

