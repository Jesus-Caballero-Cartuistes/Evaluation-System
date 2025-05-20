import React from 'react';
import {Card, CardContent} from "../components/ui/card";

const About = () => {
    return (
        <main className="container mx-auto px-4 py-12">
            {/* Sección de encabezado con logo de la universidad */}
            <section className="mb-16 flex flex-col items-center justify-center">
                <div className="mb-8 w-64">
                    <img
                        src="/assets/logo-universidad.png"
                        width={300}
                        height={150}
                        alt="Logo de la Universidad"
                        className="h-auto w-full"
                    />
                </div>
                <h1 className="text-center text-4xl font-bold">Sobre Nosotros</h1>
            </section>

            {/* Sección personal */}
            <section className="mb-16">
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="flex justify-center md:justify-end">
                        <div className="relative h-80 w-64 overflow-hidden rounded-lg">
                            <img src="/assets/foto-perfil.jpeg"  alt="Mi foto"
                                   className="object-cover h-full w-full"/>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="mb-4 text-2xl font-bold">Mi Perfil</h2>
                        <p className="text-lg text-muted-foreground">
                            Soy estudiante de la universidad y estoy desarrollando este proyecto como parte de mi
                            formación académica.
                            Me apasiona la tecnología y el desarrollo web, y este proyecto representa una oportunidad
                            para aplicar los
                            conocimientos adquiridos durante mi carrera.
                        </p>
                    </div>
                </div>
            </section>

            {/* Sección de profesores */}
            <section className="mb-16">
                <h2 className="mb-8 text-center text-3xl font-bold">Profesores Guía</h2>
                <div className="grid gap-36 md:grid-cols-2 lg:mx-20">
                    <Card className="overflow-hidden">
                        <div className="h-72 w-full">
                            <img src="/assets/Holman-Ospina-Mateus-1.jpg" alt="Profesor 1"
                                   className="h-full w-full object-cover"/>
                        </div>
                        <CardContent className="p-6">
                            <h3 className="mb-2 text-xl font-bold">Profesor Dr. Holman Ospina Mateus</h3>
                            <p className="text-muted-foreground">
                                Ingeniero Industrial y Magíster en Ingeniería Industrial de la UTB. Doctor en Ingeniería de la Pontificia Universidad Javeriana, Bogotá (Colombia). Doctor en Modelado de Sistemas de Ingeniería de la Universidad Pontificia Comillas, Madrid (España).
                                Ha sido mi mentor durante el desarrollo de este proyecto, aportando valiosos conocimientos sobre ergonomía y analítica de datos.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                        <div className="relative h-72 w-full">
                            <img src="/assets/Edwin-Puertas-del-Castillo-1.jpg" alt="Profesor 2"
                                   className="h-full w-full object-cover"/>
                        </div>
                        <CardContent className="p-6">
                            <h3 className="mb-2 text-xl font-bold">Profesor Dr. Edwin Puerta del Castillo</h3>
                            <p className="text-muted-foreground">
                                Doctor en Ingeniería de la Pontificia Universidad Javeriana, 2022. Magíster en Ingeniería e Ingeniero de Sistemas de la Universidad Tecnológica de Bolívar. Profesor Asociado del programa de Ingeniería de Sistemas y Computación.
                                Ha sido mi mentor en este proyecto, aportando conocimientos sobre arquitectura de software e inteligencia artificial.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Sección de descripción del proyecto */}

                    <section className="bg-muted p-8 rounded-2xl shadow max-w-3xl mx-auto mt-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">🧠 Sobre el Proyecto</h2>
                        <p className="text-gray-700 mb-4">
                            Este proyecto fue desarrollado como parte de mi formación académica en la universidad con el
                            objetivo de crear una herramienta web que evalúe riesgos ergonómicos en trabajadores a
                            partir del análisis de imágenes y videos. La aplicación aplica los
                            métodos <strong>OWAS</strong> y <strong>REBA</strong> para detectar posturas que podrían
                            generar trastornos musculoesqueléticos.
                        </p>
                        <p className="text-gray-700 mb-4">
                            Para ello, combina tecnologías modernas y una arquitectura modular:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                            <li><strong>Frontend:</strong> Desarrollado en <strong>React</strong>, ofrece una interfaz
                                intuitiva y responsiva para cargar videos, visualizar resultados y gestionar sesiones de
                                análisis.
                            </li>
                            <li><strong>Backend:</strong> Construido
                                con <strong>Python</strong> y <strong>FastAPI</strong>, implementa microservicios que
                                procesan las imágenes y extraen datos biomecánicos.
                            </li>
                            <li><strong>Procesamiento de postura:</strong> Utiliza <strong>MediaPipe</strong>, una
                                potente librería de visión por computadora de Google, para estimar con precisión la pose
                                humana en tiempo real.
                            </li>
                        </ul>
                        <p className="text-gray-700">
                            Este enfoque permite analizar posturas de manera automática, precisa y escalable,
                            facilitando evaluaciones ergonómicas rápidas sin necesidad de equipos especializados.
                        </p>
                    </section>
        </main>
    );
};

export default About;
