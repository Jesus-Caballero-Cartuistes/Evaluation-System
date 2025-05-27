import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "../../ui/card"
import {Clock, Grip, Loader2, Package, Play, Settings, Trash2} from 'lucide-react';
import {Button} from "../../ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "../../ui/sheet";
import useEvaluateVideoOwas from "../../../hooks/useEvaluateVideoOwas";
import OwasVideoResultsTab from "./OwasVideoResultsTab";
import OwasInfoVideoTab from "./OwasInfoVideoTab";
import {TooltipConfidence} from "../general/TooltipConfidence";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "../../ui/alert-dialog";
import {Badge} from "../../ui/badge";
import {useUpload} from "../../../hooks/useUpload";

function OwasVideoTask({
                           component,
                           handleVideoUpload,
                           removeComponent,
                           updateComponent
                       }, ref) {

    const {
        loading,
        result,
        setResult,
        error,
        evaluateVideo,
        evaluateVideoURL
    } = useEvaluateVideoOwas({contextResult: component.contextResult});

    const {
        loading: loadingUpload,
        error: errorUpload,
        requestUploadUrl,
        requestDownloadUrl,
        removeFile,
        uploadFile
    } = useUpload();

    const calculateMinConfidence = (result) => {
        if (result === null) {
            return -1;
        }
        let confidence = 2;
        for (const frameKey in result.Analysis) {
            if (result["Analysis"][frameKey]["Owas"].risk.confidence < confidence) {
                confidence = result["Analysis"][frameKey]["Owas"].risk.confidence
            }
        }
        return confidence;
    }

    const [confidence, setConfidence] = useState(calculateMinConfidence(result));

    const [taskName, setTaskName] = useState(component.taskName);
    const [taskDescription, setTaskDescription] = useState(component.taskDescription);
    const [load, setLoad] = useState(component.load);

    const [videoStartTime, setVideoStartTime] = useState(component.startTime);
    const [videoEndTime, setVideoEndTime] = useState(component.endTime);

    const videoRef = useRef(null);
    const videoRef2 = useRef(null);
    const canvasRef = useRef(null);



    const captureFirstFrame = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Establecer las dimensiones del canvas igual al video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Dibujar el frame actual del video en el canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        updateComponent(component.id, {firstFrame: canvas.toDataURL('image/webp', 0.7)});
    };

    const isEqual = (frameKey1, frameKey2) => {
        const risk1 = result.Analysis[frameKey1].Owas.risk.value;
        const risk2 = result.Analysis[frameKey2].Owas.risk.value;
        const legs1 = result.Analysis[frameKey1].Owas.legs.value;
        const legs2 = result.Analysis[frameKey2].Owas.legs.value;
        const arms1 = result.Analysis[frameKey1].Owas.arms.value;
        const arms2 = result.Analysis[frameKey2].Owas.arms.value;
        const back1 = result.Analysis[frameKey1].Owas.back.value;
        const back2 = result.Analysis[frameKey2].Owas.back.value;

        return risk1 === risk2 && legs1 === legs2 && arms1 === arms2 && back1 === back2;
    }

    // Función para capturar la imagen de un frame
    const captureFrameImage = async (frame, video, canvas, ctx) => {
        // Establecer las dimensiones del canvas igual al video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Esperar a que el tiempo se actualice antes de dibujar el frame
        await new Promise(resolve => {
            const onTimeUpdate = () => {
                // Asegurarse de que estamos en el tiempo adecuado
                if (Math.abs(video.currentTime - frame.timestamp) < 0.1) {
                    // Dibujar el frame actual del video en el canvas
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    frame.image = canvas.toDataURL('image/webp', 0.7); // Almacenar la imagen

                    // Limpiar el listener una vez que capturamos el frame
                    video.removeEventListener('timeupdate', onTimeUpdate);
                    resolve(); // Resolvemos la promesa cuando se haya capturado el frame
                }
            };

            // Añadir el listener de timeupdate
            video.addEventListener('timeupdate', onTimeUpdate);
        });
    };

    // Función para capturar los frames críticos
    const captureCriticalFrames = async () => {
        // Crear un array para almacenar todos los frames con su valor de riesgo
        let frames = [];
        let previousFrame = null;

        // Recorrer los frames para extraer los datos relevantes
        for (const frameKey in result.Analysis) {
            const frameData = result.Analysis[frameKey];
            const riskValue = frameData.Owas.risk.value;

            if ((previousFrame === null) || !(isEqual(previousFrame, frameKey))) {
                frames.push({
                    frame: frameKey,  // Extraer el número del frame
                    timestamp: frameData.TimesTamp,
                    risk: riskValue
                });
            }
            previousFrame = frameKey;
        }

        // Ordenar los frames en orden descendente por el valor de riesgo
        frames.sort((a, b) => b.risk - a.risk);

        // Obtener solo los 3 frames con mayor riesgo (top 3)
        const topRiskFrames = frames.slice(0, 3);

        // Capturar las imágenes de los frames de mayor riesgo
        for (const frame of topRiskFrames) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            // Establecer el tiempo del video para capturar el frame
            video.currentTime = frame.timestamp;

            // Usar async/await para capturar la imagen del frame
            await captureFrameImage(frame, video, canvas, ctx);
        }

        // Actualizar el componente con los nuevos frames de riesgo crítico
        updateComponent(component.id, {criticalFrames: topRiskFrames});

        // Volver al tiempo de inicio original del video
        videoRef.current.currentTime = component.startTime;
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

    const handleSubmit = async () => {
        if (component.videoFile && component.videoFile.url) {
            // try {
            //     await evaluateVideo(component.videoFile.file, component.load, component.startTime, component.endTime);
            //     captureFirstFrame();
            // } catch (error) {
            //     console.error('Error al evaluar la tarea:', error);
            // }

            const extension = component.videoFile.file.name.split('.').pop();
            const fileType = component.videoFile.file.type.startsWith('video') ? 'video' : 'image';

            try {
                // Paso 1: Obtener URL de subida
                const { upload_url, public_url, s3_key } = await requestUploadUrl(fileType, extension);
                if (!upload_url) throw new Error("No se pudo obtener el URL de subida.");
                console.log('upload_url:', upload_url);
                console.log('public_url:', public_url);
                console.log('s3_key:', s3_key);

                // Paso 2: Subir archivo a S3
                await uploadFile(upload_url, component.videoFile.file);

                // Paso 3: Obtener URL de descarga
                const downloadUrl = await requestDownloadUrl(s3_key);
                if (!downloadUrl) throw new Error("No se pudo obtener el URL de descarga.");
                console.log('download_url:', downloadUrl["download_url"]);

                // Paso 4: Evaluar el video
                await evaluateVideoURL(downloadUrl["download_url"], component.load, component.startTime, component.endTime);
                captureFirstFrame();

                // Paso 5: Eliminar el archivo de S3
                await removeFile(s3_key);
                console.log('Archivo eliminado de S3:', s3_key);

            } catch (err) {
                console.error("Error en el flujo de carga y evaluación:", err);
            }

        }
    }

    // Exponer la función evaluar a través de la referencia
    useImperativeHandle(ref, () => ({
        evaluar: () => {
            if (!result) {
                handleSubmit()
            } else {
                console.log(`Ya se evaluó esta tarea ${component.id}`)
            }
        },
    }));

    // useEffect para manejar el cambio en result
    useEffect(() => {
        if (result && !component.criticalFrames) {
            captureCriticalFrames();
            console.log('Frames críticos capturados');
        }
        if (result) {
            updateComponent(component.id, {contextResult: result, isEvaluated: true});
            setConfidence(calculateMinConfidence(result));
        }
    }, [result]);

    const findEndFrame = () => {
        const frames = Object.keys(result.Analysis);
        return `Frame ${frames.length}` ;
    };

    return (
        <div className="p-5 flex">
            <Card className="w-full min-w-[400px] max-w-md overflow-hidden transition-all hover:shadow-md">
                <div className="relative h-48 w-full bg-gradient-to-r from-gray-700 via-transparent to-gray-700">
                    <video className="object-contain h-full w-full" ref={videoRef}>
                        <source src={component.videoFile.url} type={component.videoFile.type}/>
                    </video>
                </div>

                <CardHeader>
                    <CardTitle className="text-xl font-bold">{taskName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{taskDescription}</p>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground"/>
                            <span className="text-sm font-medium">Carga: {load}</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className={"border-t"}>
                    <div className="flex flex-col items-start gap-2 pt-4">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground"/>
                            <span className="text-sm">Inicio: {formatTime(videoStartTime)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground"/>
                            <span className="text-sm">Final: {formatTime(videoEndTime)}</span>
                        </div>
                    </div>
                    <span className={"flex-grow"}></span>
                    <div className={" pt-4 flex flex-col"}>
                        {!result && (
                            <Button className=""
                                    onClick={(handleSubmit)}
                                    disabled={loading}
                            >
                                {loading ? <Loader2 className="animate-spin"/> : <>Evaluar video<Play fill={"#f5c105"}
                                                                                                      color={"#f5c105"}/></>}
                            </Button>
                        )}
                        {result && (
                            <>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button className="">
                                            Ver resultados
                                            <TooltipConfidence confidence={confidence}/>
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent className="overflow-y-auto h-full" side="bottom">
                                        <SheetHeader className={"border-b mb-2"}>
                                            <SheetTitle>
                                                Resultados de la evaluación
                                            </SheetTitle>
                                        </SheetHeader>
                                        <OwasVideoResultsTab id={component.id}
                                                             videoUrl={component.videoFile.url}
                                                             result={result}
                                                             setResult={setResult}
                                                             startFrame={"Frame 1"}
                                                             endFrame={findEndFrame()}
                                                             endTime={component.endTime}
                                        />
                                    </SheetContent>
                                </Sheet>
                            </>
                        )}
                        <div className="flex  items-start gap-2 pt-4">
                            <Sheet>
                                {/*Enable setting while task hasn't been evaluated*/}
                                <SheetTrigger asChild>
                                    {!result && (
                                        <Button variant="outline" className={"w-full"}>
                                            <Settings/>
                                        </Button>
                                    )}
                                </SheetTrigger>
                                <SheetContent className="overflow-y-auto">
                                    <SheetHeader>
                                        <SheetTitle>Actualizar Tarea</SheetTitle>
                                        <SheetDescription>
                                            Define la tarea desempeñada por el trabajador usando un video.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <OwasInfoVideoTab isEditableVideo={false}
                                                      taskName={taskName}
                                                      setTaskName={setTaskName}
                                                      taskDescription={taskDescription}
                                                      setTaskDescription={setTaskDescription}
                                                      load={load}
                                                      setLoad={setLoad}
                                                      videoFile={component.videoFile}
                                                      startTime={videoStartTime}
                                                      setStartTime={setVideoStartTime}
                                                      endTime={videoEndTime}
                                                      setEndTime={setVideoEndTime}
                                                      duration={component.duration}
                                                      handleVideoUpload={handleVideoUpload}
                                                      videoRef={videoRef2}
                                    />
                                    <SheetFooter className="sm:justify-start ps-5">
                                        <SheetClose asChild>
                                            <Button
                                                onClick={() => updateComponent(component.id,
                                                    {
                                                        taskName: taskName,
                                                        taskDescription: taskDescription,
                                                        load: load,
                                                        startTime: videoStartTime,
                                                        endTime: videoEndTime
                                                    }
                                                )}
                                                type="submit">Actualizar Tarea </Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" className={"w-full"}>
                                        <Trash2/>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete
                                            all
                                            tasks related to your video.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => removeComponent(component.id)}>
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </CardFooter>
            </Card>
            <canvas ref={canvasRef} style={{display: 'none'}}/>
        </div>
    )
}

export default forwardRef(OwasVideoTask)
