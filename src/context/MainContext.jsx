import React, {createContext, useContext, useEffect, useState} from 'react';

// Crear el contexto de Owas
const MainContext = createContext();

// Proveedor del contexto de Owas
export const MainProvider = ({ children }) => {

    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || null);
    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('token')) || null);


    return (
        <MainContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </MainContext.Provider>
    );
};

// Hook para consumir el contexto de Owas
export const useMainContext = () => useContext(MainContext);