import { useContext, useState } from "react"

import InformationInputSection from "./InformationInputSection"
import DayInputSection from "./DayInputSection"
import ChoosingClassRooms from "./ChoosingClassRooms"
import ConflictosPopUp from "./ConflictosPopUp"
import disponibilidadService from "../../services/disponibilidadService"
import Alert from "../general/Alert"
import { AlertContext } from "../../hooks/userHooks/AlertContext"


function BookReserveContent() {

    const defaultInformation = {
        nombre: "",
        apellido: "",
        profesorId: 0,
        email: "",
        cantidad_alumnos: "",
        tipo_reserva: "",
        tipo_aula: "",
        curso: "",
        cursoId: 0,
        bedelId: ""
    }

    const {message, closeAlert, openAlert} = useContext(AlertContext)

    
    const [information, setInformation] = useState(defaultInformation)
    const [daysReserved, setDaysReserved] = useState([{day: "", start: "", duration: ""}])
    const [isChoosingAulas, setIsChoosingAulas] = useState(false)
    const [isShowingConflictos, setIsShowingConflictos] = useState(false)
    const [conflictos, setConflictos] = useState([])
    const [aulasDisponiblesPorDia, setAulasDisponiblesPorDia] = useState([])

    
    const resetInformation = () => setInformation(defaultInformation)

    const resetDaysInput = () => setDaysReserved([{day: "", start: "", duration: ""}])

    const closePopUp = () => setIsShowingConflictos(false)

    const handleSumbit = (e) => {
        e.preventDefault()


        const data = {
            frecuencia: information.tipo_reserva.toLowerCase(),
            tipo_aula: information.tipo_aula.toLowerCase(),
            cantidad_alumnos: Number(information.cantidad_alumnos),
            renglones: daysReserved.map((d, idx) => {
                return {
                    id: idx,
                    dia: d.day.toLowerCase(),
                    fecha: d.day.toLowerCase(),
                    hora_inicio: d.start,
                    duracion: d.duration
                }
            })
        }
        
        disponibilidadService.getDisponibilidad(data, information.tipo_reserva) 
        .then(res => {
            if(res.status==200){
                openAlert("No hay aulas que cumplan con las restricciones de minimo alumno y tipos de aula", "error", "center", "bottom", 5000)
                return
            }
            //continue with reservation
            setAulasDisponiblesPorDia(res.data)
            setIsChoosingAulas(true)
        }).catch(e => {
            if(e.status==400){
                if(e.response.data.error != undefined){
                    openAlert(e.response.data.message, "error", "center", "bottom", 5000)
                }
            }
            else if(e.status==409){
                setIsShowingConflictos(true)
                setConflictos(e.response.data.conflictos)
            }else{
                console.log(e)
            }
        })

    }

    return (

        <>
            {!isChoosingAulas &&
            <form onSubmit={(e) => handleSumbit(e)}>
                <InformationInputSection information={information} setInformation={setInformation} resetInputs={resetInformation} resetDaysInput={resetDaysInput}/>
                <DayInputSection daysReserved={daysReserved} setDaysReserved={setDaysReserved} information={information}/>
            </form>
            }{isChoosingAulas &&
                <ChoosingClassRooms
                 aulasDisponiblesPorDia={aulasDisponiblesPorDia} information={information} daysReserved={daysReserved} setDaysReserved={setDaysReserved} setIsChoosingAulas={setIsChoosingAulas}/>
            }
            {isShowingConflictos && 
                    <ConflictosPopUp closePopUp={closePopUp} conflictos={conflictos} daysReserved={daysReserved}/>
            }
            { message.open && <Alert severity={message.severity} text={message.text} positionX={message.positionX} positionY={message.positionY} onClose={closeAlert} autoCloseDuration={message.autoCloseDuration}/>
                }
        </>

    )
}

export default BookReserveContent
