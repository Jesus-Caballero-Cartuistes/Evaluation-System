import {CardContent, CardDescription, CardHeader, CardTitle} from "../../ui/card";
import {Label} from "../../ui/label";
import {Input} from "../../ui/input";
import {Textarea} from "../../ui/textarea";
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
import {Button} from "../../ui/button";
import {Upload, X} from "lucide-react";
import MediaGrid from "../general/MediaGrid";
import React from "react";

export default function OwasInfoVideoTab({
                             isEditableVideo,
                             taskName,
                             setTaskName,
                             taskDescription,
                             setTaskDescription,
                             load,
                             setLoad,
                             videoFile,
                             startTime,
                             setStartTime,
                             endTime,
                             setEndTime,
                             duration,
                             handleVideoUpload,
                             removeVideo,
                             videoRef
                         }) {

    return (
        <div className=" lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:gap-4">
            <div className="min-w-fit">
                <CardHeader>
                    <CardTitle>Tarea con Video</CardTitle>
                    <CardDescription>
                        Define una tarea usando un video.
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
                </CardContent>
            </div>
            <div className={"p-5"}>
            {videoFile && videoFile.url && (
                    <>
                        {isEditableVideo && (

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button size="icon" variant="destructive">
                                        <X className="h-4 w-4"/>
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
                                        <AlertDialogAction onClick={removeVideo}>
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                        <MediaGrid setEndTime={setEndTime}
                                   setStartTime={setStartTime}
                                   url={videoFile.url}
                                   duration={duration}
                                   startTime={startTime}
                                   endTime={endTime}
                                   videoRef={videoRef}
                        />
                    </>)}
                {!videoFile && (
                    <div className="flex items-center space-x-2">
                        <Input
                            id="video-upload"
                            type="file"
                            accept="video/*"
                            onChange={handleVideoUpload}
                            className="flex-grow"
                        />
                        <Button size="icon">
                            <Upload className="h-4 w-4"/>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}