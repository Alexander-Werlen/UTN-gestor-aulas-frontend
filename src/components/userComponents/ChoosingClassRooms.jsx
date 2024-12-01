
import styles from "../../styles/userStyles/choosingClassRooms.module.css"
import { useContext } from "react"
import { AlertContext } from "../../hooks/userHooks/AlertContext"
import reservaService from "../../services/reservaService"



function ChoosingClassRooms({aulasDisponiblesPorDia, information, daysReserved, setDaysReserved, setIsChoosingAulas}) {

    //alert context
    const {openAlert} = useContext(AlertContext)
    

    let days = []
    for (let i = 0; i < daysReserved.length; i++) {
        days.push({classRoomOptions: aulasDisponiblesPorDia[i], chosenAula: aulasDisponiblesPorDia[i][0].aula, ...daysReserved[i]})
    }
    
    const updateChosenAula = (dia, chosenAula) => {
        setDaysReserved(daysReserved.map((d) => {
            if(d.day==dia){
                return {...d, chosenAula: chosenAula}
            }else return d
        }))
    }  

    const handleSubmit = (e) => {
        e.preventDefault()


        const data = {
            bedel_id: "admin",
            id_docente: information.profesorId,
            id_curso: information.cursoId,
            correo_contacto: information.email,
            cantidad_alumnos: Number(information.cantidad_alumnos),
            renglones: days.map((d) => {
                return {
                    dia: d.day.toLowerCase(),
                    fecha: d.day.toLowerCase(),
                    hora_inicio: d.start,
                    duracion: d.duration,
                    numero_aula: Number(d.chosenAula)
                }
            })
        }

        if(!(information.tipo_reserva=="Esporadica")) {

            data.frecuencia = information.tipo_reserva
        }

        reservaService.postReserva(data, information.tipo_reserva)
        .then(() => {
            //### Avisar exito
            setDaysReserved([{day: "", start: "", duration: ""}])
            openAlert("Reserva realizada con éxito", "success", "center", "bottom", 5000)
        }).catch(e => {
            //### Avisar error
            openAlert("Error al realizar la reserva", "error", "center", "bottom", 5000)
            console.log(data)
            console.log(e)
        }).finally(() => {
            setIsChoosingAulas(false)
        })
    }

    const handleCancel = () => {
        setIsChoosingAulas(false)
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Selección de aulas - {information.tipo_reserva}</h1>
        {
            days.map(d => {
                return (
                    <div key={d.day}>
                        <hr className={styles.separator_thick}/>
                        Aulas disponibles para el <strong>{d.day}</strong> desde <strong>{d.start}</strong> por <strong>{d.duration}</strong>hs.
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>AULA</th>
                                <th>PISO</th>
                                <th>CAPACIDAD</th>
                                <th>CARACTERISTICAS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                d.classRoomOptions.map(c => {
                                    return(
                                        <tr key={c.aula}>
                                            <td><input type="radio" name={c.day} value={c.aula} readOnly required checked={Number(d.chosenAula)==Number(c.aula)} onClick={(e) => updateChosenAula(d.day, c.aula, e)}/></td>
                                            <td>{c.aula}</td>
                                            <td>{c.piso}</td>
                                            <td>{c.capacidad}</td>
                                            <td>
                                                <ul>
                                                {c.caracteristicas.map(caracteristica => <li key={caracteristica.nombre}>{caracteristica.nombre} ({caracteristica.cantidad})</li>)}
                                                </ul>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        </table>
                    </div>
                )
            })
        }
        <div className={styles.btn_container}>
            <div className={styles.flex_column}>
                <input value="Confirmar" type="submit" className={styles.submit_btn}/>
            </div>
            <div className={styles.flex_column}>
                <button className={styles.cancel_btn} onClick={() => handleCancel()}>Cancelar</button>
            </div>
        </div>
        </form>

    )
}

export default ChoosingClassRooms
