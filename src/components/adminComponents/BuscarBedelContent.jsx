import { useState } from "react";
import BedelResultsTable from "./BedelsResultsTable";
import BuscarBedelFiltros from "./BuscarBedelFiltros";


function BuscarBedelContent() {

  const [apellido, setApellido] = useState("");
  const [turno, setTurno] = useState("todos");

  return (
    
    <div>
      <BuscarBedelFiltros setApellido={setApellido} setTurno={setTurno}/>
      <BedelResultsTable apellidoFilter={apellido} turnoFilter={turno}/>
    </div>
    
  )
}

export default BuscarBedelContent
