
import styles from "../../styles/adminStyles/buscarBedelFiltros.module.css"

function BuscarBedelFiltros({apellido, setApellido, turno, setTurno}) {

  const resetInputs = (e) => {
    e.preventDefault()
    setApellido("")
    setTurno("Todos")
  }

  return (
    
    <>
      <form onSubmit={()=>{}} className={styles.buscar_bedel_input_container}>
        <div className={styles.buscar_bedel_input_section}>
          <label>
            <div className={styles.input_section_descriptor}>Apellido</div>
            <input type="text" value={apellido} onChange={(e)=>setApellido(e.target.value)} />
          </label>
        </div>
        <div className={styles.buscar_bedel_input_section}>
          <div className={styles.input_section_descriptor}>Turno</div>
          <select value={turno} onChange={(e)=>setTurno(e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Noche">Noche</option>
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
