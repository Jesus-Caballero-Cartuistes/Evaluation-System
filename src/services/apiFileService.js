
import axios from 'axios';
import config from "./config";

// Dirección base de la API
const API_URL = config.API_FILE_URL;

export const generateUploadUrl = async (fileType, extension) => {
    const email = JSON.parse(sessionStorage.getItem('user')).email;
    const token = JSON.parse(sessionStorage.getItem('token'));

    try {
        const response = await axios.get(`${API_URL}/generate-upload-url`, {
            params: {
                email: email,
                file_type: fileType,
                extension: extension
            },
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al generar URL de subida:', error);
        throw error;
    }
};

export const generateDownloadUrl = async (s3Key) => {
    const token = JSON.parse(sessionStorage.getItem('token'));

    try {
        const response = await axios.get(`${API_URL}/generate-download-url`, {
            params: {
                s3_key: s3Key,
            },
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al generar la URL de descarga:', error);
        throw error;
    }
};


export const deleteFile = async (s3Key) => {
    const email = JSON.parse(sessionStorage.getItem('user')).email;
    const token = JSON.parse(sessionStorage.getItem('token'));

    try {
        const response = await axios.delete(`${API_URL}/delete-file`, {
            params: {
                s3_key: s3Key,
                email: email,
            },
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el archivo:', error);
        throw error;
    }
};
