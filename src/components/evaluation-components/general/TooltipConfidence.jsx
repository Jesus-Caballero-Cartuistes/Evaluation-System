import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../../ui/tooltip";
import {Button} from "../../ui/button";
import {CircleAlert, CircleCheckBig} from "lucide-react";
import React from "react";

export function TooltipConfidence({confidence}) {
    return (
        <>
            {confidence === 2 && (
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Button variant="green" className={"h-1"} size="icon">
                                <CircleCheckBig color={"#2caf3b"}/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                                Los resultados de la evaluación son confiables
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
            {confidence === 1 && (
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Button variant="orange" className={"h-1"} size="icon">
                                <CircleAlert color={"#f7b500"}/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                                Hay cierta incertidumbre en los resultados
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
            {confidence === 0 && (
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Button variant="red" className={"h-1"} size="icon">
                                <CircleAlert color={"#f70000"}/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                                Hay ocultamientos en los resultados
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </>
    )
}