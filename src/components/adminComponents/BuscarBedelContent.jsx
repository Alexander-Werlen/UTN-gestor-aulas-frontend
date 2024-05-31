import { useState } from "react";
import BedelResultsTable from "./BedelsResultsTable";
import BuscarBedelFiltros from "./BuscarBedelFiltros";

import styles from "../../styles/adminStyles/adminContentSearch.module.css"

function BuscarBedelContent() {

  const [apellido, setApellido] = useState("");
  const [turno, setTurno] = useState("Todos");

  return (
    
    <div className={styles.buscar_bedel_container}>
      <BuscarBedelFiltros apellido={apellido} setApellido={setApellido} turno={turno} setTurno={setTurno}/>
      <BedelResultsTable apellidoFilter={apellido} turnoFilter={turno}/>
    </div>
    
  )
}

export default BuscarBedelContent
