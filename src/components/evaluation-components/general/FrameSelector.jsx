import React, {useEffect, useState} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '../../ui/select';
import {Label} from '../../ui/label';

function FrameSelector({ duration, setFrames }) {
    const [frameOptions, setFrameOptions] = useState([]);

    useEffect(() => {
        const generateFrameOptions = () => {
            if (duration === 0) {
                return;
            }
            const options = [];
            const step = Math.floor(duration / 2); // Adjust the number of options as needed
            for (let i = step; i <= duration; i += step) {
                options.push(i);
            }
            setFrameOptions(options);
        };

        generateFrameOptions();
    }, [duration]);

    const handleFrameChange = (value) => {
        setFrames(value);
    };

    return (
        <div>
            <Label htmlFor="frames">Número de Frames</Label>
            <Select id="frames" onValueChange={handleFrameChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecciona el número de frames" />
                </SelectTrigger>
                <SelectContent>
                    {frameOptions.map((option, index) => (
                        <SelectItem key={index} value={option.toString()}>{option}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

export default FrameSelector;