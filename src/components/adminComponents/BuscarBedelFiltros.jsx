import { useState } from "react"

import styles from "../../styles/adminStyles/buscarBedelFiltros.module.css"

function BuscarBedelFiltros({setApellido, setTurno}) {

  const [apellidoHolder, setApellidoHolder] = useState("")
  const [turnoHolder, setTurnoHolder] = useState("todos")
  
  const resetInputs = (e) => {
    e.preventDefault()
    setApellido("")
    setApellidoHolder("")
    setTurno("todos")
    setTurnoHolder("todos")
  }

  const setFilters = (e) => {
    e.preventDefault()
    setApellido(apellidoHolder)
    setTurno(turnoHolder)
  }

  return (
    
    <>
      <form onSubmit={(e) => setFilters(e)} className={styles.buscar_bedel_input_container}>
        <div className={styles.buscar_bedel_input_section}>
          <label>
            <div className={styles.input_section_descriptor}>Apellido</div>
            <input type="text" value={apellidoHolder} onChange={(e)=>setApellidoHolder(e.target.value)} />
          </label>
        </div>
        <div className={styles.buscar_bedel_input_section}>
          <div className={styles.input_section_descriptor}>Turno</div>
          <select value={turnoHolder} onChange={(e)=>setTurnoHolder(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="mañana">Mañana</option>
            <option value="tarde">Tarde</option>
            <option value="noche">Noche</option>
          </select>
        </div>
        <div className={styles.buscar_bedel_input_section}>
          <input type="submit" value="BUSCAR"/>
        </div>
        <div className={styles.buscar_bedel_input_section}>
          <button onClick={(e)=>resetInputs(e)}>limpiar</button>
        </div>
      </form>
    </>
    
  )
}

export default BuscarBedelFiltros
