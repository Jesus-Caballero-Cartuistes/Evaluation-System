import {useState} from "react";
import {registerUser} from "../services/apiAuthService";

export const useRegister = () => {
    const [loading, setLoading] = useState(false); // Para manejar el estado de carga
    const [error, setError] = useState(null); // Para manejar posibles errores
    const [result, setResult] = useState(null); // Para manejar el usuario

    const register = async (username, password, email, rol) => {
        setLoading(true); // Empieza la carga
        setError(null); // Reinicia el error en cada nuevo registro

        try {
            const data = await registerUser(username, password, email, rol); // Llama al servicio API
            setResult(data); // Guarda el usuario
        } catch (err) {
            setError('Error al registrar usuario.'); // Guarda el error si hay uno
        } finally {
            setLoading(false); // Termina la carga
        }
    }

    return {
        loading,
        result,
        error,
        register
    }
}