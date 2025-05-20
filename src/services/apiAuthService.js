import axios from 'axios';
import config from "./config";

// Dirección base de la API
const API_URL = config.API_AUTH_URL;


export const registerUser = async (username, password, email, rol) => {
    // json data
    const data = {
        username: username,
        password: password,
        email: email,
        rol: rol,
        created_at: "None",
        status: "None"
    }

    try {
        // Hacemos la solicitud POST enviando JSON en el cuerpo de la solicitud
        const response = await axios.post(`${API_URL}/register`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const loginUser = async (email, password) => {
    console.log('email: ' + email);
    console.log('password: ' + password);
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);

    try {
        // Hacemos la solicitud POST enviando JSON en el cuerpo de la solicitud
        const response = await axios.post(`${API_URL}/login`,  formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

