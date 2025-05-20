import {useState} from "react";
import {loginUser} from "../services/apiAuthService";
import {useMainContext} from "../context/MainContext";

export const useLogin = () => {
    const [loading, setLoading] = useState(false); // Para manejar el estado de carga
    const [token, setToken] = useState( null); // Para almacenar el resultado de la evaluación
    const [error, setError] = useState(null); // Para manejar posibles errores
    const [user, setUser] = useState(null); // Para manejar el usuario
    const [result, setResult] = useState(false); // Para manejar el usuario


    const {user: userContext, setUser: setUserContext, token: tokenContext, setToken: setTokenContext} = useMainContext();

    const login = async (email, password) => {
        setLoading(true); // Empieza la carga
        setError(null); // Reinicia el error en cada nuevo inicio de sesión

        try {
            const data = await loginUser(email, password); // Llama al servicio API
            setToken(data.token); // Guarda el token de sesión
            setUser(data.user); // Guarda el usuario
            setResult(true); // Guarda el resultado de la evaluación
            sessionStorage.setItem('user', JSON.stringify(data.user));
            sessionStorage.setItem('token', JSON.stringify(data.token));
            setUserContext(data.user); // Guarda el usuario en el contexto
            setTokenContext(data.token); // Guarda el token en el contexto

        } catch (err) {
            setError('Error al iniciar sesión.'); // Guarda el error si hay uno
        } finally {
            setLoading(false); // Termina la carga
        }
    }

    return {
        loading,
        token,
        user,
        result,
        error,
        login
    }
}