import {CardContent, CardDescription, CardHeader, CardTitle} from "../../ui/card";
import {Label} from "../../ui/label";
import {Input} from "../../ui/input";
import {Textarea} from "../../ui/textarea";
import {Button} from "../../ui/button";
import {ChevronDown, ChevronUp, Upload, X} from "lucide-react";
import React from "react";

export default function OwasInfoImageTab({
                             taskName,
                             setTaskName,
                             taskDescription,
                             setTaskDescription,
                             load,
                             setLoad,
                             images,
                             handleImageChange,
                             moveImage,
                             removeImage
                         }) {
    return (
        <div>
            <CardHeader>
                <CardTitle>Tarea con Imagenes</CardTitle>
                <CardDescription>
                    Define una tarea usando imagenes.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="current">Nombre de la Tarea</Label>
                    <Input id="current" type="text" value={taskName}
                           onChange={(e) => setTaskName(e.target.value)}/>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="new">Descripción de la Tarea</Label>
                    <Textarea id="new" placeholder="Type your message here."
                              value={taskDescription}
                              onChange={(e) => setTaskDescription(e.target.value)}/>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="load">Peso de Carga (Kg)</Label>
                    <Input id="load" placeholder=" " type={"number"} value={load}
                           onChange={(e) => setLoad(e.target.value)}/>
                </div>
                <div>
                    <Label htmlFor="image-upload">Upload Image</Label>
                    <div className="flex items-center space-x-2">
                        <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="flex-grow"
                        />
                        <Button size="icon">
                            <Upload className="h-10 w-10"/>
                        </Button>
                    </div>
                    {images && <p className="mt-2 text-sm">Selected image: {images.name}</p>}
                </div>
                <ul className="space-y-2">
                    {images.map((image, index) => (
                        <li key={image.id} className="flex items-center bg-gray-100 p-2 rounded">
                            <img
                                src={image.preview}
                                alt={`Preview ${index}`}
                                className="w-16 h-16 object-cover mr-2 rounded"
                            />
                            <span className="flex-grow truncate">{image.file.name}</span>
                            <div className="flex flex-col ml-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => moveImage(index, 'up')}
                                    disabled={index === 0}
                                    className="h-8 w-8"
                                >
                                    <ChevronUp className="h-4 w-4"/>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => moveImage(index, 'down')}
                                    disabled={index === images.length - 1}
                                    className="h-8 w-8"
                                >
                                    <ChevronDown className="h-4 w-4"/>
                                </Button>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeImage(image.id)}
                                className="ml-2 text-red-500 hover:text-red-700"
                            >
                                <X className="h-4 w-4"/>
                            </Button>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </div>
    )
}