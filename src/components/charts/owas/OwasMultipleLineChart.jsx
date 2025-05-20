import {Line, LineChart, ReferenceArea, XAxis, YAxis} from "recharts"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../ui/card"
import {ChartContainer} from "../../ui/chart"
import {useState} from "react";


const colorRanges = [
    { yMin: 0, yMax: 1, color: "rgb(255,0,0, 0.5)" },   // Rojo
    { yMin: 1, yMax: 2, color: "rgba(255, 255, 0, 0.5)" }, // Amarillo
    { yMin: 2, yMax: 3, color: "rgba(0, 255, 0, 0.5)" },   // Verde
    { yMin: 3, yMax: 4, color: "rgba(0, 0, 255, 0.5)" },   // Azul
]

// [
//     { index: "1", timestamp: 0, legs: 2, arms: 1, back: 4, load: 2 },
//     { index: "2", timestamp: 0.04, legs: 2, arms: 1, back: 4, load: 2 },
//     { index: "3", timestamp: 0.08, legs: 2, arms: 1, back: 4, load: 2 }
// ]

export default function OwasMultipleLineChart({ result, setFrame }) {

    const colorRanges = [
        { yMin: 0, yMax: 1, color: "rgba(0, 255, 0, 0.5)" },   // Rojo (Riesgo bajo)
        { yMin: 1, yMax: 2, color: "rgba(230, 255, 0, 0.5)" },   // Naranja (Riesgo moderado bajo)
        { yMin: 2, yMax: 3, color: "rgba(255, 165, 0, 0.5)" },   // Amarillo (Riesgo moderado)
        { yMin: 3, yMax: 4, color: "rgba(255, 0, 0, 0.5)" },   // Amarillo (Riesgo moderado)
        { yMin: 4, yMax: 5, color: "rgba(101,3,3,0.5)" }    // Azul (Riesgo medio bajo)
    ];
    const [activeChart, setActiveChart] = useState("risk");

    const data = Object.keys(result.Analysis).map((frameKey, index) => {
        const frame = result.Analysis[frameKey];
        const timestamp = frame["TimesTamp"];
        return {
            frame: frameKey,
            index: `${index + 1}`,
            timestamp: timestamp,
            legs: frame.Owas.legs.value,
            arms: frame.Owas.arms.value,
            back: frame.Owas.back.value,
            load: frame.Owas.load.value,
            risk: frame.Owas.risk.value,
            confidence: frame.Owas[activeChart==='risk' ? activeChart:`${activeChart}`].confidence || 1, // Ejemplo de confianza
        };
    });

    
    const getColorByConfidence = (confidence) => {
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
            onClick={() => setFrame(payload.frame)}
        />
    );

    return (
        <Card className="my-5 w-full shadow-none">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-2 sm:py-6">
                    <CardTitle>Bar Chart - Nivel de Riesgo</CardTitle>
                    <CardDescription>
                        Distribución del nivel de riesgo en cada miembro del cuerpo
                    </CardDescription>
                </div>
                <div className="flex">
                    {["risk", "legs", "arms", "back", "load"].map((key) => (
                        <button
                            key={key}
                            data-active={activeChart === key}
                            className="relative z-30 flex flex-col justify-center gap-1 border-t px-2 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-5 sm:py-6"
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
                    }}
                    className="h-[200px] w-full"
                >
                    <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <XAxis dataKey="index" />
                        <YAxis
                            label={
                                <text
                                    style={{
                                        fontWeight: "bold",
                                        transform: "rotate(-90deg)",
                                        textAnchor: "middle",
                                    }}
                                >
                                    Valor
                                </text>
                            }
                            domain={[0, 5]}
                            ticks={[0, 1, 2, 3, 4, 5]}
                            />
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
