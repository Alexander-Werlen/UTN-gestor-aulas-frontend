
import styles from "../../styles/userStyles/dayInputSection.module.css"

function DayInputSection({daysReserved, setDaysReserved, information}) {

    if(!information.tipo_reserva) {
        return (
            <div>
            <h2>RESERVAS</h2>
            <p>Seleccione un tipo de reserva...</p>
            </div>
        )
    }

    const updateDay = (idxModified, modifiedDay) => {
        setDaysReserved(daysReserved.map((dayReserved, idx) => {
            if(idx==idxModified) return modifiedDay
            return dayReserved
        }))
    }

    const deleteDay = (e, idxToDelete) => {
        e.preventDefault()
        let newDays = daysReserved.slice()
        newDays.splice(idxToDelete,1)
        setDaysReserved(newDays)
    }

    const addDay = (e) => {
        e.preventDefault()
        setDaysReserved(daysReserved.concat({
            day: "",
            start: "",
            duration: ""
        }))
    }

    const daysEnum = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]

    const startEnum = [];
    for (let i=8; i < 23; i++) {
        for (let j=0; j < 2; j++) {
            startEnum.push(`${i}:${j === 0 ? `00` : 30*j}`);
        }
    }

    const durationEnum = [];
    for (let i=0; i < 6; i++) {
        for (let j=0; j < 2; j++) {
            if(i==0 && j==0) continue
            durationEnum.push(`${i}:${j === 0 ? `00` : 30*j}`);
        }
    }

    return (
        <div>
            <h2>RESERVAS</h2>
            <div className={styles.table_container}>
            <table>
                <thead>
                    <tr>
                        <th>DÍA</th>
                        <th>HORA INICIO</th>
                        <th>DURACIÓN</th>
                    </tr>
                </thead>
                <tbody>
                {daysReserved.map((dayReserved, idx)=>
                    <tr key={idx}>
                        <td>
                            <select value={dayReserved.day} onChange={(e)=>{updateDay(idx, {...dayReserved, day: e.target.value})}}>
                            {daysEnum.map((dayOfTheWeek) => <option key={dayOfTheWeek} value={dayOfTheWeek}>{dayOfTheWeek}</option>)}
                            <option value="" disabled>Seleccionar</option>
                            </select>
                        </td>
                        <td>
                            <select value={dayReserved.start} onChange={(e)=>updateDay(idx, {...dayReserved, start: e.target.value})}>
                            {startEnum.map((start) => <option key={start} value={start}>{start}</option>)}
                            <option value="" disabled>Seleccionar</option>
                            </select>
                        </td>
                        <td>
                            <div className={styles.last_row_container}>
                            <select value={dayReserved.duration} onChange={(e)=>updateDay(idx, {...dayReserved, duration: e.target.value})}>
                            {durationEnum.map((duration) => <option key={duration} value={duration}>{duration}</option>)}
                            <option value="" disabled>Seleccionar</option>
                            </select>
                            <button className={styles.delete_day_btn_container} onClick={(e)=>deleteDay(e, idx)}>&#10006;</button>
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <button className={styles.add_btn} onClick={(e) => addDay(e)}>AGREGAR DÍA</button>
            <input type="submit" value="SELECCIONAR AULAS" className={styles.sumbit_btn}></input>
        </div>
        </div>
    )
}

export default DayInputSection
