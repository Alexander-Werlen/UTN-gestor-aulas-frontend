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
  <form onSubmit={(e) => setFilters(e)} className={styles.form_Buscar_Bedel}>
      <div className={styles.input_section}>
        <label htmlFor="apellido">
          Apellido
          <input
            id="apellido"
            type="text"
            value={apellidoHolder}
            onChange={(e) => setApellidoHolder(e.target.value)}
            className={styles.input_text}
          />
        </label>
      </div>

      <div className={styles.input_section}>
        <label htmlFor="turno">
          Turno
          <select
            id="turno"
            value={turnoHolder}
            onChange={(e) => setTurnoHolder(e.target.value)}
            className={styles.select_text}
          >
            <option value="todos">Todos</option>
            <option value="mañana">Mañana</option>
            <option value="tarde">Tarde</option>
            <option value="noche">Noche</option>
          </select>
        </label>
      </div>

      <div className={styles.button_Section}>
        <button type="submit"  className={styles.button_Buscar}>
          Buscar
          </button>
        <button type="button" onClick={(e) => resetInputs(e)} className={styles.button_Limpiar}>
          Limpiar
        </button>
      </div>
  </form>
</>

    
  )
}

export default BuscarBedelFiltros
