import React from 'react';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import EvaluationBar from '../../../components/EvaluationBar'; // Asegúrate de importar el componente
import EvaluationInfoPage from '../EvaluationInfoPage';
import OwasTaskDefinitionPage from './OwasTaskDefinitionPage';
import OwasReportPage from "./OwasReportPage";
import {ClipboardList, Info, Star} from "lucide-react";
import {Toaster} from "../../../components/ui/toaster";


const steps = [
    { id: "evaluation-info", label: "Evaluation Info", icon: Info, path: "evaluation-info" },
    { id: "task-definition", label: "Task Definition", icon: ClipboardList, path: "task-definition" },
    { id: "evaluation-report", label: "Evaluation Report", icon: Star, path: "evaluation-report" },
];

const Owas = () => {
    return (
        <div className="">
            {/* Renderiza las subrutas de OWAS */}
            <div className={"pb-16"}>
                <Outlet/>
            </div>
            <Toaster/>
            {/* Barra de progreso fija en la parte inferior */}
            <EvaluationBar steps={steps}/>
        </div>
    );
};

const OwasRoutes = () => (
    <Routes>
        {/* Ruta base de OWAS */}
        <Route path="/" element={<Owas/>}>
            {/* Redirección desde /owas a /owas/evaluation-info */}
            <Route index element={<Navigate to="evaluation-info"/>}/>
            {/* Subrutas de OWAS */}
            <Route path="evaluation-info" element={<EvaluationInfoPage />} />
            <Route path="task-definition" element={<OwasTaskDefinitionPage />} />
            <Route path="evaluation-report" element={<OwasReportPage />} />
        </Route>
    </Routes>
);

export { Owas, OwasRoutes };


