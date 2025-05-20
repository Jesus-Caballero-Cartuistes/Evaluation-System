import useGenerateRecommendation from "../../../hooks/useGenerateRecommendation";
import {Button} from "../../ui/button";
import {Grip, Gem, TriangleAlert} from 'lucide-react';
import React , {useEffect, useRef, useState}from "react";

export function Recommendations({promptGenerator, recommendations, id, updateComponent}) {

    const {
        loading: recLoading,
        result: recResult,
        error: recError,
        generateResponse: generateRecommendation
    } = useGenerateRecommendation();


    function handlePrompt(typePrompt) {
        const prompt = promptGenerator(typePrompt);
        console.log(prompt);
        generateRecommendation(prompt);
    }

    useEffect(() => {
        if(recResult){
            updateComponent(id, {recommendations: recResult});
        }
    }, [recResult]);

    return <>
        {recommendations && (
            <div className={`mb-2`}>
                <div className={"flex items-center gap-2 mb-2"}>
                    <Grip className="h-4 w-4 text-muted-foreground"/>
                    <h2 className={`text-lg font-medium`}>Recomendaciones</h2>
                </div>
                <div dangerouslySetInnerHTML={{__html: recommendations.html_content}}/>
            </div>
        )}
        {/* Si no hay recomendaciones, muestra el botón para generarlas */}
        {!recommendations && (
            <>
                {!recResult && !recLoading && !recError && (
                    <Button onClick={() => handlePrompt(`Recomendaciones`)}>
                        Generar Recomendaciones <Gem/>
                    </Button>
                )}
                { recLoading && <p>Cargando...</p>}
                {/* Muestra mensaje mientras carga */}
                {recError && <p style={{color: 'red'}}>{recError}</p>}
                {/* Muestra mensaje de error */}
                {recResult && (
                        <div className={`mb-2`}>
                            <div className={"flex items-center gap-2 mb-2"}>
                                <Grip className="h-4 w-4 text-muted-foreground"/>
                                <h2 className={`text-lg font-medium`}>Recomendaciones</h2>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: recResult.html_content}}/>
                        </div>
                    )}
            </>
        )}

    </>;
}

export function RiskFactors({promptGenerator, riskFactors, id, updateComponent}) {

    const {
        loading: riskLoading,
        result: riskResult,
        error: riskError,
        generateResponse: generateRisks
    } = useGenerateRecommendation();

    function handlePrompt(typePrompt) {
        const prompt = promptGenerator(typePrompt);
        console.log(prompt);
        generateRisks(prompt);
    }

    useEffect(() => {
        if(riskResult){
            updateComponent(id, {riskFactors: riskResult});
        }
    }, [riskResult]);

    return <>
        {riskFactors && (
            <div className={`my-3`}>
                <div className={"flex items-center gap-2 mb-2"}>
                    <Grip className="h-4 w-4 text-muted-foreground"/>
                    <h2 className={`text-lg font-medium`}>Factores de Riesgo</h2>
                </div>
                <div dangerouslySetInnerHTML={{__html: riskFactors.html_content}}/>
            </div>
        )}
        {!riskFactors && (
            <>
                {!riskResult && !riskLoading && !riskError && (
                    <Button onClick={() => handlePrompt(`Factores de Riesgo`)}>Generar Factores de
                        Riesgo <TriangleAlert/>
                    </Button>
                )}
                {riskLoading && <p>Cargando...</p>} {/* Muestra mensaje mientras carga */}
                {riskError && <p style={{color: 'red'}}>{riskError}</p>} {/* Muestra mensaje de error */}
                {riskResult && (
                    <div className={`my-3`}>
                        <div className={"flex items-center gap-2 mb-2"}>
                            <Grip className="h-4 w-4 text-muted-foreground"/>
                            <h2 className={`text-lg font-medium`}>Factores de Riesgo</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{__html: riskResult.html_content}}/>
                    </div>
                )}
            </>

        )}
    </>;
}


export function InfoPrompt({type, taskName, taskDescription, load}) {
    const info = JSON.parse(sessionStorage.getItem('InfoEvaluation')) || {};
    return (`
        Task Type: ${type || 'N/A'}
        Task Name: ${taskName || 'N/A'}
        Task Description: ${taskDescription || 'N/A'}
        Datos del Puesto:
            Área de trabajo: ${info.workArea || 'N/A'}
            Tipo de trabajo: ${info.workType || 'N/A'}
            Equipos utilizados: ${info.equipmentUsed || 'N/A'}
            Condiciones ambientales: ${info.environmentalConditions || 'N/A'}
        Datos del Trabajador:
            Nombre: ${info.workerName || 'N/A'}
            Edad: ${info.workerAge || 'N/A'}
            Cargo: ${info.workerPosition || 'N/A'}
            Tiempo en el puesto: ${info.workerTimeInPosition || 'N/A'}
            Antecedentes médicos: ${info.workerMedicalHistory || 'N/A'}
        Carga de trabajo: ${load || 'N/A'} Kg
    `);
}

