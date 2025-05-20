import "../mediaprint.css"
import React, {useState} from "react";
import SingleLineChart from "../../../components/charts/SingleLineChart";
import {ClipboardList, Grip, Star} from 'lucide-react';
import OwasSinglePieChart from "../../../components/charts/owas/OwasSinglePieChart";
import SingleRadarChart from "../../../components/charts/SingleRadarChart";
import ImageMultipleBarChart from "../../../components/charts/ImageMultipleBarChart";
import {
    InfoPrompt,
    InfoSection,
    Recommendations,
    RiskFactors
} from "../../../components/evaluation-components/general/reports";
import {Button} from "../../../components/ui/button";
import {FaRegFilePdf} from "react-icons/fa";
import {Save} from 'lucide-react';
import {useOwasContext} from "../../../context/OwasContext";
import {Badge} from "../../../components/ui/badge";
import {Separator} from "../../../components/ui/separator";

export default function OwasReportPage() {

    const {components, setComponents, savedFrames} = useOwasContext();

    const updateComponent = (id, updatedFields) => {
        setComponents(prevComponents => {
            // Encuentra el índice del componente que quieres actualizar
            const componentIndex = prevComponents.findIndex(component => component.id === id);

            // Si el componente existe, actualiza los campos
            if (componentIndex !== -1) {
                // Crear una copia de los componentes y actualizar el componente específico
                const updatedComponents = [...prevComponents];
                updatedComponents[componentIndex] = {
                    ...updatedComponents[componentIndex], // Mantén los campos anteriores
                    ...updatedFields // Sobreescribe con los nuevos valores
                };

                // Retorna la nueva lista de componentes
                return updatedComponents;
            } else {
                console.log("Componente no encontrado con ID:", id);
                return prevComponents; // Devuelve el estado sin cambios si no se encuentra el componente
            }
        });
    };

    const generatePDF = () => {
        window.print();
    };

    return (
        <>
            <div className={"px-5 py-1"}>
                {/* Botón para generar el PDF */}
                <Button onClick={generatePDF} variant={"destructive"}>
                    Generar PDF
                    <FaRegFilePdf/>
                </Button>
            </div>

            <div className="show-print container border text-[12px]"
                 style={{
                     width: '8.5in',
                     padding: '1in',
                     boxSizing: 'border-box',
                     margin: 'auto',
                     overflow: 'auto'
                 }}>

                {/* Encabezado */}
                <div className="border-b pb-4 mb-6">
                    <h1 className="text-2xl font-bold text-center mb-2">INFORME DE ANÁLISIS ERGONÓMICO - OWAS</h1>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">Fecha: {new Date().toLocaleDateString()}</p>
                        <span className={"flex items-center"}>
                            <img src={"/logo.ico"} className={"w-[30px]"} alt={"logo"}/>
                        <p className="text-sm text-gray-500">OWAS</p>
                        </span>
                    </div>
                </div>

                <InfoSection color500={"bg-amber-500"} color100={"bg-amber-100"}/>

                {components && components.map((component, index) => {
                    if (component.type === 'video' && component.isEvaluated) {
                        return (
                            <VideoTaskSection key={component.id}
                                              type={component.type}
                                              id={component.id}
                                              taskName={component.taskName}
                                              taskDescription={component.taskDescription}
                                              load={component.load}
                                              result={component.contextResult}
                                              firstFrame={component.firstFrame}
                                              criticalFrames={component.criticalFrames}
                                              savedFrames={savedFrames?.[component.id]}
                                              recommendations={component.recommendations}
                                              riskFactors={component.riskFactors}
                                              updateComponent={updateComponent}
                            />
                        );
                    } else if (component.type === 'image' && component.isEvaluated) {
                        return (
                            <ImageTaskSection key={component.id}
                                              type={component.type}
                                              id={component.id}
                                              taskName={component.taskName}
                                              taskDescription={component.taskDescription}
                                              load={component.load}
                                              images={component.images}
                                              result={component.contextResult}
                                              recommendations={component.recommendations}
                                              riskFactors={component.riskFactors}
                                              updateComponent={updateComponent}
                            />
                        );
                    }
                })};
            </div>
        </>
    );
}


