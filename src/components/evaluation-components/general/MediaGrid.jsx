import {Pause, Play} from "lucide-react"
import React, {useState} from 'react';
import {Input} from "../../ui/input";
import {Button} from "../../ui/button";
import {Slider} from "../../ui/slider";

const MediaGrid = ({
                       endTime,
                       setEndTime,
                       startTime,
                       setStartTime,
                       url,
                       duration,
                       videoRef
                   }) => {

    const [isPlaying, setIsPlaying] = useState(false);

    // Actualiza el rango de inicio
    const handleStartTimeChange = (value) => {
        const newStart = value[0];
        if (newStart < endTime) {
            setStartTime(newStart);
            if (videoRef.current) {
                videoRef.current.currentTime = newStart; // Establece el tiempo actual al nuevo inicio
            }
        }
    };

    // Actualiza el rango de fin
    const handleEndTimeChange = (value) => {
        const newEnd = value[0];
        if (newEnd > startTime) {
            setEndTime(newEnd);
        }
    };

    // Reproducir el video entre los tiempos seleccionados


    const handlePlayPause = () => {
        const video = videoRef.current
        if (!video) return

        if (isPlaying) {
            video.pause()
        } else {
            video.currentTime = startTime;
            video.play()
        }
        setIsPlaying(!isPlaying)
    }

    // Detener el video cuando se alcanza el final del rango
    const handleTimeUpdate = () => {
        if (videoRef.current && videoRef.current.currentTime >= endTime) {
            videoRef.current.pause();
        }
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600); // Obtener las horas
        const minutes = Math.floor((seconds % 3600) / 60); // Obtener los minutos
        const remainingSeconds = Math.floor(seconds % 60); // Obtener los segundos restantes
        const milliseconds = Math.floor((seconds % 1) * 1000); // Obtener los milisegundos

        // Formatear a dos dígitos con ceros a la izquierda para horas, minutos y segundos
        // Formatear a tres dígitos con ceros a la izquierda para milisegundos
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
    };

    return (
        <div className="max-w-md ">
            <div className="h-[300px] ">
                <video
                    className="object-contain h-full"
                    ref={videoRef}
                    id="myVideo"
                    controls
                    onTimeUpdate={handleTimeUpdate}
                >
                    <source src={url} type="video/mp4"/>
                    Tu navegador no soporta el elemento de video.
                </video>
            </div>

            <div className="flex items-center space-x-2 pt-2">
                <Button onClick={handlePlayPause} aria-label={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? <Pause className="h-4 w-4"/> : <Play className="h-4 w-4"/>}
                </Button>
                <Input value={formatTime(startTime)} readOnly className="w-24 text-center"
                       aria-label="Current time"/>
                <Input value={formatTime(endTime)} readOnly className="w-24 text-center"
                       aria-label="Total duration"/>
            </div>

            <div className="space-y-2">
                <label htmlFor="start-time" className="text-sm font-medium">
                    Start Time: {formatTime(startTime)}
                </label>
                <Slider
                    id="start-time"
                    min={0}
                    max={duration}
                    step={1}
                    value={[startTime]}
                    onValueChange={handleStartTimeChange}
                    aria-label="Set start time"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="end-time" className="text-sm font-medium">
                    End Time: {formatTime(endTime)}
                </label>
                <Slider
                    id="end-time"
                    min={0}
                    max={duration}
                    step={1}
                    value={[endTime]}
                    onValueChange={handleEndTimeChange}
                    aria-label="Set end time"
                />
            </div>

            {/*<div className="mt-4">*/}
            {/*<div>*/}
            {/*    <label className="block">Inicio (segundos): {startTime}</label>*/}
            {/*    <input*/}
            {/*        type="range"*/}
            {/*        min="0"*/}
            {/*        max={duration}*/}
            {/*        value={startTime}*/}
            {/*        onChange={handleStartTimeChange}*/}
            {/*        className="w-full"*/}
            {/*    />*/}
            {/*</div>*/}

            {/*<div className="mt-2">*/}
            {/*    <label className="block">Fin (segundos): {endTime}</label>*/}
            {/*    <input*/}
            {/*        type="range"*/}
            {/*        min={0}*/}
            {/*        max={duration}*/}
            {/*        value={endTime}*/}
            {/*        onChange={handleEndTimeChange}*/}
            {/*        className="w-full"*/}
            {/*    />*/}
            {/*</div>*/}
            {/*<button*/}
            {/*    onClick={handlePlayVideo}*/}
            {/*    className="mt-4 p-2 bg-blue-500 text-white rounded"*/}
            {/*>*/}
            {/*    Reproducir video*/}
            {/*</button>*/}
            {/*</div>*/}
        </div>
    );
};

export default MediaGrid;
