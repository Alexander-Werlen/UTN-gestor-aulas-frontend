import { useState } from "react"
import axios from "axios"

import styles from "../../styles/userStyles/bookReserveContent.module.css"
import InformationInputSection from "./InformationInputSection"
import DayInputSection from "./DayInputSection"

function BookReserveContent() {

    const defaultInformation = {
        nombre: "",
        apellido: "",
        email: "",
        cantidad_alumnos: "",
        tipo_reserva: "",
        tipo_aula: "",
        curso: ""
    }
    
    const [information, setInformation] = useState(defaultInformation)
    const [daysReserved, setDaysReserved] = useState([{day: "", start: "", duration: ""}])
    
    const resetInformation = () => setInformation(defaultInformation)

    const handleSumbit = (e) => {
        e.preventDefault()

        const data = {
            frecuencia: information.tipo_reserva.toLowerCase(),
            tipo_aula: information.tipo_aula.toLowerCase(),
            cantidad_alumnos: information.cantidad_alumnos,
            reglones: daysReserved.map((d, idx) => {
                return {
                    id: idx,
                    dia: d.day.toLowerCase(),
                    hora_inicio: d.start,
                    duracion: d.duration
                }
            })
        }
        console.log(data)
        axios({
            method: 'post',
            url: `http://localhost:3000/disponibilidad/periodica`,
            data: data
        }).then(res => {
            console.log(res)    
        }).catch(e => {
            console.log(e)
        })

    }

    return (

        <div className={styles.container}>
            <form onSubmit={(e) => handleSumbit(e)}>
                <InformationInputSection information={information} setInformation={setInformation} resetInputs={resetInformation}/>
                <DayInputSection daysReserved={daysReserved} setDaysReserved={setDaysReserved} information={information}/>
            </form>
        </div>

    )
}

export default BookReserveContent
