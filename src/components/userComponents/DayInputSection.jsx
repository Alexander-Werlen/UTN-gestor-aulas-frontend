
import styles from "../../styles/userStyles/dayInputSection.module.css"

function DayInputSection({daysReserved, setDaysReserved, information}) {

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
                    {daysReserved.map((reserve)=>
                        <tr key={reserve.day}>
                            <td>{reserve.day}</td>
                            <td>{reserve.start}</td>
                            <td>{reserve.duration}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default DayInputSection
