import {Line, LineChart, ReferenceArea, XAxis, YAxis} from "recharts"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card"
import {ChartContainer} from "../ui/chart"
import {useState} from "react";


// [
//     { Frame: "1", timestamp: 0, legs: 2, arms: 1, back: 4, load: 2 },
//     { Frame: "2", timestamp: 0.04, legs: 2, arms: 1, back: 4, load: 2 },
//     { Frame: "3", timestamp: 0.08, legs: 2, arms: 1, back: 4, load: 2 }
// ]

export default function ImageCarouselLineChart({ result, setCurrentImageName, type, group, tittle }) {

    const colorRanges = [
        { yMin: 0, yMax: 1, color: "rgba(255, 0, 0, 0.5)" },   // Rojo (Riesgo bajo)
        { yMin: 1, yMax: 2, color: "rgba(255, 165, 0, 0.7)" },   // Naranja (Riesgo moderado bajo)
        { yMin: 2, yMax: 3, color: "rgba(255, 165, 0, 0.5)" },   // Amarillo (Riesgo moderado)
        { yMin: 3, yMax: 4, color: "rgba(230, 255, 0, 0.5)" },   // Amarillo (Riesgo moderado)
        { yMin: 4, yMax: 5, color: "rgba(0, 255, 0, 0.5)" },     // Verde (Riesgo bajo)
        { yMin: 5, yMax: 6, color: "rgba(0, 255, 255, 0.5)" },   // Cian (Bajo riesgo)
        { yMin: 6, yMax: 7, color: "rgba(0, 255, 0, 0.5)" },     // Verde (Bajo riesgo)
        { yMin: 7, yMax: 8, color: "rgba(0, 0, 255, 0.5)" },     // Azul (Riesgo medio bajo)
        { yMin: 8, yMax: 9, color: "rgba(75, 0, 130, 0.5)" },    // Indigo (Riesgo medio)
        { yMin: 9, yMax: 10, color: "rgba(255, 0, 255, 0.5)" },  // Morado (Riesgo alto)
        { yMin: 10, yMax: 11, color: "rgba(255, 0, 0, 0.7)" },  // Rojo oscuro (Muy alto riesgo)
        { yMin: 11, yMax: 12, color: "rgba(139, 0, 0, 0.8)" },  // Rojo oscuro (Peligro extremo)
    ];

    const [activeChart, setActiveChart] = useState(type === "owas" ? "risk" : group);


    const data = Object.keys(result).map((image, index) => {
        if (type === "reba" && group === "group_a") {
            return {
                label: `Imagen ${index + 1}`,
                image: image,
                risk: result[image].Analysis.Reba.risk.value,
                group_a: result[image].Analysis.Reba.group_a.value,
                back: result[image].Analysis.Reba.group_a.insights.back.value,
                legs: result[image].Analysis.Reba.group_a.insights.legs.value,
                neck: result[image].Analysis.Reba.group_a.insights.neck.value,
                confidence: activeChart === 'group_a'? result[image].Analysis.Reba.group_a.confidence : result[image].Analysis.Reba.group_a.insights[activeChart].confidence,
            };
        }
        else if (type === "reba" && group === "group_b") {
            return {
                label: `Imagen ${index + 1}`,
                image: image,
                risk: result[image].Analysis.Reba.risk.value,
                group_b: result[image].Analysis.Reba.group_b.value,
                wrist: result[image].Analysis.Reba.group_b.insights.wrist.value,
                arms: result[image].Analysis.Reba.group_b.insights.arms.value,
                forearm: result[image].Analysis.Reba.group_b.insights.forearm.value,
                confidence: activeChart === 'group_b'? result[image].Analysis.Reba.group_b.confidence : result[image].Analysis.Reba.group_b.insights[activeChart].confidence,
            };
        }
        else if (type === "owas") {
            return {
                label: `Imagen ${index + 1}`,
                image: image,
                legs: result[image].Analysis.Owas.legs.value,
                arms: result[image].Analysis.Owas.arms.value,
                back: result[image].Analysis.Owas.back.value,
                load: result[image].Analysis.Owas.load.value,
                risk: result[image].Analysis.Owas.risk.value,
                confidence: result[image].Analysis.Owas[activeChart==='risk' ? activeChart:`${activeChart}`].confidence, // Ejemplo de confianza
            };
        }
    });

    console.log(data);


    const getColorByConfidence = (confidence) => {
        if (confidence === undefined || confidence === null) {
            return "gray";
        }
        switch (confidence) {
            case 0:
                return "red"; // Baja confianza
            case 1:
                return "yellow"; // Confianza media
            case 2:
                return "green"; // Alta confianza
            default:
                return "gray"; // Default
        }
    };

    const CustomDot = ({ cx, cy, payload }) => (
        <circle
            cx={cx}
            cy={cy}
            r={5}
            fill={getColorByConfidence(payload.confidence)}
            stroke="white"
            strokeWidth={1.5}
            cursor="pointer"
            onClick={() => setCurrentImageName(payload.image)}
        />
    );

    return (
        <Card className="my-5 shadow-none">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                { tittle &&
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-2 sm:py-2">
                        <CardTitle className={"p-0"}>{tittle}</CardTitle>
                    </div>
                }
                <div className="flex">
                    {type === "owas" && ["risk", "legs", "arms", "back", "load"].map((key) => (
                        <button
                            key={key}
                            data-active={activeChart === key}
                            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-2 py-2 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-2"
                            onClick={() => setActiveChart(key)}
                        >
                            <span className="text-xs text-muted-foreground">{key}</span>
                        </button>
                    ))}
                    {type==="reba" && group==="group_a" && ["group_a", "back", "neck", "legs"].map((key) => (
                        <button
                            key={key}
                            data-active={activeChart === key}
                            className="relative z-30 flex flex-col justify-center gap-1 border-t px-2 py-2 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-5 sm:py-2"
                            onClick={() => setActiveChart(key)}
                        >
                            <span className="text-xs text-muted-foreground">{key}</span>
                        </button>
                    ))}
                    {type==="reba" && group==="group_b" && ["group_b", "arms", "forearm", "wrist"].map((key) => (
                        <button
                            key={key}
                            data-active={activeChart === key}
                            className="relative z-30 flex flex-col justify-center gap-1 border-t px-2 py-2 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-5 sm:py-2"
                            onClick={() => setActiveChart(key)}
                        >
                            <span className="text-xs text-muted-foreground">{key}</span>
                        </button>
                    ))}
                </div>
            </CardHeader>

            <CardContent className="p-0 pe-5">
                <ChartContainer
                    config={{
                        risk: { label: "risk", color: "hsl(var(--chart-1))" },
                        legs: { label: "legs", color: "hsl(var(--chart-1))" },
                        arms: { label: "arms", color: "hsl(var(--chart-1))" },
                        back: { label: "back", color: "hsl(var(--chart-1))" },
                        load: { label: "load", color: "hsl(var(--chart-1))" },
                        group_a: { label: "group_a", color: "hsl(var(--chart-1))" },
                        neck: { label: "neck", color: "hsl(var(--chart-1))" },
                        group_b: { label: "group_b", color: "hsl(var(--chart-1))" },
                        forearm: { label: "forearm", color: "hsl(var(--chart-1))" },
                        wrist: { label: "wrist", color: "hsl(var(--chart-1))" },
                    }}
                    className="h-[200px] w-full"
                >
                    <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <XAxis dataKey="label" />
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
                            dataKey={activeChart}
                            stroke="blue"
                            strokeWidth={2}
                            dot={<CustomDot />}
                        />
                        {/*<ChartTooltip content={<ChartTooltipContent indicator="dot" hideLabel/>} />*/}
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
