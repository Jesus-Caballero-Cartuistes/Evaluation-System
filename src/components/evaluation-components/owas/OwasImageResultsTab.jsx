import {Separator} from "../../ui/separator"
import {AccordionOwas} from "./AccordionOwas";
import React, {useEffect, useState} from 'react';
import ImageCarousel from "../general/ImageCarousel";
import ImageCarouselLineChart from "../../charts/ImageCarouselLineChart";
import SingleRadarChart from "../../charts/SingleRadarChart";
import {owasTables} from "../../../tables/owasTables";

function OwasImageResultsTab({
                                 images,
                                 result,
                                 setResult,
                                 currentImageName,
                                 setCurrentImageName
                             }) {

    const [frameResult, setFrameResult] = useState(result[currentImageName]["Analysis"]["Owas"]);

    const updateResults = (key, value) => {
        setResult(prevState => {
            const newState = {
                ...prevState,
                [currentImageName]: {
                    ...prevState[currentImageName],
                    Analysis: {
                        ...prevState[currentImageName].Analysis,
                        Owas: {
                            ...prevState[currentImageName].Analysis.Owas,
                            [key]: {
                                value: value,
                                confidence: 2
                            }
                        }
                    }
                }
            }
            newState[currentImageName].Analysis.Owas.risk.confidence = Math.min(
                newState[currentImageName].Analysis.Owas.legs.confidence,
                newState[currentImageName].Analysis.Owas.arms.confidence,
                newState[currentImageName].Analysis.Owas.back.confidence)
            newState[currentImageName].Analysis.Owas.risk.value = owasTables[newState[currentImageName].Analysis.Owas.back.value][newState[currentImageName].Analysis.Owas.legs.value][newState[currentImageName].Analysis.Owas.arms.value][newState[currentImageName].Analysis.Owas.load.value]

            return newState;
        });
    };

    useEffect(() => {
        // Obtener los resultados del Frame después de que videoResultado haya cambiado
        const newFrameResults = result?.[currentImageName]?.Analysis?.Owas;
        if (newFrameResults) {
            setFrameResult(newFrameResults);
        }
    }, [result, currentImageName]);

    return (
        <>
            <div className="lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:gap-4">
                <div className="column 1">
                    <div className={"h-[300px]"}>
                        <ImageCarousel images={images}
                                       currentImageName={currentImageName}
                                       setCurrentImageName={setCurrentImageName}
                        />
                    </div>

                    <ImageCarouselLineChart result={result} setCurrentImageName={setCurrentImageName} type={"owas"}/>
                </div>
                <div className="column 2">
                    <div className="flex justify-center items-center px-5">
                        <div className="flex border rounded-2xl border-amber-100 px-3 space-x-2">
                            <h1 className="font-bold">Overall Risk Score:</h1>
                            <h1 className="font-bold bg-amber-100 px-3">{frameResult.risk.value}</h1>
                        </div>
                    </div>

                    <div className={"p-2"}>
                        <SingleRadarChart frameResult={frameResult}/>
                    </div>

                    <AccordionOwas result={frameResult} updateResults={updateResults}/>
                </div>
            </div>
        </>
    );
}

export default OwasImageResultsTab;