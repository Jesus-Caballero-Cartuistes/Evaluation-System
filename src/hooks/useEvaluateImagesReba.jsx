import {useState} from "react";
import {useToast} from "./use-toast";
import {ToastAction} from "../components/ui/toast";
import {evaluateImagesReba} from "../services/apiEvalService";


const useEvaluateImagesReba = ({contextResult}) => {
    const [loading, setLoading] = useState(false); // Para manejar el estado de carga
    const [result, setResult] = useState(contextResult || null); // Para almacenar el resultado de la evaluación
    const [error, setError] = useState(null); // Para manejar posibles errores
    const { toast } = useToast()

    const evaluateImages = async (files, load, gripQuality) => {
        setLoading(true); // Empieza la carga
        setError(null); // Reinicia el error en cada nueva evaluación

        try {
            const data = await evaluateImagesReba(files, load, gripQuality); // Llama al servicio API
            setResult(data); // Guarda los resultados de la evaluación
            toast({
                title: "Reporte de evaluación:",
                description: "¡Informe evaluado exitosamente!",
                variant: "success",
                action: <ToastAction altText="Ok">Ok</ToastAction>
            });
        } catch (err) {
            setError('Error al evaluar las imágenes Reba.'); // Guarda el error si hay uno
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
        evaluateImages
    };
};

export default useEvaluateImagesReba;