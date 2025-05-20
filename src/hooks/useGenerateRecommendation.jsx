import {useState} from "react";

import {generateErgonomistRecommendation} from "../services/apiEvalService";

const useGenerateRecommendation = () => {
    const [loading, setLoading] = useState(false); // Para manejar el estado de carga
    const [result, setResult] = useState(null); // Para almacenar el resultado de la recomendación
    const [error, setError] = useState(null); // Para manejar posibles errores

    const generateResponse = async (prompt) => {
        setLoading(true); // Empieza la carga
        setError(null); // Reinicia el error en cada nueva evaluación

        try {
            const data = await generateErgonomistRecommendation(prompt); // Llama al servicio API para obtener la recomendación
            setResult(data); // Guarda el resultado de la recomendación
        } catch (err) {
            setError('Error al generar la recomendación ergonómica.'); // Guarda el error si hay uno
        } finally {
            setLoading(false); // Termina la carga
        }
    };

    return {
        loading,
        result,
        error,
        generateResponse
    };
};

export default useGenerateRecommendation;