function ImageTaskSection({
                              result,
                              images,
                              type,
                              id,
                              taskName,
                              taskDescription,
                              load,
                              recommendations,
                              riskFactors,
                              updateComponent
                          }) {

    function promptGenerator(typePrompt) {
        const prompt = GenerateImagePrompt({type, taskName, taskDescription, load, typePrompt, result})
        console.log(prompt);
        return prompt;
    }

    const getRiskColor = (risk) => {
        if (risk < 2) {
            return "bg-gray-100 text-gray-800 hover:bg-gray-100"


        } else if (risk < 4) {
            return "bg-green-100 text-green-800 hover:bg-green-100"

        } else if (risk < 8) {
            return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"

        } else if (risk < 11) {
            return "bg-red-100 text-red-800 hover:bg-red-100"

        } else if (risk < 16) {
            return "bg-red-100 text-red-800 hover:bg-red-100"

        } else {
            return "bg-gray-100 text-gray-800 hover:bg-gray-100"

        }
    };

    return (
        <div className={"pb-16"}>
            <div className="flex space-x-2 mb-1 py-1">
                <ClipboardList/>
                <h1 className="font-bold">{taskName}</h1>
                <span className="flex-grow"></span>
                <div className="flex border rounded-2xl border-blue-100 px-3 space-x-2">
                    <h1 className="font-bold">Task</h1>
                    <h1 className="font-bold bg-blue-100 px-3">#{id}</h1>
                </div>
            </div>
            <div className={"pb-3"}>
                {taskDescription && <p>{taskDescription}</p>}
            </div>

            {/**/}
            <div className={"my-3"}>
                {images.length > 0 && (
                    <>
                        <div>
                            {images.map((image, index) => (
                                <div key={index} className="section pb-5 ">
                                    <div className={"grid grid-cols-5 grid-rows-1 gap-4 py-3"}>
                                        <div className="col-span-3">
                                            <div className={"flex items-center gap-2 mb-2"}>
                                                <Grip className="h-4 w-4 text-muted-foreground"/>
                                                <h2 className={`text-lg font-medium`}>Imagen {index + 1}</h2>
                                                <span>---</span>
                                                    <h3 className="text-lg font-medium">Nivel de Riesgo</h3>
                                                    <Badge
                                                        className={`ml-2 p-0 ${getRiskColor(result[image.name].Analysis.Owas.risk.value)} px-3 py-1 text-base font-medium`}>
                                                        {result[image.name].Analysis.Owas.risk.value}
                                                    </Badge>
                                            </div>
                                            <Separator></Separator>
                                        </div>
                                        <div className="col-span-2 col-start-4">

                                        </div>
                                    </div>
                                    <div className="grid grid-cols-5 grid-rows-1 gap-4 py-3 section">
                                        <div className="col-span-3">
                                            <div key={index} className="w-[300px] h-[243px]">
                                                <img className="object-contain w-full h-full" src={image.preview}
                                                     alt={`Captured Frame ${image.name}`}/>
                                            </div>
                                        </div>
                                        <div className="col-span-2 col-start-4">
                                            <div>
                                                <SingleRadarChart frameResult={result[image.name].Analysis.Owas}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={"section"}>
                            <ImageMultipleBarChart result={result}
                                                   description={"Comparativa de la distribución del riesgo en diferentes partes del cuerpo"}
                                                   type={"owas"}
                            />
                        </div>
                    </>
                )}
            </div>
            <div className={"pt-3 space-x-2"}>
                <Recommendations promptGenerator={promptGenerator} recommendations={recommendations} id={id}
                                 updateComponent={updateComponent}/>

                <RiskFactors promptGenerator={promptGenerator} riskFactors={riskFactors} id={id}
                             updateComponent={updateComponent}/>
            </div>
        </div>
    )
}


function VideoTaskSection({
                              type,
                              id,
                              taskName,
                              taskDescription,
                              load,
                              result,
                              firstFrame,
                              criticalFrames,
                              savedFrames
                              , recommendations, riskFactors, updateComponent
                          }) {

    const [insights, setInsights] = useState(calculateInsights(result));

    function calculateInsights(data) {
        const result = {
            mostFrequent: {},
            mostCritical: {}
        };

        // Recorremos las evaluaciones dentro de Owas
        Object.keys(data.Analysis).forEach(frameKey => {
            const owas = data.Analysis[frameKey].Owas;

            Object.keys(owas).forEach(evaluationKey => {
                const evaluation = owas[evaluationKey];
                const value = parseInt(evaluation.value);

                // Calcular el valor más frecuente (moda)
                if (!result.mostFrequent[evaluationKey]) {
                    result.mostFrequent[evaluationKey] = {values: [], frequency: {}};
                }
                result.mostFrequent[evaluationKey].values.push(value);
                result.mostFrequent[evaluationKey].frequency[value] = (result.mostFrequent[evaluationKey].frequency[value] || 0) + 1;

                // Calcular el valor más crítico (el más alto)
                if (!result.mostCritical[evaluationKey] || value > result.mostCritical[evaluationKey]) {
                    result.mostCritical[evaluationKey] = value;
                }
            });
        });

        // Calcular la moda (más frecuente) para cada evaluación
        Object.keys(result.mostFrequent).forEach(evaluationKey => {
            const freqData = result.mostFrequent[evaluationKey].frequency;
            let maxFreq = 0;
            let mostFrequentValue = null;

            Object.keys(freqData).forEach(value => {
                if (freqData[value] > maxFreq) {
                    maxFreq = freqData[value];
                    mostFrequentValue = parseInt(value);
                }
            });

            // Guardamos el resultado más frecuente
            result.mostFrequent[evaluationKey] = mostFrequentValue;
        });

        return result;
    }

    function promptGenerator(typePrompt) {
        const prompt = GenerateVideoPrompt({type, taskName, taskDescription, load, insights, typePrompt})
        console.log(prompt);
        return prompt;
    }



    return (
        <div className={"pb-16"}>
            <div className="section ">
                <div className="flex space-x-2 mb-1 py-1">
                    <ClipboardList/>
                    <h1 className="font-bold">{taskName}</h1>
                    <span className="flex-grow"></span>
                    <div className="flex border rounded-2xl border-blue-100 px-3 space-x-2">
                        <h1 className="font-bold">Task</h1>
                        <h1 className="font-bold bg-blue-100 px-3">#{id}</h1>
                    </div>
                </div>
                <div className={"pb-3"}>
                    {taskDescription && <p>{taskDescription}</p>}
                </div>

                {/**/}
                <div className="grid grid-cols-2 grid-rows-1 gap-3">
                    <div className="h-[232px]">
                        {firstFrame && (
                            <img className="object-contain h-full" src={firstFrame}
                                 alt={`Captured Frame 1`}/>

                        )}
                    </div>
                    <div className="">
                        {insights.mostFrequent && insights.mostCritical &&
                            (
                                <table
                                    className="text-[11px] min-w-full table-auto text-sm text-gray-700 bg-white rounded-lg shadow-md border border-gray-200">
                                    <thead className="bg-gray-100 text-gray-600">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-semibold">Evaluación</th>
                                        <th className="px-4 py-2 text-left font-semibold">Most Critical</th>
                                        <th className="px-4 py-2 text-left font-semibold">Most Frequent</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="border-t border-gray-200">
                                        <td className="px-4 py-2">Brazos</td>
                                        <td className="px-4 py-2 text-center">{insights.mostCritical.arms}</td>
                                        <td className="px-4 py-2 text-center">{insights.mostFrequent.arms}</td>
                                    </tr>
                                    <tr className="border-t border-gray-200">
                                        <td className="px-4 py-2">Piernas</td>
                                        <td className="px-4 py-2 text-center">{insights.mostCritical.legs}</td>
                                        <td className="px-4 py-2 text-center">{insights.mostFrequent.legs}</td>
                                    </tr>
                                    <tr className="border-t border-gray-200">
                                        <td className="px-4 py-2 whitespace-nowrap">Espalda</td>
                                        <td className="px-4 py-2 text-center">{insights.mostCritical.back}</td>
                                        <td className="px-4 py-2 text-center">{insights.mostFrequent.back}</td>
                                    </tr>
                                    <tr className="border-t border-gray-200">
                                        <td className="px-4 py-2">Carga</td>
                                        <td className="px-4 py-2 text-center">{insights.mostCritical.load}</td>
                                        <td className="px-4 py-2 text-center">{insights.mostFrequent.load}</td>
                                    </tr>
                                    <tr className="border-t border-gray-200">
                                        <td className="px-4 py-2">General</td>
                                        <td className="px-4 py-2 text-center">{insights.mostCritical.risk}</td>
                                        <td className="px-4 py-2 text-center">{insights.mostFrequent.risk}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            )
                        }
                    </div>
                </div>
            </div>
            {criticalFrames && (
                <div className={"py-2 section"}>
                    <div className={"flex items-center gap-2 mb-2"}>
                        <Grip className="h-4 w-4 text-muted-foreground"/>
                        <h2 className={`text-lg font-medium`}>Datos del Puesto</h2>
                    </div>
                    <p>Análisis de los frames que destacan las posiciones más relevantes o críticas a lo
                        largo del video.</p>
                    <div className={"flex space-x-2 py-2"}>
                        {criticalFrames.map((frame, index) => (
                            <div key={index} className="w-auto h-auto max-h-[250px]">
                                <img className="object-contain w-full h-full" src={frame.image}
                                     alt={`Captured Frame ${frame.frame}`}/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div>
                {result && result.Analysis && (
                    <>
                        <div className={"section"}>
                            <div className={"flex items-center gap-2 mb-2"}>
                                <Grip className="h-4 w-4 text-muted-foreground"/>
                                <h2 className={`text-lg font-medium`}>Distribución del Riesgo</h2>
                            </div>
                            <SingleLineChart tittle="Puntuación General OWAS" result={result} label="risk"
                                             type={"owas"}/>
                        </div>
                        <div className={"section"}>
                            <div className={"flex items-center gap-2 mb-2"}>
                                <Grip className="h-4 w-4 text-muted-foreground"/>
                                <h2 className={`text-lg font-medium`}>Distribución del Riesgo en
                                    Diferentes Partes del Cuerpo</h2>
                            </div>
                            <p>En esta sección del reporte, se presentan gráficos de pastel que ilustran la
                                distribución
                                porcentual del riesgo en diferentes áreas del cuerpo: brazos, piernas y espalda.
                                Estos
                                gráficos muestran el tiempo que cada parte del cuerpo pasó expuesta a distintos
                                niveles
                                de
                                riesgo, proporcionando una visión clara de las áreas más afectadas.</p>
                        </div>
                        <div className="flex space-x-2 section">
                            <div className={"flex-grow"}>
                                <OwasSinglePieChart label={"arms"} result={result} tittle={"Pie Chart - Brazos"}/>
                            </div>
                            <div className={"flex-grow"}>
                                <OwasSinglePieChart label={"legs"} result={result} tittle={"Pie Chart - Piernas"}/>

                            </div>
                            <div className={"flex-grow"}>
                                <OwasSinglePieChart label={"back"} result={result} tittle={"Pie Chart - Espalda"}/>
                            </div>
                        </div>
                    </>
                )
                }
                {savedFrames && (
                    <div className={"space-y-2"}>
                        <div className={"flex items-center space-x-2"}>
                            <Star color="#f5c105"/> <span className="font-bold">Frames Guardados</span>
                        </div>
                        {/*    mostrar los savedFrames del 1 en adelante*/}
                        {savedFrames.map((frame, index) => (
                            <div key={index} className="grid grid-cols-2 grid-rows-1 gap-3 section">
                                <div className="w-[300px] h-[243px]">
                                    <img className="object-contain w-full h-full" src={frame.image}
                                         alt={`Captured Frame ${frame.frame}`}/>
                                </div>
                                <div className="">
                                    {result && result.Analysis && (
                                        <SingleRadarChart frameResult={result.Analysis[frame.frame].Owas}/>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className={"pt-3 space-x-2"}>
                    <Recommendations promptGenerator={promptGenerator} recommendations={recommendations} id={id}
                                     updateComponent={updateComponent}/>

                    <RiskFactors promptGenerator={promptGenerator} riskFactors={riskFactors} id={id}
                                 updateComponent={updateComponent}/>
                </div>
            </div>
        </div>
    )
}


function GenerateVideoPrompt({type, taskName, taskDescription, load, insights, typePrompt}) {

    const description = {
        'arms': ["Los dos brazos bajos",
            "Un brazo bajo y el otro elevado",
            "Los dos brazos elevados"],
        'legs': ["Sentado",
            "De pie con las dos piernas rectas",
            "De pie con una pierna recta y la otra flexionada",
            "De pie o en cuclillas con las dos piernas flexionadas y el peso equilibrado entre ambas",
            "De pie o en cuclillas con las dos piernas flexionadas y el peso desequilibrado",
            "Arrodillado",
            "Andando"],
        'back': ["Espalda recta",
            "Espalda doblada",
            "Espalda girada",
            "Espalda doblada con giro"]
    }
    const result = (() => {
        const back = insights.mostFrequent.back;
        const legs = insights.mostFrequent.legs;
        const arms = insights.mostFrequent.arms;
        const risk = insights.mostFrequent.risk;
        return `
            Resultados:
            - Brazos: ${arms || 'N/A'} (${description.arms[arms - 1]})
            - Piernas: ${legs || 'N/A'} (${description.legs[legs - 1]})
            - Espalda: ${back || 'N/A'} (${description.back[back - 1]})
            - Riesgo: ${risk}
        `;
    })();

    const tittle = `Genera ${typePrompt} a partir de la siguiente evaluación OWAS:`;
    const info = InfoPrompt({type, taskName, taskDescription, load});
    return (tittle + info + result);
}

function GenerateImagePrompt({type, taskName, taskDescription, load, typePrompt, result}) {

    const description = {
        'arms': ["Los dos brazos bajos",
            "Un brazo bajo y el otro elevado",
            "Los dos brazos elevados"],
        'legs': ["Sentado",
            "De pie con las dos piernas rectas",
            "De pie con una pierna recta y la otra flexionada",
            "De pie o en cuclillas con las dos piernas flexionadas y el peso equilibrado entre ambas",
            "De pie o en cuclillas con las dos piernas flexionadas y el peso desequilibrado",
            "Arrodillado",
            "Andando"],
        'back': ["Espalda recta",
            "Espalda doblada",
            "Espalda girada",
            "Espalda doblada con giro"]
    }

    const mostCriticalResult = (() => {
        let max = 0;
        let posture = null;
        Object.keys(result).forEach(image => {
            if (result[image].Analysis.Owas.risk.value > max) {
                max = result[image].Analysis.Owas.risk.value;
                posture = image;
            }
        });
        const back = result[posture].Analysis.Owas.back.value;
        const legs = result[posture].Analysis.Owas.legs.value;
        const arms = result[posture].Analysis.Owas.arms.value;
        return `
            Resultados:
            - Brazos: ${arms || 'N/A'} (${description.arms[arms - 1]})
            - Piernas: ${legs || 'N/A'} (${description.legs[legs - 1]})
            - Espalda: ${back || 'N/A'} (${description.back[back - 1]})
            - Riesgo: ${max}
        `;
    })();

    const tittle = `Genera ${typePrompt} a partir de la siguiente evaluación OWAS:`;
    const info = InfoPrompt({type, taskName, taskDescription, load});
    return (tittle + info + mostCriticalResult);
}

