import { useState } from "react"
import axios from "axios"

import styles from "../../styles/userStyles/bookReserveContent.module.css"
import InformationInputSection from "./InformationInputSection"
import DayInputSection from "./DayInputSection"
import ChoosingClassRooms from "./ChoosingClassRooms"
import ConflictosPopUp from "./ConflictosPopUp"

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

        const url = (information.tipo_reserva=="Esporadica") ? "http://localhost:3000/disponibilidad/esporadica" : "http://localhost:3000/disponibilidad/periodica"

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
        axios({
            method: 'post',
            url: url,
            data: data
        }).then(res => {
            if(res.status==200){
                alert("No hay aulas que cumplan con las restricciones de minimo alumno y tipos de aula")
                return
            }
            //continue with reservation
            setAulasDisponiblesPorDia(res.data)
            setIsChoosingAulas(true)
        }).catch(e => {
            if(e.status==409){
                setIsShowingConflictos(true)
                setConflictos(e.response.data.conflictos)
            }else{
                console.log(e)
            }
        })

    }

    return (

        <div className={styles.container}>
            {!isChoosingAulas &&
            <form onSubmit={(e) => handleSumbit(e)} className={styles.table_container}>
                <InformationInputSection information={information} setInformation={setInformation} resetInputs={resetInformation} resetDaysInput={resetDaysInput}/>
                <DayInputSection daysReserved={daysReserved} setDaysReserved={setDaysReserved} information={information}/>
            </form>
            }{isChoosingAulas &&
                <ChoosingClassRooms aulasDisponiblesPorDia={aulasDisponiblesPorDia} information={information} daysReserved={daysReserved} setDaysReserved={setDaysReserved} setIsChoosingAulas={setIsChoosingAulas}/>
            }
            {isShowingConflictos && 
                    <ConflictosPopUp closePopUp={closePopUp} conflictos={conflictos} daysReserved={daysReserved}/>
            }
        </div>

    )
}

export default BookReserveContent