export function InfoSection({color500, color100}) {
    const info = JSON.parse(sessionStorage.getItem('InfoEvaluation'));
    return (
        <>
            {info && (
                <>
                    {/* Sección de datos del puesto */}
                    <div className={`section mb-6`}>
                        <div className={"flex items-center gap-2 mb-2"}>
                            <Grip className="h-4 w-4 text-muted-foreground"/>
                            <h2 className={`text-lg font-medium`}>Datos del Puesto</h2>
                        </div>
                        <table className={`table-auto text-[12px] w-full border border-gray-300 rounded-2xl`}>
                            <tbody>
                            {/* Fila: Área de trabajo */}
                            <tr className={`border-b border-gray-300`}>
                                <th className={`text-left px-4 py-1 font-medium ${color100}`}>Área de trabajo</th>
                                <td className={`px-4 `}>{info.workArea}</td>
                            </tr>
                            {/* Fila: Tipo de trabajo */}
                            <tr className={`border-b border-gray-300`}>
                                <th className={`text-left px-4 py-1 font-medium ${color100}`}>Tipo de trabajo</th>
                                <td className={`px-4 `}>{info.workType}</td>
                            </tr>
                            {/* Fila: Equipos utilizados */}
                            <tr className={`border-b border-gray-300`}>
                                <th className={`text-left px-4 py-1 font-medium ${color100}`}>Equipos utilizados</th>
                                <td className={`px-4 `}>{info.equipmentUsed}</td>
                            </tr>
                            {/* Fila: Condiciones ambientales */}
                            <tr>
                                <th className={`text-left px-4 py-1 font-medium ${color100}`}>Condiciones
                                    ambientales
                                </th>
                                <td className={`px-4 `}>{info.environmentalConditions}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={`flex space-x-5`}>
                        {/* Sección de datos del evaluador */}
                        <div className={`section mb-6 flex-shrink-0`}>
                            <div className={"flex items-center gap-2 mb-2"}>
                                <Grip className="h-4 w-4 text-muted-foreground"/>
                                <h2 className={`text-lg font-medium`}>Datos del Evaluador</h2>
                            </div>

                            <table className={`text-[12px] table-auto w-full border border-gray-300`}>
                                <tbody>
                                {/* Fila: Nombre */}
                                <tr className={`border-b border-gray-300`}>
                                    <th className={`text-left px-4 py-1 font-medium ${color100}`}>Nombre</th>
                                    <td className={`px-4 whitespace-nowrap w-1`}>{info.evaluatorName}</td>
                                </tr>
                                {/* Fila: Rol */}
                                <tr className={`border-b border-gray-300`}>
                                    <th className={`text-left px-4 py-1 font-medium ${color100}`}>Rol</th>
                                    <td className={`px-4  whitespace-nowrap w-1`}>{info.evaluatorRole}</td>
                                </tr>
                                {/* Fila: Fecha de evaluación */}
                                <tr>
                                    <th className={`text-left px-4 py-1 font-medium ${color100}`}>Fecha de
                                        evaluación
                                    </th>
                                    <td className={`px-4 whitespace-nowrap w-1`}>{info.date}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Sección de datos del trabajador */}
                        <div className={`section mb-6 flex-grow`}>
                            <div className={"flex items-center gap-2 mb-2"}>
                                <Grip className="h-4 w-4 text-muted-foreground"/>
                                <h2 className={`text-lg font-medium`}>Datos del Trabajador</h2>
                            </div>

                            <table className={`text-[12px] table-auto w-full border border-gray-300`}>
                                <tbody>
                                {/* Fila: Nombre */}
                                <tr className={`border-b border-gray-300`}>
                                    <th className={`text-left px-4 py-1 font-medium ${color100}`}>Nombre</th>
                                    <td className={`px-4`}>{info.workerName}</td>
                                </tr>
                                {/* Fila: Edad */}
                                <tr className={`border-b border-gray-300`}>
                                    <th className={`text-left px-4 py-1 font-medium ${color100}`}>Edad</th>
                                    <td className={`px-4`}>{info.workerAge}</td>
                                </tr>
                                {/* Fila: Cargo */}
                                <tr className={`border-b border-gray-300`}>
                                    <th className={`text-left px-4 py-1 font-medium ${color100}`}>Cargo</th>
                                    <td className={`px-4`}>{info.workerPosition}</td>
                                </tr>
                                {/* Fila: Tiempo en el puesto */}
                                <tr className={`border-b border-gray-300`}>
                                    <th className={`text-left px-4 py-1 font-medium ${color100}`}>Tiempo en el
                                        puesto
                                    </th>
                                    <td className={`px-4`}>{info.workerTimeInPosition}</td>
                                </tr>
                                {/* Fila: Antecedentes médicos */}
                                <tr>
                                    <th className={`text-left px-4 py-1 font-medium ${color100}`}>Antecedentes
                                        médicos
                                    </th>
                                    <td className={`px-4`}>{info.workerMedicalHistory}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}