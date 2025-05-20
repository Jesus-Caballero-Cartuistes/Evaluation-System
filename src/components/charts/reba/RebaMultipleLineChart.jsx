import {Line, LineChart, ReferenceArea, XAxis, YAxis} from "recharts"
import {Card, CardContent, CardHeader, CardTitle} from "../../ui/card"
import {ChartContainer} from "../../ui/chart"
import {useState} from "react";


const colorRanges = [
    { yMin: 0, yMax: 1, color: "rgba(0, 0, 255, 0.5)" },     // Azul (Muy bajo riesgo)
    { yMin: 1, yMax: 2, color: "rgba(0, 255, 255, 0.5)" },   // Cian (Muy bajo riesgo)
    { yMin: 2, yMax: 3, color: "rgba(0, 255, 0, 0.5)" },     // Verde (Bajo riesgo)
    { yMin: 3, yMax: 4, color: "rgba(230, 255, 0, 0.5)" },   // Amarillo claro (Riesgo moderado)
    { yMin: 4, yMax: 5, color: "rgba(255, 165, 0, 0.5)" },   // Naranja claro (Riesgo moderado alto)
    { yMin: 5, yMax: 6, color: "rgba(255, 165, 0, 0.7)" },   // Naranja (Riesgo alto)
    { yMin: 6, yMax: 7, color: "rgba(255, 0, 0, 0.5)" },     // Rojo (Riesgo muy alto)
    { yMin: 7, yMax: 8, color: "rgba(255, 0, 0, 0.7)" },     // Rojo fuerte (Alto riesgo)
    { yMin: 8, yMax: 9, color: "rgba(255, 0, 255, 0.5)" },   // Magenta (Peligro elevado)
    { yMin: 9, yMax: 10, color: "rgba(139, 0, 0, 0.8)" },    // Rojo oscuro (Peligro extremo)
    { yMin: 10, yMax: 11, color: "rgba(75, 0, 130, 0.5)" },  // Índigo (Muy alto)
    { yMin: 11, yMax: 12, color: "rgba(255, 0, 255, 0.5)" }, // Morado (Extremo)
];

