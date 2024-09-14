import axios from "axios"

import styles from "../../styles/userStyles/choosingClassRooms.module.css"


function ChoosingClassRooms({aulasDisponiblesPorDia, information, daysReserved, setDaysReserved, setIsChoosingAulas}) {

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

        const frecuenciaByTipoReserva = {
            "Anual": "anual",
            "1er Cuatrimestre": "cuatrimestre_1",
            "2do Cuatrimestre": "cuatrimestre_2",
            "Esporadica": "esporadica"
        }

        const data = {
            bedel_id: "admin",
            id_docente: information.profesorId,
            id_curso: information.cursoId,
            frecuencia: frecuenciaByTipoReserva[information.tipo_reserva],
            correo_contacto: information.email,
            cantidad_alumnos: Number(information.cantidad_alumnos),
            renglones: days.map((d) => {
                return {
                    dia: d.day.toLowerCase(),
                    hora_inicio: d.start,
                    duracion: d.duration,
                    numero_aula: Number(d.chosenAula)
                }
            })
        }

        axios({
            method: 'post',
            url: `http://localhost:3000/reservas/periodica`,
            data: data
        }).then(response => {
            //### Avisar exito
            setDaysReserved([{day: "", start: "", duration: ""}])
            alert("Reserva exitosa")
            console.log(response)
        }).catch(e => {
            //### Avisar error
            alert("No se pudo realizar la reserva")
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
