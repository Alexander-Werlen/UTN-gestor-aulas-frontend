import { useState } from "react"

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
    const [daysReserved, setDaysReserved] = useState([])

    const resetInformation = () => setInformation(defaultInformation)

    return (

        <div className={styles.container}>
            <form>
                <InformationInputSection information={information} setInformation={setInformation} resetInputs={resetInformation}/>
                <DayInputSection daysReserved={daysReserved} setDaysReserved={setDaysReserved} information={information}/>
            </form>
        </div>

    )
}

export default BookReserveContent
