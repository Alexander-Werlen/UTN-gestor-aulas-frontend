import { useState } from "react";

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
            contraseña: contraseña,
            identificador: bedelData.identificador
        }
    }

    const tryModification = () => {
        //validate password
        confirmModification(packModifiedData())
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.popup_container}>
                <div className={styles.header_container}>
                    <span>MODIFICAR BEDEL</span>
                    <button className={styles.close_btn} onClick={() => closePopUp()}>&#10006;</button>
                </div>
                <hr/>
                <div className={styles.content_container}>
                    <h4>Apellido</h4>
                    <input type="text" value={apellido} onChange={(e)=>setApellido(e.target.value)}></input>
                    <h4>Nombre</h4>
                    <input type="text" value={nombre} onChange={(e)=>setNombre(e.target.value)}></input>
                    <h4>Identificador</h4>
                    <input type="text" value={bedelData.identificador} disabled></input>
                    <h4>Turno</h4>
                    <select value={turno} onChange={(e)=>setTurno(e.target.value)}>
                        <option value="Mañana">Mañana</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Noche">Noche</option>
                    </select>
                    <h4>Nueva contraseña</h4>
                    <input type="password" value={contraseña} placeholder="Sin modificar" onChange={(e)=>setContraseña(e.target.value)}></input>
                    <h4>Confirmar nueva contraseña</h4>
                    <input type="password" value={contraseñaConfirmacion} placeholder="Sin modificar" onChange={(e)=>setContraseñaConfirmacion(e.target.value)}></input>
                    <div className={styles.warning_msg}>
                        <p>condition1</p>
                        <p>condition1</p>
                        <p>condition1</p>
                        <p>condition1</p>
                    </div>
                </div>
                <div className={styles.btn_section_container}>
                    <button onClick={() => tryModification()} className={styles.modificar_btn}>Modificar</button>
                    <button onClick={() => closePopUp()} className={styles.cerrar_btn}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default ModifyBedelPopUp
