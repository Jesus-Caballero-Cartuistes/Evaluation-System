import axios from 'axios';
import config from "./config";

// Dirección base de la API
const API_URL = config.API_EVAL_URL

export const generateErgonomistRecommendation = async (prompt) => {
    const email = JSON.parse(sessionStorage.getItem('user')).email;
    const token = JSON.parse(sessionStorage.getItem('token'));
    const data = {
        prompt: prompt,
        email: email
    };
    try {
        // Hacemos la solicitud POST enviando JSON en el cuerpo de la solicitud
        const response = await axios.post(`${API_URL}/generate_recommendation`, data, {
            headers: {
                'Content-Type': 'application/json',  // Indicamos que estamos enviando JSON
                'Authorization': `Bearer ${token}`,  // Incluimos el token de autorización
            },
        });

        return response.data;  // Retorna el diccionario con la recomendación generada
    } catch (error) {
        console.error('Error generando la recomendación ergonómica:', error);
        throw error;
    }
};

// Función para evaluar múltiples imágenes usando Owas
export const evaluateImagesOwas = async (files, load) => {
    const email = JSON.parse(sessionStorage.getItem('user')).email;
    const token = JSON.parse(sessionStorage.getItem('token'));
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file.file));
    formData.append('load', load);
    formData.append('email', email);

    try {
        const response = await axios.post(`${API_URL}/owas/evaluate_images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,  // Incluimos el token de autorización
            },
        });
        return response.data; // Retorna el diccionario con los resultados
    } catch (error) {
        console.error('Error evaluando las imágenes Owas:', error);
        throw error;
    }
};
// Función para evaluar un video usando Owas
export const evaluateVideoOwas = async (file, load, start_time, end_time) => {
    const email = JSON.parse(sessionStorage.getItem('user')).email;
    const token = JSON.parse(sessionStorage.getItem('token'));
    const formData = new FormData();
    formData.append('file', file);
    formData.append('load', load);
    formData.append('start_time', start_time);
    formData.append('end_time', end_time);
    formData.append('email', email);
    try {
        const response = await axios.post(`${API_URL}/owas/evaluate_video`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,  // Incluimos el token de autorización

            },
        });
        return response.data; // Retorna el resultado de la evaluación del video
    } catch (error) {
        console.error('Error evaluando el video Owas:', error);
        throw error;
    }
};
// Función para evaluar la URL de un video usando Owas
export const evaluateVideoOwasURL = async (url, load, start_time, end_time) => {
    const email = JSON.parse(sessionStorage.getItem('user')).email;
    const token = JSON.parse(sessionStorage.getItem('token'));
    const formData = new FormData();
    formData.append('url', url);
    formData.append('load', load);
    formData.append('start_time', start_time);
    formData.append('end_time', end_time);
    formData.append('email', email);
    try {
        const response = await axios.post(`${API_URL}/owas/evaluate_video_url`, formData, {
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`,  // Incluimos el token de autorización

            },
        });
        return response.data; // Retorna el resultado de la evaluación del video
    } catch (error) {
        console.error('Error evaluando el video Owas:', error);
        throw error;
    }
};
// Función para evaluar múltiples imágenes usando reba
export const evaluateImagesReba = async (files, load, gripQuality) => {
    const email = JSON.parse(sessionStorage.getItem('user')).email;
    const token = JSON.parse(sessionStorage.getItem('token'));
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file.file));
    formData.append('load', load);
    formData.append('grip_quality', gripQuality);
    formData.append('email', email);

    try {
        const response = await axios.post(`${API_URL}/reba/evaluate_images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,  // Incluimos el token de autorización
            },
        });
        return response.data; // Retorna el diccionario con los resultados
    } catch (error) {
        console.error('Error evaluando las imágenes reba:', error);
        throw error;
    }
};
// Función para evaluar un video usando reba
export const evaluateVideoReba = async (file, load, gripQuality, start_time, end_time) => {
    const email = JSON.parse(sessionStorage.getItem('user')).email;
    const token = JSON.parse(sessionStorage.getItem('token'));
    const formData = new FormData();
    formData.append('file', file);
    formData.append('load', load);
    formData.append('grip_quality', gripQuality);
    formData.append('start_time', start_time);
    formData.append('end_time', end_time);
    formData.append('email', email);

    try {
        const response = await axios.post(`${API_URL}/reba/evaluate_video`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,  // Incluimos el token de autorización
            },
        });
        return response.data; // Retorna el resultado de la evaluación del video
    } catch (error) {
        console.error('Error evaluando el video reba:', error);
        throw error;
    }
};
// Función para evaluar la URL de un video usando reba
export const evaluateVideoRebaURL = async (url, load, gripQuality, start_time, end_time) => {
    const email = JSON.parse(sessionStorage.getItem('user')).email;
    const token = JSON.parse(sessionStorage.getItem('token'));
    const formData = new URLSearchParams();
    formData.append('url', url);
    formData.append('load', load);
    formData.append('grip_quality', gripQuality);
    formData.append('start_time', start_time);
    formData.append('end_time', end_time);
    formData.append('email', email);

    try {
        const response = await axios.post(`${API_URL}/reba/evaluate_video_url`, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' ,
                'Authorization': `Bearer ${token}`,  // Incluimos el token de autorización
            },
        });
        return response.data; // Retorna el resultado de la evaluación del video
    } catch (error) {
        console.error('Error evaluando el video reba:', error);
        throw error;
    }
};
// Función para evaluar múltiples imágenes usando Rula
export const evaluateImagesRula = async (files, load) => {
    const email = JSON.parse(sessionStorage.getItem('user')).email;
    const token = JSON.parse(sessionStorage.getItem('token'));
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    formData.append('load', load);
    formData.append('email', email);

    try {
        const response = await axios.post(`${API_URL}/rula/evaluate_images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,  // Incluimos el token de autorización
            },
        });
        return response.data; // Retorna el diccionario con los resultados
    } catch (error) {
        console.error('Error evaluando las imágenes Rula:', error);
        throw error;
    }
};
export const evaluateVideoRula = async (file) => {
    const email = JSON.parse(sessionStorage.getItem('user')).email;
    const token = JSON.parse(sessionStorage.getItem('token'));
    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);

    try {
        const response = await axios.post(`${API_URL}/rula/evaluate_video`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,  // Incluimos el token de autorización
            },
        });
        return response.data; // Retorna el resultado de la evaluación del video
    } catch (error) {
        console.error('Error evaluando el video Rula:', error);
        throw error;
    }
};