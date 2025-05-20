import * as React from "react";
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {Link, useLocation} from 'react-router-dom';

import {Button} from "./ui/button";
import {Progress} from "./ui/progress";


export default function EvaluationBar({steps}) {
    const location = useLocation();
    const pathname = location.pathname;
    {console.log(pathname)}
    const currentStepIndex = steps.findIndex(step => pathname.endsWith(step.path));

    const progress = ((currentStepIndex + 1) / steps.length) * 100;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
            <div className="container mx-auto px-4 py-2">
                <Progress value={progress} className="mb-2" />
                <div className="flex items-center justify-between">
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                        disabled={currentStepIndex === 0}
                    >
                        <Link to={currentStepIndex > 0 ? steps[currentStepIndex - 1].path : '#'}>
                            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                        </Link>
                    </Button>
                    <div className="flex space-x-4">
                        {steps.map((step, index) => {
                            const StepIcon = step.icon;
                            return (
                                <Link
                                    key={step.id}
                                    to={step.path}
                                    className={`flex items-center ${
                                        index === currentStepIndex ? 'text-primary' : 'text-muted-foreground'
                                    }`}
                                >
                                    <StepIcon className="h-5 w-5 mr-1" />
                                    <span className="text-sm font-medium hidden sm:inline">{step.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                        disabled={currentStepIndex === steps.length - 1}
                    >
                        <Link to={currentStepIndex < steps.length - 1 ? steps[currentStepIndex + 1].path : '#'}>
                            Next <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}