export function RebaMultipleLineChartGroupA({ result, setFrame }) {

    const [activeFirstChart, setActiveFirstChart] = useState("group_a");

    const data = Object.keys(result.Analysis).map((frameKey, index) => {
        const frame = result.Analysis[frameKey];
        return {
            frame: frameKey,
            index: `${index + 1}`,
            group_a: frame.Reba.group_a.value,
            back: frame.Reba.group_a.insights.back.value,
            neck: frame.Reba.group_a.insights.neck.value,
            legs: frame.Reba.group_a.insights.legs.value,
            risk: frame.Reba.risk.value,
            confidence1: activeFirstChart === 'group_a'? frame.Reba.group_a.confidence : frame.Reba.group_a.insights[activeFirstChart].confidence,
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

    const CustomDot1 = ({ cx, cy, payload }) => (
        <circle
            cx={cx}
            cy={cy}
            r={5}
            fill={getColorByConfidence(payload.confidence1)}
            stroke="white"
            strokeWidth={1.5}
            cursor="pointer"
            onClick={() => setFrame(payload.frame)}
        />
    );

    return (
        <>
            <Card className="my-5 shadow-none">
                <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-2 sm:py-2">
                        <CardTitle className={"p-0"}>Nivel de Riesgo Grupo A</CardTitle>
                    </div>
                    <div className="flex">
                        {["group_a", "back", "neck", "legs"].map((key) => (
                            <button
                                key={key}
                                data-active={activeFirstChart === key}
                                className="relative z-30 flex flex-col justify-center gap-1 border-t px-2 py-2 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-5 sm:py-2"
                                onClick={() => setActiveFirstChart(key)}
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
                            group_a: { label: "group_a", color: "hsl(var(--chart-1))" },
                            back: { label: "back", color: "hsl(var(--chart-1))" },
                            neck: { label: "neck", color: "hsl(var(--chart-1))" },
                            legs: { label: "legs", color: "hsl(var(--chart-1))" },
                        }}
                        className="h-[200px] w-full"
                    >
                        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <XAxis dataKey="index" />
                            <YAxis
                                // domain={[0, 4]}
                                // ticks={[0, 1, 2, 3, 4]}
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
                                dataKey={activeFirstChart}
                                stroke="blue"
                                strokeWidth={2}
                                dot={<CustomDot1 />}
                            />
                         </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </>

    );
}
export function RebaMultipleLineChartGroupB({ result, setFrame }) {

    const [activeSecondChart, setActiveSecondChart] = useState("group_b");

    const data = Object.keys(result.Analysis).map((frameKey, index) => {
        const frame = result.Analysis[frameKey];
        return {
            frame: frameKey,
            index: `${index + 1}`,
            group_b: frame.Reba.group_b.value,
            arms: frame.Reba.group_b.insights.arms.value,
            forearm: frame.Reba.group_b.insights.forearm.value,
            wrist: frame.Reba.group_b.insights.wrist.value,
            risk: frame.Reba.risk.value,
            confidence2: activeSecondChart === 'group_b'? frame.Reba.group_b.confidence : frame.Reba.group_b.insights[activeSecondChart].confidence,
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

    const CustomDot2 = ({ cx, cy, payload }) => (
        <circle
            cx={cx}
            cy={cy}
            r={5}
            fill={getColorByConfidence(payload.confidence2)}
            stroke="white"
            strokeWidth={1.5}
            cursor="pointer"
            onClick={() => setFrame(payload.frame)}
        />
    );

    return (
        <>

            <Card className="my-5 shadow-none">
                <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-2 sm:py-2">
                        <CardTitle>Nivel de Riesgo Grupo B</CardTitle>
                    </div>
                    <div className="flex">
                        {["group_b", "arms", "forearm", "wrist"].map((key) => (
                            <button
                                key={key}
                                data-active={activeSecondChart === key}
                                className="relative z-30 flex flex-col justify-center gap-1 border-t px-2 py-2 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-5 sm:py-2"
                                onClick={() => setActiveSecondChart(key)}
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
                            group_b: { label: "group_b", color: "hsl(var(--chart-1))" },
                            arms: { label: "arms", color: "hsl(var(--chart-1))" },
                            forearm: { label: "forearm", color: "hsl(var(--chart-1))" },
                            wrist: { label: "wrist", color: "hsl(var(--chart-1))" },
                        }}
                        className="h-[200px] w-full"
                    >
                        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <XAxis dataKey="index" />
                            <YAxis
                                // domain={[0, 4]}
                                // ticks={[0, 1, 2, 3, 4]}
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
                                dataKey={activeSecondChart}
                                stroke="blue"
                                strokeWidth={2}
                                dot={<CustomDot2 />}
                            />
                            </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </>

    );
}

export function RebaLineChartRisk({ result, setFrame }) {

    const data = Object.keys(result.Analysis).map((frameKey, index) => {
        const frame = result.Analysis[frameKey];
        return {
            frame: frameKey,
            index: `${index + 1}`,
            risk: frame.Reba.risk.value,
            confidence: frame.Reba.risk.confidence,
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

    const CustomDot2 = ({ cx, cy, payload }) => (
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
        <>
            <Card className="my-5 shadow-none">
                <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-2 sm:py-2">
                        <CardTitle>Nivel de Riesgo</CardTitle>
                    </div>
                    <div className="flex">
                    </div>
                </CardHeader>

                <CardContent className="p-0 pe-5">
                    <ChartContainer
                        config={{
                            risk: { label: "risk", color: "hsl(var(--chart-1))" },
                        }}
                        className="h-[200px] w-full"
                    >
                        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <XAxis dataKey="index" />
                            <YAxis
                                // domain={[0, 4]}
                                // ticks={[0, 1, 2, 3, 4]}
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
                                dataKey={"risk"}
                                stroke="blue"
                                strokeWidth={2}
                                dot={<CustomDot2 />}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </>
    )
}