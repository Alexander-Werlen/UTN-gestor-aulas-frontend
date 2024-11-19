import { useState, useEffect } from "react"
import DeleteBedelPopUp from "./DeleteBedelPopUp"
import ModifyBedelPopUp from "./ModifyBedelPopUp"
import styles from "../../styles/adminStyles/bedelsResultsTable.module.css"
import bedelService from "../../services/bedelService"
import Alert from "../general/Alert"

function BedelResultsTable({ apellidoFilter, turnoFilter }) {

    const [bedels, setBedels] = useState([])
    //refreshTable bedels after deletion or modification
    const [refreshTable, setRefreshTable] = useState(false)
    


    const defaultAlterBedelData = {
        showDeletePopUp: false,
        showModifyPopUp: false,
        apellido: null,
        nombre: null,
        identificador: null,
        turno: null
    }

    const [alterBedelData, setAlterBedelData] = useState(defaultAlterBedelData)

    const [message, setMessage] = useState({
        open: false,
        text: "",
        severity: "warning",
        positionX: "center",
        positionY: "bottom",
        autoCloseDuration: undefined
    })


    useEffect(() => {
        bedelService.getBedelByFilter(apellidoFilter, turnoFilter)
            .then(bedeles => {
                console.log(bedeles)
                let datosBedeles = bedeles.data.map(bedel => {
                    return {
                        apellido: bedel.apellido,
                        nombre: bedel.nombre,
                        turno: bedel.turno,
                        identificador: bedel.id
                    }
                })
                setBedels(datosBedeles)
            }).catch(e => {
                console.log(e)
            })
    }, [apellidoFilter, turnoFilter, refreshTable ])


    const confirmDeletion = (identificador) => {
        //###send API deletion 
        bedelService.deleteBedel(identificador)
            .then(() => {
                setMessage({
                    open: true,
                    text: "Bedel eliminado correctamente",
                    severity: "success",
                    positionX: "center",
                    positionY: "bottom",
                    autoCloseDuration: 8000
                })


            }).catch(() => {
                setMessage({
                    open: true,
                    text: "Error al eliminar el bedel",
                    severity: "error",
                    positionX: "center",
                    positionY: "bottom",
                    autoCloseDuration: 8000
                })

            })
            setRefreshTable((prev) => !prev)
        closePopUp()
    }

    const confirmModification = (modifiedBedel) => {
        //### send API modification
        const id = modifiedBedel.identificador
        const data = {
            apellido: modifiedBedel.apellido,
            nombre: modifiedBedel.nombre,
            turno: modifiedBedel.turno,
            contraseña: modifiedBedel.password
        }
        bedelService.modifyBedel(id, data)
            .then(() => {
                setMessage({
                    open: true,
                    text: "Bedel modificado correctamente",
                    severity: "success",
                    positionX: "center",
                    positionY: "bottom",
                    autoCloseDuration: 8000
                })
            }).catch( ()=> {
                setMessage({
                    open: true,
                    text: "Error al modificar el bedel",
                    severity: "error",
                    positionX: "center",
                    positionY: "bottom",
                    autoCloseDuration: 8000
                })
            })
        setRefreshTable((prev) => !prev)
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
        setAlterBedelData({
            showDeletePopUp: true,
            showModifyPopUp: false,
            apellido: bedelSelected.apellido,
            nombre: bedelSelected.nombre,
            identificador: bedelSelected.identificador,
            turno: bedelSelected.turno
        })
    }

    const openModifyBedelPopUp = (bedelSelected) => {
        setAlterBedelData({
            showDeletePopUp: false,
            showModifyPopUp: true,
            apellido: bedelSelected.apellido,
            nombre: bedelSelected.nombre,
            identificador: bedelSelected.identificador,
            turno: bedelSelected.turno
        })
    }




    return (
        <>
            <div className={styles.buscar_bedel_results_container}>
                <h2 className={styles.h2}>Resultados</h2>
                <div className={styles.table_container}>
                    <table className={styles.table}>
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
                            {bedels.map(bedel =>
                                <tr key={bedel.identificador}>
                                    <td>
                                        <button className={styles.editar_btn} onClick={() => openModifyBedelPopUp(bedel)}>Editar</button>
                                        <button className={styles.eliminar_btn} onClick={() => openDeleteBedelPopUp(bedel)}>Eliminar</button>
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
            {alterBedelData.showDeletePopUp && <DeleteBedelPopUp getAlterBedelData={getAlterBedelData} confirmDeletion={confirmDeletion} closePopUp={closePopUp} />}
            {alterBedelData.showModifyPopUp && <ModifyBedelPopUp getAlterBedelData={getAlterBedelData} confirmModification={confirmModification} closePopUp={closePopUp} />}
            {message.open && <Alert severity={message.severity} text={message.text} positionX={message.positionX} positionY={message.positionY} autoCloseDuration={message.autoCloseDuration} onClose={() => setMessage({ open: false })} />}

        </>
    )
}

export default BedelResultsTable
