import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "../../ui/card"
import {Grip, Loader2, Package, Play, Settings, Trash2} from 'lucide-react';
import {Button} from "../../ui/button"
import {Input} from "../../ui/input"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../ui/sheet"
import useEvaluateImagesOwas from "../../../hooks/useEvaluateImagesOwas";
import ImageCarousel from "../general/ImageCarousel";
import OwasImageResultsTab from "./OwasImageResultsTab";
import OwasInfoImageTab from "./OwasInfoImageTab";
import {owasTables} from "../../../tables/owasTables";
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


function OwasImageTask({
                           component,
                           removeComponent,
                           updateComponent
                       }, ref) {

    const [taskName, setTaskName] = useState(component.taskName);
    const [taskDescription, setTaskDescription] = useState(component.taskDescription);
    const [load, setLoad] = useState(component.load);
    const [images, setImages] = useState(component.images);

    const [currentImageName, setCurrentImageName] = useState(images[0]?.name)

    const {
        loading,
        result,
        setResult,
        error,
        evaluateImages
    } = useEvaluateImagesOwas({contextResult: component.contextResult});

    const calculateMinConfidence = (result) => {
        if (result === null) {
            return -1;
        }
        let minConfidence = 2;
        for (const key in result) {
            if (result[key].Analysis.Owas.risk.confidence < minConfidence) {
                minConfidence = result[key].Analysis.Owas.risk.confidence;
            }
        }
        return minConfidence;
    }

    const [confidence, setConfidence] = useState(calculateMinConfidence(result));


    const handleSubmit = async (event) => {
        if (images) {
            await evaluateImages(component.images, component.load); // Llama al hook para evaluar las imágenes
        }
    };

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
        if (result) {
            updateComponent(component.id, {contextResult: result, isEvaluated: true});
            setConfidence(calculateMinConfidence(result));
            console.log(result);
        }
    }, [result]);

    const handleImageChange = (e) => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files).map((file) => ({
                id: Math.random().toString(36).substr(2, 9),
                name: file.name,
                file,
                preview: URL.createObjectURL(file),
            }));
            setImages((prevImages) => [...prevImages, ...newImages]);
        }
    };

    const moveImage = (index, direction) => {
        const newImages = [...images];
        const newIndex = direction === 'up' ? index - 1 : index + 1;

        if (newIndex >= 0 && newIndex < images.length) {
            [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
            setImages(newImages);
        }
    };

    const removeImage = (id) => {
        setImages(images.filter((image) => image.id !== id));
    };

    return (
        <div className="p-5 flex">
            <Card className=" w-[400px] max-w-md overflow-hidden transition-all hover:shadow-md">
                <div className="relative h-48 w-full bg-gradient-to-r from-gray-700 via-transparent to-gray-700">
                    <div className="w-auto h-full">
                        {images[0] && <ImageCarousel images={images}
                                                     currentImageName={currentImageName}
                                                     setCurrentImageName={setCurrentImageName}/>}
                    </div>
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
                    <div className={"space-x-2 flex flex-grow"}>
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
                                        Define la tarea desempeñada por el trabajador usando imagenes.
                                    </SheetDescription>
                                </SheetHeader>
                                <OwasInfoImageTab taskName={taskName}
                                                  setTaskName={setTaskName}
                                                  taskDescription={taskDescription}
                                                  setTaskDescription={setTaskDescription}
                                                  load={load}
                                                  setLoad={setLoad}
                                                  images={images}
                                                  handleImageChange={handleImageChange}
                                                  moveImage={moveImage}
                                                  removeImage={removeImage}
                                />
                                <SheetFooter className="sm:justify-start ps-5">
                                    {images[0] && (
                                        <SheetClose asChild>
                                            <Button
                                                onClick={() => updateComponent(component.id,
                                                    {
                                                        taskName: taskName,
                                                        taskDescription: taskDescription,
                                                        load: load,
                                                        images: images,
                                                    }
                                                )
                                                }
                                                type="submit">Actualizar Tarea </Button>
                                        </SheetClose>
                                    )}
                                    {!images[0] && (
                                        <SheetClose asChild>
                                            <Button disabled type="submit">Actualizar Tarea </Button>
                                        </SheetClose>
                                    )}
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive"
                                        className={"w-full flex-grow"}
                                >
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
                    <div className={" flex "}>
                        {!result && (
                            <Button className="m-5"
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
                                    <Button className="m-5">
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
                                    <OwasImageResultsTab images={images}
                                                         result={result}
                                                         setResult={setResult}
                                                         currentImageName={currentImageName}
                                                         setCurrentImageName={setCurrentImageName}
                                    />
                                </SheetContent>
                            </Sheet>
                            </>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default forwardRef(OwasImageTask)