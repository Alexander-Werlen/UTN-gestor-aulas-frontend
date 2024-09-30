
import styles from "../../styles/adminStyles/deleteBedelPopUp.module.css"

function DeleteBedelPopUp({getAlterBedelData, confirmDeletion, closePopUp}) {

    const bedelData = getAlterBedelData();

    return (
        <div className={styles.overlay}>
            <div className={styles.popup_container}>
                <div className={styles.header_container}>
                    <span>ELIMINAR BEDEL</span>
                    <button className={styles.close_btn} onClick={() => closePopUp()}>&#10006;</button>
                </div>
                <hr/>
                <div className={styles.content_container}>
                    <label>Apellido
                    <input type="text" value={bedelData.apellido} disabled></input>
                    </label>
                    <label>Nombre
                    <input type="text" value={bedelData.nombre} disabled></input>
                    </label>
                    <label>Turno
                    <input type="text" value={bedelData.turno} disabled></input>
                    </label>
                    <div className={styles.warning_msg}>
                        <p>Estás seguro que quieres <b>eliminar</b> al bedel <b>{bedelData.apellido+" "+bedelData.nombre}</b> del turno <b>{bedelData.turno}</b>?</p>
                        <p>Se <b>PERDERÁ EL USUARIO</b> permanentemente.</p>
                    </div>
                </div>
                <div className={styles.btn_section_container}>
                    <button onClick={() => confirmDeletion(bedelData.identificador)} className={styles.eliminar_btn}>Eliminar</button>
                    <button onClick={() => closePopUp()} className={styles.cerrar_btn}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteBedelPopUp
