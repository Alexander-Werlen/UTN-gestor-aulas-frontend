import { useState, useEffect } from "react"
import axios from "axios"

import styles from "../../styles/userStyles/informationInputSection.module.css"

function InformationInputSection({information, setInformation, resetInputs}) {

  const [cursosDisponibles, setCursosDisponibles] = useState([])
  const [profesoresDisponibles, setProfesoresDisponibles] = useState([])

  useEffect(() => {
    axios({
        method: 'get',
        url: `http://localhost:3000/cursos`,
    }).then(res => {
        setCursosDisponibles(res.data)
    }).catch(e => {
        console.log(e)
    })

    axios({
      method: 'get',
      url: `http://localhost:3000/docentes`,
    }).then(res => {
      setProfesoresDisponibles(res.data)
    }).catch(e => {
        console.log(e)
    })
  }, [])

  const handleChooseProfesorName = (e) => {
    const profesorId = profesoresDisponibles.filter(p => p[1]===e.target.value && p[2]===information.apellido)[0][0]
    setInformation({...information, nombre:e.target.value, profesorId:profesorId})
  }
  const handleChooseProfesorApellido = (e) => {
    setInformation({...information, apellido:e.target.value, nombre:"", profesorId:0})
  }

  const handleChooseCurso = (e) => {
    const cursoId = cursosDisponibles.filter(c => c[1]==e.target.value)[0][0]
    setInformation({...information, cursoId:cursoId, curso:e.target.value})
  }

  const apellidosProfesoresDisponibles = [... new Set(profesoresDisponibles.map(p => p[2]))]
  const nombresProfesoresDisponibles = [... new Set(profesoresDisponibles.filter(p => p[2]===information.apellido).map(p => p[1]))]
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
          <select name="curso" required value={information.curso} onChange={(e)=>handleChooseCurso(e)}>
            <option value="" disabled>Seleccionar</option>
            {
              cursosDisponibles.map((curso) => <option value={curso[1]} key={curso[1]}>{curso[1]}</option>)
            }
          </select>
        </div>
        <div className={styles.input_section}>
          <div className={styles.input_section_descriptor}>Apellido docente</div>
          <select name="apellido" required value={information.apellido} onChange={(e)=>handleChooseProfesorApellido(e)}>
            <option value="" disabled>Seleccionar</option>
            {
              apellidosProfesoresDisponibles.map((apellido) => <option value={apellido} key={apellido}>{apellido}</option>)
            }
          </select>
        </div>
        <div className={styles.input_section}>
          <div className={styles.input_section_descriptor}>Nombre docente</div>
          <select name="nombre" required value={information.nombre} onChange={(e)=>handleChooseProfesorName(e)}>
            <option value="" disabled>Seleccionar</option>
            {
              nombresProfesoresDisponibles.map((nombre) => <option value={nombre} key={nombre}>{nombre}</option>)
            }
          </select>
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
  