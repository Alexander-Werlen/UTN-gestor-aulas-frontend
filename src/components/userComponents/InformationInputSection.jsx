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
          <select name="tipo_reserva" required value={information.tipo_reserva} onChange={(e)=>setInformation({...information ,tipo_reserva: e.target.value})}>
            <option value="" disabled>Seleccionar</option>
            <option value="Anual">Anual</option>
            <option value="1er Cuatrimestre">1er Cuatrimestre</option>
            <option value="2do Cuatrimestre">2do Cuatrimestre</option>
            <option value="Esporadica">Esporadica</option>
          </select>
        </div>
        <div className={styles.input_section}>
          <div className={styles.input_section_descriptor}>Tipo de aula</div>
          <select name="tipo_aula" required value={information.tipo_aula} onChange={(e)=>setInformation({...information ,tipo_aula: e.target.value})}>
            <option value="" disabled>Seleccionar</option>
            <option value="Multimedia">Multimedia</option>
            <option value="Informatica">Informatica</option>
            <option value="Regular">Regular</option>
          </select>
        </div>
        <div className={styles.input_section}>
          <div className={styles.input_section_descriptor}>Curso</div>
          <select name="curso" required value={information.curso} onChange={(e)=>setInformation({...information ,curso: e.target.value})}>
            <option value="" disabled>Seleccionar</option>
            {
              cursosDisponibles.map((curso) => <option value={curso} key={curso}>{curso}</option>)
            }
          </select>
        </div>
        <div className={styles.input_section}>
          <div className={styles.input_section_descriptor}>Apellido docente</div>
          <input name="apellido" required type="text" value={information.apellido} onChange={(e)=>setInformation({...information ,apellido: e.target.value})} />
        </div>
        <div className={styles.input_section}>
          <div className={styles.input_section_descriptor}>Nombre docente</div>
          <input name="nombre" required type="text" value={information.nombre} onChange={(e)=>setInformation({...information ,nombre: e.target.value})} />
        </div>
        <div className={styles.input_section}>
          <div className={styles.input_section_descriptor}>Correo contacto</div>
          <input name="email" required type="email" value={information.email} onChange={(e)=>setInformation({...information ,email: e.target.value})} />
        </div>
        <div className={styles.input_section}>
          <div className={styles.input_section_descriptor}>Cantidad alumnos</div>
          <input name="cantidad_alumnos" required type="number" min="1" value={information.cantidad_alumnos} onChange={(e)=>setInformation({...information ,cantidad_alumnos: e.target.value})} />
        </div>
        <div className={styles.input_section}>
          <button onClick={(e)=>resetInputs(e)}>limpiar</button>
        </div>
      </div>
    </div>
    
  )
}
  
  export default InformationInputSection
  