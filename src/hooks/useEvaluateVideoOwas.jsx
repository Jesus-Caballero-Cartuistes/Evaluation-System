import {useState} from 'react';
import {useToast} from "./use-toast";
import {ToastAction} from "../components/ui/toast";
import {evaluateVideoOwas, evaluateVideoOwasURL} from "../services/apiEvalService"; // Asumiendo que evaluateVideoOwas está en apiAuthService.js

const useEvaluateVideoOwas = ({contextResult}) => {
    const [loading, setLoading] = useState(false); // Para manejar el estado de carga
    const [result, setResult] = useState(contextResult || null); // Para almacenar el resultado de la evaluación
    const [error, setError] = useState(null); // Para manejar posibles errores
    const { toast } = useToast()

    const evaluateVideo = async (file, load, start_time, end_time) => {
        setLoading(true); // Empieza la carga
        setError(null); // Reinicia el error en cada nueva evaluación

        try {
            const data = await evaluateVideoOwas(file, load, start_time, end_time); // Llama al servicio API
            setResult(data); // Guarda el resultado de la evaluación
            toast({
                title: "Reporte de evaluación:",
                description: "¡Informe evaluado exitosamente!",
                variant: "success",
                action: <ToastAction altText="Ok">Ok</ToastAction>
            });
        } catch (err) {
            console.error('Error evaluando el video Owas:', error);
            setError('Error al evaluar el video Owas.'); // Guarda el error si hay uno
            toast({
                title: "Error",
                description: "Hubo un problema al procesar la evaluación del video.",
                variant: "destructive", // Esto puede resaltar el error con un color rojo o similar
            });
        } finally {
            setLoading(false); // Termina la carga
        }
    };

    const evaluateVideoURL = async (url, load, start_time, end_time) => {
        setLoading(true); // Empieza la carga
        setError(null); // Reinicia el error en cada nueva evaluación

        try {
            const data = await evaluateVideoOwasURL(url, load, start_time, end_time); // Llama al servicio API
            setResult(data); // Guarda el resultado de la evaluación
            toast({
                title: "Reporte de evaluación:",
                description: "¡Informe evaluado exitosamente!",
                variant: "success",
                action: <ToastAction altText="Ok">Ok</ToastAction>
            });
        } catch (err) {
            console.error('Error evaluando el video Owas:', error);
            setError('Error al evaluar el video Owas.'); // Guarda el error si hay uno
            toast({
                title: "Error",
                description: "Hubo un problema al procesar la evaluación del video.",
                variant: "destructive", // Esto puede resaltar el error con un color rojo o similar
            });
        } finally {
            setLoading(false); // Termina la carga
        }
    };

    return {
        loading,
        result,
        setResult,
        error,
        evaluateVideo,
        evaluateVideoURL
    };
};

export default useEvaluateVideoOwas;
