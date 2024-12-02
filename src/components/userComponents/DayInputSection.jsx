
import styles from "../../styles/userStyles/dayInputSection.module.css"
import { addTimes } from "../../utils/addTimes"
import getCurrentDayString from "../../utils/getCurrentDayString"
import Alert from "../general/Alert"
import { AlertContext } from "../../hooks/userHooks/AlertContext"
import { useContext } from "react"
function DayInputSection({ daysReserved, setDaysReserved, information }) {

    const {message, closeAlert, openAlert} = useContext(AlertContext)
    const allDaysEnum = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
    const daysEnum = allDaysEnum.filter(d => {
        if (daysReserved.map(d => d.day).includes(d)) return false
        else return true
    })

    if (!information.tipo_reserva) {
        return (
            <div>
                <h2 className={styles.day_input_h2}>RESERVAS</h2>
                <p>Seleccione un tipo de reserva...</p>
            </div>
        )
    }

    const updateDay = (idxModified, modifiedDay) => {

        const apariciones = daysReserved.filter((d,idx) => d.day == modifiedDay.day && idx!=idxModified ).length
        if(apariciones>0){
            openAlert(`La fecha ${modifiedDay.day} ya fue utilizada`,"error","center","bottom",5000)
            return
        }
        setDaysReserved(daysReserved.map((dayReserved, idx) => {
            if (idx == idxModified) return modifiedDay
            return dayReserved
        }))
    }

    const deleteDay = (e, idxToDelete) => {
        e.preventDefault()
        let newDays = daysReserved.slice()
        newDays.splice(idxToDelete, 1)
        setDaysReserved(newDays)
        //falta actualizar daysUsed
    }

    const addDay = (e) => {
        e.preventDefault()
        setDaysReserved(daysReserved.concat({
            day: "",
            start: "",
            duration: ""
        }))
    }

    const startEnum = [];
    for (let i = 8; i < 23; i++) {
        for (let j = 0; j < 2; j++) {
            if(i<10) startEnum.push(`0${i}:${j === 0 ? `00` : 30 * j}`)
            else startEnum.push(`${i}:${j === 0 ? `00` : 30 * j}`);
        }
    }

    const durationEnum = [];
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 2; j++) {
            if (i == 0 && j == 0) continue
            durationEnum.push(`${i}:${j === 0 ? `00` : 30 * j}`);
        }
    }



    return (
        <div>
            <h2 className={styles.day_input_h2}>RESERVAS</h2>
            <div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>DÍA</th>
                            <th>HORA INICIO</th>
                            <th>DURACIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {daysReserved.map((dayReserved, idx) =>
                            <tr key={idx}>
                                <td className={styles.dayInputCell}>
                                    {information.tipo_reserva.toLowerCase() == "esporadica" &&
                                        <input type="date" name="dia" value={dayReserved.day} min={getCurrentDayString()} onChange={(e) => updateDay(idx, { ...dayReserved, day: e.target.value })}/>
                                    }
                                    {!(information.tipo_reserva.toLowerCase() == "esporadica") &&
                                        <select required value={dayReserved.day} onChange={(e) => updateDay(idx, { ...dayReserved, day: e.target.value })}>
                                            <option value="" hidden disabled>Seleccionar</option>
                                            {dayReserved.day &&
                                                daysEnum.concat(dayReserved.day).map((dayOfTheWeek) => <option key={dayOfTheWeek} value={dayOfTheWeek}>{dayOfTheWeek}</option>)
                                            }
                                            {!dayReserved.day &&
                                                daysEnum.map((dayOfTheWeek) => <option key={dayOfTheWeek} value={dayOfTheWeek}>{dayOfTheWeek}</option>)
                                            }
                                        </select>
                                    }
                                </td>
                                <td className={styles.dayInputCell}>
                                    <select required value={dayReserved.start} onChange={(e) => updateDay(idx, { ...dayReserved, start: e.target.value })}>
                                        <option value="" hidden disabled>Seleccionar</option>
                                        {
                                        startEnum.filter(start => (!dayReserved.duration || addTimes(start, dayReserved.duration) <= "23:30"))
                                        .map((start) => <option key={start} value={start}>{start}</option>)
                                        }
                                    </select>
                                </td>
                                <td className={styles.dayInputCell}>
                                    <div className={styles.last_row_container}>
                                        <select required value={dayReserved.duration} onChange={(e) => updateDay(idx, { ...dayReserved, duration: e.target.value })}>
                                            <option value="" hidden disabled>Seleccionar</option>
                                            {
                                            durationEnum.filter(duration => (!dayReserved.duration || addTimes(dayReserved.start, duration) <= "23:30"))
                                            .map((duration) => <option key={duration} value={duration}>{duration}</option>)
                                            }
                                        </select>
                                        <button type="button" className={styles.delete_day_btn_container} onClick={(e) => deleteDay(e, idx)} hidden={daysReserved.length == 1}>&#10006;</button>
                                    </div>
                                </td>
                            </tr>

                        )}
                    </tbody>
                </table>
                <button type="button" className={styles.add_btn} onClick={(e) => addDay(e)} disabled={daysReserved.length >= 7 && !(information.tipo_reserva.toLowerCase() == "esporadica")}>AGREGAR DÍA</button>
                <input type="submit" value="Seleccionar Aulas" className={styles.sumbit_btn}></input>
            </div>
            { message.open && <Alert severity={message.severity} text={message.text} positionX={message.positionX} positionY={message.positionY} onClose={closeAlert} autoCloseDuration={message.autoCloseDuration}/>}
        </div>
        
    )
}

export default DayInputSection
