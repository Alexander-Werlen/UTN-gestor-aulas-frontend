
import styles from "../../styles/userStyles/choosingClassRooms.module.css"


function ChoosingClassRooms({aulasDisponiblesPorDia, tipoReserva, daysReserved, setDaysReserved}) {

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
        //handle submit
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Selección de aulas - {tipoReserva}</h1>
        {
            days.map(d => {
                return (
                    <div key={d.day}>
                        <hr/>
                        Aulas disponibles para el <strong>{d.day}</strong> desde <strong>{d.start}</strong> por <strong>{d.duration}</strong>hs.
                        <table className={styles.table_container}>
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
                                            <td><input type="radio" name={c.day} id={c.aula} value={c.aula} required checked={Number(d.chosenAula)==Number(c.aula)} onClick={(e) => updateChosenAula(d.day, c.aula, e)}/></td>
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
        <input value="Confirmar" type="submit" className={styles.submit_btn}/>
        <button className={styles.cancel_btn}>Cancelar</button>
        </form>
    )
}

export default ChoosingClassRooms
