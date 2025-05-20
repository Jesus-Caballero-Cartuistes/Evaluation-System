import {useEffect, useState} from 'react'
import {format} from 'date-fns'
import {CalendarIcon, Check} from 'lucide-react'
import {cn} from '../../lib/utils'
import {Button} from '../../components/ui/button'
import {Calendar} from '../../components/ui/calendar'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../../components/ui/dialog'
import {Input} from '../../components/ui/input'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '../../components/ui/select'
import {Checkbox} from "../../components/ui/checkbox"
import {Label} from "../../components/ui/label";
import {Separator} from "../../components/ui/separator";
import {Textarea} from "../../components/ui/textarea";

function EvaluationInfoPage() {
    const [form, setForm] = useState({
        evaluatorName: '',
        evaluatorRole: '',
        date: '',
        workerName: '',
        workerAge: '',
        workerPosition: '',
        workerTimeInPosition: '',
        workerMedicalHistory: '',
        workArea: '',
        workType: '',
        equipmentUsed: '',
        environmentalConditions: ''
    });
    const [saveData, setSaveData] = useState(!!sessionStorage.getItem('InfoEvaluation'));
    const [evaluatorName, setEvaluatorName] = useState('Jesus Caballero')
    const [evaluatorRole, setEvaluatorRole] = useState('Ingeniero')
    const [date, setDate] = useState()
    const [workerName, setWorkerName] = useState('Juan Gómez')
    const [workerAge, setWorkerAge] = useState('30')
    const [workerPosition, setWorkerPosition] = useState('Pintor')
    const [workerTimeInPosition, setWorkerTimeInPosition] = useState('3 años')
    const [workerMedicalHistory, setWorkerMedicalHistory] = useState('No se reportan')
    const [workArea, setWorkArea] = useState('Variable, según el proyecto')
    const [workType, setWorkType] = useState('Pintura de Vivienda')
    const [equipmentUsed, setEquipmentUsed] = useState('Brochas, rodillos, mascarillas')
    const [environmentalConditions, setEnvironmentalConditions] = useState('Iluminación adecuada, temperatura controlada')

    const handleSubmit = (e) => {
        e.preventDefault()

        const form = {
            evaluatorName,
            evaluatorRole,
            date,
            workerName,
            workerAge,
            workerPosition,
            workerTimeInPosition,
            workerMedicalHistory,
            workArea,
            workType,
            equipmentUsed,
            environmentalConditions
        }
        console.log('Form submitted', form);
        sessionStorage.setItem('InfoEvaluation', JSON.stringify(form));
        setSaveData(true);
    }

    useEffect(() => {
        const form = JSON.parse(sessionStorage.getItem('InfoEvaluation'));
        if (form) {
            setSaveData(true);
            setEvaluatorName(form.evaluatorName);
            setEvaluatorRole(form.evaluatorRole);
            setDate(form.date);
            setWorkerName(form.workerName);
            setWorkerAge(form.workerAge);
            setWorkerPosition(form.workerPosition);
            setWorkerTimeInPosition(form.workerTimeInPosition);
            setWorkerMedicalHistory(form.workerMedicalHistory);
            setWorkArea(form.workArea);
            setWorkType(form.workType);
            setEquipmentUsed(form.equipmentUsed);
            setEnvironmentalConditions(form.environmentalConditions);
        }

    }, []);


    // useEffect(() => {
    //     setSaveData(false);
    // }, [
    //     evaluatorName,
    //     evaluatorRole,
    //     date,
    //     workerName,
    //     workerAge,
    //     workerPosition,
    //     workerTimeInPosition,
    //     workerMedicalHistory,
    //     workArea,
    //     workType,
    //     equipmentUsed,
    //     environmentalConditions
    // ]);

    return (
        <form onSubmit={handleSubmit} className=" px-6 pt-6 ">
            <section className={"lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-4"}>
                {/* Sección: Datos del Evaluador */}
                <section>
                    <div className="bg-gray-100 p-4 rounded-md shadow-sm space-y-3 h-full">
                        <div className="flex">
                            <h2 className="text-sm font-semibold">Datos del Evaluador</h2>
                            <span className="flex-grow"></span>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms"/>
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Usar datos del perfil
                                </label>
                            </div>
                        </div>
                        <Separator></Separator>
                        <div className="space-y-2 ">
                            <div>
                                <Label htmlFor={"evaluatorName"}>
                                    Nombre del evaluador
                                </Label>
                                <Input
                                    id="evaluatorName"
                                    placeholder="Nombre"
                                    value={evaluatorName}
                                    onChange={(e) => setEvaluatorName(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor={"evaluatorRole"}>
                                    Rol del evaluador
                                </Label>
                                <Select value={evaluatorRole} onValueChange={setEvaluatorRole}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Rol"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Supervisor">Supervisor</SelectItem>
                                        <SelectItem value="Gerente">Gerente</SelectItem>
                                        <SelectItem value="Analista">Analista</SelectItem>
                                        <SelectItem value="Ingeniero">Ingeniero</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[240px] justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                        type="button"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Selecciona una fecha</DialogTitle>
                                        <DialogDescription>
                                            Select a date from the calendar below.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </section>

                {/* Sección: Datos del Puesto */}
                <section className={"lg:row-span-2"}>
                    <div className="bg-gray-100 p-4 rounded-md shadow-sm space-y-4 h-full">
                        <h2 className="text-sm font-semibold">Datos del Puesto</h2>
                        <div className="space-y-2">
                            <Separator></Separator>
                            <div>
                                <Label htmlFor={"workArea"}>
                                    Área de trabajo
                                </Label>
                                <Textarea
                                    placeholder="Área de trabajo"
                                    value={workArea}
                                    onChange={(e) => setWorkArea(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor={"workType"}>
                                    Tipo de trabajo
                                </Label>
                                <Textarea
                                    placeholder="Tipo de trabajo"
                                    value={workType}
                                    onChange={(e) => setWorkType(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor={"equipmentUsed"}>
                                    Equipos utilizados
                                </Label>
                                <Textarea
                                    placeholder="Equipos utilizados"
                                    value={equipmentUsed}
                                    onChange={(e) => setEquipmentUsed(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor={"environmentalConditions"}>
                                    Condiciones ambientales
                                </Label>
                                <Textarea
                                    placeholder="Condiciones ambientales"
                                    value={environmentalConditions}
                                    onChange={(e) => setEnvironmentalConditions(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección: Datos del Trabajador */}
                <section>
                    <div className="bg-gray-100 p-4 rounded-md shadow-sm space-y-4 h-full">
                        <h2 className="text-sm font-semibold">Datos del Trabajador</h2>
                        <Separator></Separator>
                        <div className="space-y-2">
                            <div className={"lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-4"}>
                                <div>
                                    <Label htmlFor={"workerName"}>
                                        Nombre del trabajador
                                    </Label>
                                    <Input
                                        htmlFor={"workerName"}
                                        placeholder="Nombre del trabajador"
                                        value={workerName}
                                        onChange={(e) => setWorkerName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={"workerAge"}>
                                        Edad del trabajador
                                    </Label>
                                    <Input
                                        htmlFor={"workerAge"}
                                        placeholder="Edad"
                                        type="number"
                                        value={workerAge}
                                        onChange={(e) => setWorkerAge(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={"workerPosition"}>
                                        Cargo del trabajador
                                    </Label>
                                    <Input
                                        htmlFor={"workerPosition"}
                                        placeholder="Cargo del trabajador"
                                        value={workerPosition}
                                        onChange={(e) => setWorkerPosition(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={"workerTimeInPosition"}>
                                        Tiempo en el puesto
                                    </Label>
                                    <Input
                                        htmlFor={"workerTimeInPosition"}
                                        placeholder="Tiempo en el puesto"
                                        value={workerTimeInPosition}
                                        onChange={(e) => setWorkerTimeInPosition(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor={"workerMedicalHistory"}>
                                    Antecedentes médicos
                                </Label>
                                <Textarea
                                    htmlFor={"workerMedicalHistory"}
                                    placeholder="Antecedentes médicos"
                                    value={workerMedicalHistory}
                                    onChange={(e) => setWorkerMedicalHistory(e.target.value)}
                                />
                            </div>

                        </div>
                    </div>
                </section>


            </section>


            {/*Botón Definir tareas*/}
            <div className="text-center py-3">
                <Button type="submit">
                    {/*<Link to="/owas/report-template">Definir tareas</Link>*/}
                    {saveData && (
                        <span className="flex items-center space-x-3">
                            <Check color={"#00ff4c"}/>
                            <span>Datos guardados</span>
                        </span>
                    )}
                    {!saveData && (
                        <span>Guardar Datos</span>
                    )}
                </Button>
            </div>
        </form>
    );
}

export default EvaluationInfoPage;