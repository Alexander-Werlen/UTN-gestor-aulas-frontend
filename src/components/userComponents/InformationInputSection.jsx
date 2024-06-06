import { useState, useEffect } from "react"

import styles from "../../styles/userStyles/informationInputSection.module.css"

function InformationInputSection({information, setInformation, resetInputs}) {

  const [cursosDisponibles, setCursosDisponibles] = useState([])

  useEffect(() => {
      //simula conseguir cursos
      setTimeout(() => setCursosDisponibles(["Diseño", "Bases de datos", "Analisis"]), 20)
  }, [])

  return (
    
    <div>
      <h2>INFORMACIÓN</h2>
      <div className={styles.inputs_container}>
        <div className={styles.input_section}>
          <div className={styles.input_section_descriptor}>Tipo de reserva</div>
          <select value={information.tipo_reserva} onChange={(e)=>setInformation({...information ,tipo_reserva: e.target.value})}>
            <option value="Anual">Anual</option>
            <option value="1er Cuatrimestre">1er Cuatrimestre</option>
            <option value="2do Cuatrimestre">2do Cuatrimestre</option>
            <option value="Esporadica">Esporadica</option>
            <option value="" disabled>Seleccionar</option>
          </select>
        </div>
        <div className={styles.input_section}>
          <div className={styles.input_section_descriptor}>Tipo de aula</div>
          <select value={information.tipo_aula} onChange={(e)=>setInformation({...information ,tipo_aula: e.target.value})}>
            <option value="Multimedia">Multimedia</option>
            <option value="Informatica">Informatica</option>
            <option value="Regular">Regular</option>
            <option value="" disabled>Seleccionar</option>
          </select>
        </div>
        <div className={styles.input_section}>
          <div className={styles.input_section_descriptor}>Curso</div>
          <select value={information.curso} onChange={(e)=>setInformation({...information ,curso: e.target.value})}>
            {
              cursosDisponibles.map((curso) => <option value={curso} key={curso}>{curso}</option>)
            }
            <option value="" disabled>Seleccionar</option>
          </select>
        </div>
        <div className={styles.input_section}>
          <div className={styles.input_section_descriptor}>Apellido docente</div>
          <input type="text" value={information.apellido} onChange={(e)=>setInformation({...information ,apellido: e.target.value})} />
        </div>
        <div className={styles.input_section}>
          <div className={styles.input_section_descriptor}>Nombre docente</div>
          <input type="text" value={information.nombre} onChange={(e)=>setInformation({...information ,nombre: e.target.value})} />
        </div>
        <div className={styles.input_section}>
          <div className={styles.input_section_descriptor}>Correo contacto</div>
          <input type="email" value={information.email} onChange={(e)=>setInformation({...information ,email: e.target.value})} />
        </div>
        <div className={styles.input_section}>
          <div className={styles.input_section_descriptor}>Cantidad alumnos</div>
          <input type="number" min="1" value={information.cantidad_alumnos} onChange={(e)=>setInformation({...information ,cantidad_alumnos: e.target.value})} />
        </div>
        <div className={styles.input_section}>
          <button onClick={(e)=>resetInputs(e)}>limpiar</button>
        </div>
      </div>
    </div>
    
  )
}
  
  export default InformationInputSection
  