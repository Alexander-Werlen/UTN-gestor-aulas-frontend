import { useState, useEffect } from "react"
import DeleteBedelPopUp from "./DeleteBedelPopUp"
import ModifyBedelPopUp from "./ModifyBedelPopUp"

import styles from "../../styles/adminStyles/bedelsResultsTable.module.css"

function BedelResultsTable({apellidoFilter, turnoFilter}) {

    const [bedels, setBedels] = useState([])

    const defaultAlterBedelData = {
        showDeletePopUp: false,
        showModifyPopUp: false,
        apellido: null,
        nombre: null,
        identificador: null,
        turno: null
    }

    const [alterBedelData, setAlterBedelData] = useState(defaultAlterBedelData)

    useEffect(() => {
        //simula llamada a api
        setTimeout(() => {
            let aux = []
            for(let i = 0; i < 30; i++) {
                aux.push({
                    apellido: "Werlen",
                    nombre: "Alexander",
                    turno: "Tarde",
                    identificador: "werlen-a-n"+i.toString()
                })
            }
            setBedels(aux)
        }, 50);
    }, []);


    const confirmDeletion = (identificador) => {
        //###send API deletion 
        setBedels(bedels.filter((bedel) => bedel.identificador!==identificador))
        closePopUp()
    }

    const confirmModification = (modifiedBedel) => {
        //### send API modification
        const newList = bedels.map((bedel) => {
            if(bedel.identificador==modifiedBedel.identificador) {
                return {
                    apellido: modifiedBedel.apellido,
                    nombre: modifiedBedel.nombre,
                    turno: modifiedBedel.turno,
                    identificador: modifiedBedel.identificador,
                }
            } else return bedel
        })
        setBedels(newList)
        closePopUp()
    }

    const closePopUp = () => {
        setAlterBedelData(defaultAlterBedelData)
    }

    const getAlterBedelData = () => {
        return {
            apellido: alterBedelData.apellido,
            nombre: alterBedelData.nombre,
            identificador: alterBedelData.identificador,
            turno: alterBedelData.turno
        }
    }

    const openDeleteBedelPopUp = (bedelSelected) => {
        setAlterBedelData ({
            showDeletePopUp: true,
            showModifyPopUp: false,
            apellido: bedelSelected.apellido,
            nombre: bedelSelected.nombre,
            identificador: bedelSelected.identificador,
            turno: bedelSelected.turno
        })
    }

    const openModifyBedelPopUp = (bedelSelected) => {
        setAlterBedelData ({
            showDeletePopUp: false,
            showModifyPopUp: true,
            apellido: bedelSelected.apellido,
            nombre: bedelSelected.nombre,
            identificador: bedelSelected.identificador,
            turno: bedelSelected.turno
        })
    }

    const filteredBedels = bedels.filter((bedel) => (apellidoFilter=="" || bedel.apellido.toLowerCase()==apellidoFilter.toLowerCase()) && (turnoFilter=="Todos" || bedel.turno==turnoFilter))

    return (
        <>
        <div className={styles.buscar_bedel_results_container}>
        <h2>Resultados</h2>
        <div className={styles.table_container}>
            <table>
                <thead>
                    <tr>
                        <th>ACCIONES</th>
                        <th>APELLIDO</th>
                        <th>NOMBRE</th>
                        <th>TURNO</th>
                        <th>IDENTIFICADOR</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBedels.map((bedel)=>
                        <tr key={bedel.identificador}>
                            <td>
                                <button className={styles.editar_btn} onClick={()=>openModifyBedelPopUp(bedel)}>Editar</button>
                                <button className={styles.eliminar_btn} onClick={()=>openDeleteBedelPopUp(bedel)}>Eliminar</button>
                            </td>
                            <td>{bedel.apellido}</td>
                            <td>{bedel.nombre}</td>
                            <td>{bedel.turno}</td>
                            <td>{bedel.identificador}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </div>
        {alterBedelData.showDeletePopUp &&  <DeleteBedelPopUp getAlterBedelData={getAlterBedelData} confirmDeletion={confirmDeletion} closePopUp={closePopUp}/>}
        {alterBedelData.showModifyPopUp &&  <ModifyBedelPopUp getAlterBedelData={getAlterBedelData} confirmModification={confirmModification} closePopUp={closePopUp}/>}
        </>
    )
}

export default BedelResultsTable
