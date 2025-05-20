import {Button} from "../../ui/button"
import {Separator} from "../../ui/separator"
import {ChevronLeft, ChevronRight, Star} from "lucide-react"
import OwasMultipleLineChart from "../../charts/owas/OwasMultipleLineChart";
import {AccordionOwas} from "./AccordionOwas";
import React, {useEffect, useRef, useState} from 'react';
import OwasSinglePieChart from "../../charts/owas/OwasSinglePieChart";
import SingleRadarChart from "../../charts/SingleRadarChart";
import {useOwasContext} from "../../../context/OwasContext";
import {owasTables} from "../../../tables/owasTables";

function OwasVideoResultsTab({id, videoUrl, startFrame, endFrame, endTime, result, setResult}) {

    const [frame, setFrame] = useState(startFrame);
    const [videoCurrentTime, setVideoCurrentTime] = useState(result["Analysis"][frame]["TimesTamp"]);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [frameResult, setFrameResult] = useState(result["Analysis"][frame]["Owas"]);
    const {savedFrames, setSavedFrames} = useOwasContext();

    useEffect(() => {
        if (videoRef.current) {
            console.log('frame: ' + frame)
            videoRef.current.currentTime = videoCurrentTime;
        }
    }, [videoCurrentTime]);

    const handleTimeUpdate = () => {
        if (videoRef.current && videoRef.current.currentTime >= endTime) {
            videoRef.current.pause();
        }
    };

    const handleNextFrame = () => {
        const nextFrame = `Frame ${parseInt(frame.slice(6)) + 1}`
        console.log('nextFrame: ' + nextFrame);
        setFrame(nextFrame);
    };

    const handlePreviousFrame = () => {
        const previousFrame = `Frame ${parseInt(frame.slice(6)) - 1}`
        setFrame(previousFrame);
    }

    useEffect(() => {
        // Asegurarse de que `frame` tiene el valor más reciente antes de usarlo
        const newVideoStartTime = result["Analysis"][frame]["TimesTamp"];
        setVideoCurrentTime(newVideoStartTime);

        // Usar `currentTime` después de actualizar el estado
        if (videoRef.current) {
            videoRef.current.currentTime = newVideoStartTime;
        }

        console.log('frame: ' + frame + ":" + newVideoStartTime);

        const newFrameResults = result?.Analysis?.[frame]?.Owas;
        if (newFrameResults) {
            setFrameResult(newFrameResults);
        }
    }, [frame, result]);


    // Función para capturar el frame del video
    const captureFrame = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Establecer las dimensiones del canvas igual al video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Dibujar el frame actual del video en el canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Obtener la imagen en formato base64
        return canvas.toDataURL('image/webp', 0.7);
    };

    // Función para guardar/deshacer un frame
    const handleSaveFrame = () => {
        const isFrameSaved = savedFrames[id]?.some(f => f.frame === frame);

        if (isFrameSaved) {
            // If already saved, remove it
            setSavedFrames(prevSavedFrames => ({
                ...prevSavedFrames,
                [id]: prevSavedFrames[id].filter(f => f.frame !== frame)
            }));
        } else {
            // If not saved, add it
            const imageData = captureFrame();
            setSavedFrames(prevSavedFrames => ({
                ...prevSavedFrames,
                [id]: [
                    ...(prevSavedFrames[id] || []),
                    {frame: frame, image: imageData}
                ]
            }));
        }
    };

    const updateResults = (key, value) => {
        setResult(prevState => {
            const newState = {
                ...prevState,
                Analysis: {
                    ...prevState.Analysis,
                    [frame]: {
                        ...prevState.Analysis[frame],
                        Owas: {
                            ...prevState.Analysis[frame].Owas,
                            [key]: {
                                value: value,
                                confidence: 2
                            },
                            ['risk']: {
                                ...prevState.Analysis[frame].Owas.risk,
                                confidence: Math.min(
                                    prevState.Analysis[frame].Owas.legs.confidence,
                                    prevState.Analysis[frame].Owas.arms.confidence,
                                    prevState.Analysis[frame].Owas.back.confidence),
                                value: owasTables[prevState.Analysis[frame].Owas.back.value][prevState.Analysis[frame].Owas.legs.value][prevState.Analysis[frame].Owas.arms.value][prevState.Analysis[frame].Owas.load.value]
                            }
                        }
                    }
                }
            }
            newState.Analysis[frame].Owas.risk.confidence = Math.min(
                newState.Analysis[frame].Owas.legs.confidence,
                newState.Analysis[frame].Owas.arms.confidence,
                newState.Analysis[frame].Owas.back.confidence)
            newState.Analysis[frame].Owas.risk.value = owasTables[newState.Analysis[frame].Owas.back.value][newState.Analysis[frame].Owas.legs.value][newState.Analysis[frame].Owas.arms.value][newState.Analysis[frame].Owas.load.value]

            return newState;
        });
    };

    return (
        <>
            <div className="lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:gap-4">
                <div about={"column 1"}>
                    <div className="flex flex-col justify-center items-center">
                        <div
                            className={"w-full flex justify-center rounded bg-gradient-to-r from-gray-700 via-transparent to-gray-700"}>
                            <div className={"h-[300px]"}>
                                <video
                                    className={"object-contain h-full"}
                                    ref={videoRef}
                                    id="myVideo"
                                    controls
                                    onTimeUpdate={handleTimeUpdate}
                                >
                                    <source src={videoUrl} type="video/mp4"/>
                                    Tu navegador no soporta el elemento de video.
                                </video>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between pt-2">
                        <Button variant="outline" disabled={frame === startFrame}
                                onClick={() => handlePreviousFrame()}>
                            <ChevronLeft/> {`Frame ${parseInt(frame.slice(6)) - 1} `}
                        </Button>
                        <Button onClick={handleSaveFrame}>
                            <Star fill={savedFrames[id]?.some(f => f.frame === frame) ? "#f5c105" : "#000"}/>
                            {savedFrames[id]?.includes(frame) ? 'Unsave Frame' : 'Save Frame'}
                        </Button>
                        <Button variant="outline" disabled={frame === endFrame}
                                onClick={() => handleNextFrame()}>
                            {`Frame ${parseInt(frame.slice(6)) + 1} `} <ChevronRight/>
                        </Button>
                    </div>
                    <div className="h-min">
                        <OwasMultipleLineChart result={result} setFrame={setFrame}/>
                    </div>
                    <div className="flex space-x-2 flex-wrap md:flex-nowrap">
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

                </div>
                <div about={"column 2"}>
                    <div className="flex flex-col h-min">

                        <div className="flex justify-center items-center px-5">
                            <div className="flex border rounded-2xl border-amber-100 px-3 space-x-2">
                                <h1 className="font-bold">Overall Risk Score:</h1>
                                <h1 className="font-bold bg-amber-100 px-3">{frameResult.risk.value}</h1>
                            </div>
                        </div>

                        <div className={"p-5"}>
                            <SingleRadarChart frameResult={frameResult}/>
                        </div>
                        <Separator className="mt-4"/>
                    </div>
                    <div className="div2 h-min">
                        <AccordionOwas result={frameResult} updateResults={updateResults}/>
                    </div>
                </div>


                {/* Canvas oculto para capturar imagen */}
                <canvas ref={canvasRef} style={{display: 'none'}}/>
            </div>
        </>
    );
}

export default OwasVideoResultsTab;