import { useState } from 'react';

import {deleteFile, generateUploadUrl, generateDownloadUrl} from "../services/apiFileService";

export const useUpload = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [uploadInfo, setUploadInfo] = useState(null); // Contiene upload_url, public_url, s3_key
    const [downloadInfo, setDownloadInfo] = useState(null); // Contiene download_url

    const requestUploadUrl = async (fileType, extension) => {
        setLoading(true);
        setError(null);

        try {
            const data = await generateUploadUrl(fileType, extension);
            setUploadInfo(data);
            return data;
        } catch (err) {
            setError('No se pudo generar la URL de subida.');
        } finally {
            setLoading(false);
        }
    };

    const requestDownloadUrl = async (s3Key) => {
        setLoading(true);
        setError(null);

        try {
            const data = await generateDownloadUrl(s3Key);
            setDownloadInfo(data);
            return data;
        } catch (err) {
            setError('No se pudo generar la URL de subida.');
        } finally {
            setLoading(false);
        }
    };

    const removeFile = async (s3Key) => {
        setLoading(true);
        setError(null);

        try {
            await deleteFile(s3Key);
            setUploadInfo(null); // Limpia si eliminamos el archivo
        } catch (err) {
            setError('No se pudo eliminar el archivo.');
        } finally {
            setLoading(false);
        }
    };

    const uploadFile = async (uploadUrl, file) => {
        try {
            await fetch(uploadUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': file.type,
                },
                body: file
            });
            return true;
        } catch (error) {
            console.error('Error al subir el archivo a S3:', error);
            throw error;
        }
    };

    return {
        loading,
        error,
        uploadInfo,
        downloadInfo,
        requestUploadUrl,
        requestDownloadUrl,
        removeFile,
        uploadFile
    };
};


// const {
//     loading,
//     uploadInfo,
//     error,
//     requestUploadUrl,
//     removeFile
// } = useS3Upload();
//
// const handleUpload = async () => {
//     const userId = 'user123';
//     const fileType = 'video';
//     const extension = 'mp4';
//
//     const data = await requestUploadUrl(userId, fileType, extension);
//
//     console.log('Sube tu archivo a:', data.upload_url);
//     console.log('Será accesible públicamente desde:', data.public_url);
// };
//
// const handleDelete = async () => {
//     await removeFile('user123', uploadInfo?.s3_key);
// };

