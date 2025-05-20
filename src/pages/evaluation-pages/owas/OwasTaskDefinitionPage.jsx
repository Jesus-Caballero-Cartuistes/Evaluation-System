import React, {Fragment, useEffect, useRef, useState} from 'react';
import OwasImageTask from "../../../components/evaluation-components/owas/OwasImageTask";
import {CirclePlus, Play} from 'lucide-react';
import {Button} from "../../../components/ui/button";
import {Card,} from "../../../components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "../../../components/ui/tabs"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../../components/ui/sheet"
import OwasVideoTask from "../../../components/evaluation-components/owas/OwasVideoTask";
import {useOwasContext} from "../../../context/OwasContext";
import OwasInfoVideoTab from "../../../components/evaluation-components/owas/OwasInfoVideoTab";
import OwasInfoImageTab from "../../../components/evaluation-components/owas/OwasInfoImageTab";

export default function OwasTaskDefinitionPage() {

    const taskRefs = useRef([]);

    // General task inputs
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [load, setLoad] = useState(0);


    // Video task inputs
    const [videoFile, setVideoFile] = useState(null);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Image task inputs
    const [images, setImages] = useState([]);


    // functions for video

    const videoRef = useRef(null);

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);

            // Revocar la URL anterior para evitar acumulación de objetos
            if (videoFile?.url) {
                URL.revokeObjectURL(videoFile.url);
            }

            const videoData = {
                file,
                name: file.name,  // Almacenar el nombre del archivo
                type: file.type,  // Almacenar el tipo del archivo
                url,              // Almacenar la URL generada
            };

            // Actualizar el estado con el nuevo archivo y URL
            setVideoFile(videoData);
        }
    };

    const removeVideo = () => {
        setVideoFile(null);
    }

    useEffect(() => {
        if (videoRef.current) {
            const videoElement = videoRef.current;

            const handleMetadata = () => {
                // Redondear la duración y asignar el valor a endTime
                const durationInSeconds = Math.floor(videoElement.duration);
                setStartTime(0); // Establecer el startTime en 0
                setDuration(durationInSeconds);
                setEndTime(durationInSeconds); // Establecer el endTime como la duración redondeada
            };

            videoElement.addEventListener('loadedmetadata', handleMetadata);

            return () => {
                videoElement.removeEventListener('loadedmetadata', handleMetadata);
                // URL.revokeObjectURL(videoFile.url);
            };
        }
    }, [videoFile]);

    // functions for images

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

    // functions for components
    const {components, setComponents, componentsCount, setComponentsCount} = useOwasContext();

    // Función para actualizar las referencias
    const addComponentRef = (index, el) => {
        taskRefs.current[index] = el;  // Simplemente actualizamos el arreglo
    };

    const addComponent = (type) => {
        const key = componentsCount;
        setComponentsCount(componentsCount => componentsCount + 1);
        console.log(key)

        if (type === "video") {
            setComponents([...components, {
                id: key,
                isEvaluated: false,
                type: type,
                // Editable fields ~~~~~~~~~~~~~~~~
                taskName: taskName,
                taskDescription: taskDescription,
                load: load,
                // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                startTime: startTime,
                endTime: endTime,
                videoFile: videoFile,
                duration: duration,
                firstFrame: null,
                contextResult: null,
            }]);
        }
        if (type === "image") {
            setComponents([...components, {
                id: key,
                isEvaluated: false,
                type: type,
                // Editable fields ~~~~~~~~~~~~~~~~
                taskName: taskName,
                taskDescription: taskDescription,
                load: load,
                // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                images: images,
                contextResult: null,
            }
            ]);
            setImages([]);
        }
        setStartTime(0);
        setEndTime(duration);
        setTaskName("");
        setTaskDescription("");
        setLoad(0);
    };

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

    const removeComponent = (id) => {
        setComponents(components => components.filter((component) => component.id !== id));
    }

    const evaluarTodas = async () => {
        // Recorre cada referencia en taskRefs.current
        for (const taskRef of taskRefs.current) {
            if (taskRef && taskRef.evaluar) {
                try {
                    // Espera a que la función evaluar de cada tarea se resuelva antes de continuar
                    await taskRef.evaluar();
                    console.log('Tarea evaluada correctamente');
                } catch (error) {
                    // Maneja el error si la evaluación de alguna tarea falla
                    console.error('Error al evaluar la tarea:', error);
                    break; // Si hay un error, puedes decidir detener el ciclo o continuar
                }
            }
        }
    };

    return (
        <div>
            <div className={"flex"}>
                <Sheet>
                    <h1 className={"text-3xl font-bold italic m-5"}>
                        Evaluación OWAS
                    </h1>
                    <SheetTrigger asChild>
                        <Button className="m-5">
                            <CirclePlus color={"#f5c105"}/> Crear nueva tarea
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>Crear Tarea</SheetTitle>
                            <SheetDescription>
                                Define la tarea desempeñada por el trabajador usando imagenes o video.
                            </SheetDescription>
                        </SheetHeader>
                        <Tabs defaultValue="video" className="w-full ">

                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="video">Video</TabsTrigger>
                                <TabsTrigger value="imagenes">Imágenes</TabsTrigger>
                            </TabsList>

                            {/*TabsContent for video*/}
                            <TabsContent value="video">
                                <Card className={"p-3"}>
                                    <OwasInfoVideoTab isEditableVideo={true}
                                                      taskName={taskName}
                                                      setTaskName={setTaskName}
                                                      taskDescription={taskDescription}
                                                      setTaskDescription={setTaskDescription}
                                                      load={load}
                                                      setLoad={setLoad}
                                                      videoFile={videoFile}
                                                      startTime={startTime}
                                                      setStartTime={setStartTime}
                                                      endTime={endTime}
                                                      setEndTime={setEndTime}
                                                      duration={duration}
                                                      handleVideoUpload={handleVideoUpload}
                                                      removeVideo={removeVideo}
                                                      videoRef={videoRef}
                                    />
                                    <SheetFooter className="sm:justify-start ps-5">
                                        <SheetClose asChild>
                                            <Button
                                                onClick={videoFile ? () => addComponent("video") : undefined}
                                                disabled={!videoFile} // Deshabilita el botón si no hay archivo de video
                                            >
                                                Agregar Tarea
                                            </Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </Card>
                            </TabsContent>

                            {/*TabsContent for images*/}
                            <TabsContent value="imagenes">
                                <Card>
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
                                    <SheetFooter className="sm:justify-start p-5">
                                        {images[0] && (
                                            <SheetClose>
                                                <Button asChild>
                                                    <div onClick={() => addComponent("image")}>Agregar
                                                        Tarea
                                                    </div>
                                                </Button>
                                            </SheetClose>
                                        )}
                                        {!images[0] && (
                                            <SheetClose asChild>
                                                <Button disabled>
                                                    Agregar Tarea
                                                </Button>
                                            </SheetClose>
                                        )}
                                    </SheetFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </SheetContent>
                </Sheet>

                {components.length > 1 && (
                    <>
                        <span className={"grow"}></span>
                        <div className="flex justify-center items-center px-5">
                            <Button onClick={evaluarTodas}>
                                <>Evaluacion General<Play fill={"#f5c105"} color={"#f5c105"}/></>
                            </Button>
                        </div>
                    </>
                )}
            </div>
            <div className="flex flex-wrap">
                {/*Render the components*/}
                {components.map((component) => {
                    if (component.type === 'video') {
                        return (
                            <OwasVideoTask key={component.id}
                                           component={component}
                                           handleVideoUpload={handleVideoUpload}
                                           removeComponent={removeComponent}
                                           ref={(el) => addComponentRef(component.id, el)}
                                           updateComponent={updateComponent}
                            />
                        );
                    } else if (component.type === 'image') {
                        return (
                            <OwasImageTask key={component.id}
                                           component={component}
                                           removeComponent={removeComponent}
                                           ref={(el) => addComponentRef(component.id, el)}
                                           updateComponent={updateComponent}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}