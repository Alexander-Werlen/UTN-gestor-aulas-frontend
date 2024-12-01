
import styles from "../../styles/userStyles/conflictosPopUp.module.css"

function ConflictosPopUp({closePopUp, conflictos, daysReserved}) {
    return (
        <div className={styles.overlay}>
            <div className={styles.popup_container}>
                <div className={styles.header_container}>
                    <span>CONFLICTOS EN BUSQUEDA DE AULA</span>
                    <button className={styles.close_btn} onClick={() => closePopUp()}>&#10006;</button>
                </div>
                <hr/>
                <div className={styles.content_container}>
                    <h2 className={styles.h2}>Algunos dias no encontraron ningún aula disponible</h2>
                    <p className={styles.conflicto_description}>A continuación se muestran las aulas con menor horas de superposición por cada día</p>
                    {
                        daysReserved.map((day, idx) => {
                                if(conflictos[idx]) return <div key={day.day} className={styles.conflicto_container}>
                                    <hr/>
                                    <p className={styles.conflicto_description}>Reservas superpuestas el <strong>{day.day}</strong> empezando a las <strong>{day.start}</strong> con duración <strong>{day.duration}hs</strong></p>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th className={styles.small_cell}>AULA</th>
                                                <th className={styles.medium_cell}>HORARIO</th>
                                                <th className={styles.medium_cell}>HORAS SUPERPUESTAS</th>
                                                <th className={styles.medium_cell}>DOCENTE</th>
                                                <th className={styles.medium_cell}>CURSO</th>
                                                <th className={styles.medium_cell}>CORREO CONTACTO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {conflictos[idx].map((c)=>
                                                <tr key={c.aula}>
                                                <td className={styles.small_cell}>{c.aula}</td>
                                                <td className={styles.medium_cell}>{c.horario}</td>
                                                <td className={styles.medium_cell}>{c.superposicion}</td>
                                                <td className={styles.medium_cell}>{c.docente}</td>
                                                <td className={styles.medium_cell}>{c.curso}</td>
                                                <td className={styles.medium_cell}>{c.correo}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                        </table>
                                    </div>
                                else return <></>
                            }
                            
                        )
                    }
                </div>
                <div className={styles.btn_section_container}>
                    <button onClick={() => closePopUp()} className={styles.cerrar_btn}>Volver</button>
                </div>
            </div>
        </div>
    )
}

export default ConflictosPopUp
