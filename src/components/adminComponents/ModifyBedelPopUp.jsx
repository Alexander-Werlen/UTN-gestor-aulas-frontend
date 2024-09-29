import { useState } from "react";
import validatePassword from "../../utils/passwordValidation"

import styles from "../../styles/adminStyles/modifyBedelPopUp.module.css"

function ModifyBedelPopUp({getAlterBedelData, confirmModification, closePopUp}) {

    const bedelData = getAlterBedelData();

    const [apellido, setApellido] = useState(bedelData.apellido)
    const [nombre, setNombre] = useState(bedelData.nombre)
    const [turno, setTurno] = useState(bedelData.turno)
    const [contraseña, setContraseña] = useState("")
    const [contraseñaConfirmacion, setContraseñaConfirmacion] = useState("")

    const packModifiedData = () => {
        return {
            apellido: apellido,
            nombre: nombre,
            turno: turno,
            password: contraseña,
            identificador: bedelData.identificador
        }
    }

    const tryModification = (e) => {
        e.preventDefault()
        if(contraseña || contraseñaConfirmacion){
            const validation = validatePassword(contraseña, contraseñaConfirmacion)
            if(!validation.isValid) {
                alert(validation.error)
                console.log(validation.error)
                return
            }
        }
        confirmModification(packModifiedData())
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.popup_container}>
                <form onSubmit={(e) => tryModification(e)}>
                <div className={styles.header_container}>
                    <span>MODIFICAR BEDEL</span>
                    <button className={styles.close_btn} onClick={() => closePopUp()}>&#10006;</button>
                </div>
                <hr/>
                <div className={styles.content_container}>
                    <label>Apellido
                    <input
                    className={ bedelData.apellido !== apellido ? styles.modified_field : ""}
                     type="text" required value={apellido} onChange={(e)=>setApellido(e.target.value)}></input>
                    </label>
                    <label>Nombre
                    <input
                    className={ bedelData.nombre !== nombre ? styles.modified_field : ""}
                     type="text" required value={nombre} onChange={(e)=>setNombre(e.target.value)}></input>
                    </label>
                    <label>Identificador
                    <input 
                    className={styles.disabled_input}
                    type="text" required value={bedelData.identificador} disabled></input>
                    </label>
                    <label>Turno
                    <select 
                    className={ bedelData.turno !== turno ? styles.modified_field : ""}
                    value={turno} onChange={(e)=>setTurno(e.target.value)}>
                        <option value="mañana">Mañana</option>
                        <option value="tarde">Tarde</option>
                        <option value="noche">Noche</option>
                    </select>
                    </label>
                    <label>Contraseña
                    <input type="password" value={contraseña} placeholder="Sin modificar" onChange={(e)=>setContraseña(e.target.value)}></input>
                    </label>
                    <label>Confirmar contraseña
                    <input type="password" value={contraseñaConfirmacion} placeholder="Sin modificar" onChange={(e)=>setContraseñaConfirmacion(e.target.value)}></input>
                    </label>
                    <div className={styles.warning_msg}>
                        <p>La contraseña debe contener al menos un dígito.</p>
                        <p>Debe contener al menos una letra mayúscula</p>
                        <p>Debe contener signos especiales (@#$%&*)</p>
                        <p>Debe tener por lo menos 8 caracteres</p>
                    </div>
                </div>
                <div className={styles.btn_section_container}>
                    <input value="Modificar" className={styles.modificar_btn} type="submit"></input>
                    <button onClick={() => closePopUp()} className={styles.cerrar_btn}>Cancelar</button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default ModifyBedelPopUp
