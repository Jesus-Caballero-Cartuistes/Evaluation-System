// src/context/OwasContext.js
import React, {createContext, useContext, useEffect, useState} from 'react';

// Crear el contexto de Owas
const OwasContext = createContext();

// Proveedor del contexto de Owas
export const OwasProvider = ({ children }) => {

    const [components, setComponents] = useState( []);
    const [componentsCount, setComponentsCount] = useState(0);
    const [savedFrames, setSavedFrames] = useState({});

    useEffect(() => {
        sessionStorage.setItem('Owas-components', JSON.stringify(components));
    }, [components]);

    useEffect(() => {
        console.log('savedFrames:',savedFrames);
    }, [savedFrames]);


    return (
        <OwasContext.Provider value={{ components, setComponents, componentsCount, setComponentsCount, savedFrames, setSavedFrames}}>
            {children}
        </OwasContext.Provider>
    );
};

// Hook para consumir el contexto de Owas
export const useOwasContext = () => useContext(OwasContext);
