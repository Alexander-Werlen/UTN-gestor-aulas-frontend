import { useState } from "react";
import BedelResultsTable from "./BedelsResultsTable";
import BuscarBedelFiltros from "./BuscarBedelFiltros";

import styles from "../../styles/adminStyles/adminContentSearch.module.css"

function BuscarBedelContent() {

  const [apellido, setApellido] = useState("");
  const [turno, setTurno] = useState("Todos");

  return (
    
    <div className={styles.buscar_bedel_container}>
      <BuscarBedelFiltros setApellido={setApellido} setTurno={setTurno}/>
      <BedelResultsTable apellidoFilter={apellido} turnoFilter={turno}/>
    </div>
    
  )
}

export default BuscarBedelContent
