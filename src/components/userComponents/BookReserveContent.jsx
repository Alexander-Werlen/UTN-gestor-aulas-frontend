import { useState } from "react"

import styles from "../../styles/userStyles/bookReserveContent.module.css"
import InformationInputSection from "./InformationInputSection"

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

    return (

    <div className={styles.container}>
        <InformationInputSection information={information} setInformation={setInformation}/>
        <div>
        DayInputSection
        </div>
    </div>

    )
}

export default BookReserveContent
