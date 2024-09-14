import { useState } from "react"
import validatePassword from "../../services/passwordValidation"
import axios from 'axios'

import styles from "../../styles/adminStyles/registrarBedelContent.module.css"

function RegistrarBedelContent() {

  const [apellido, setApellido] = useState("")
  const [nombre, setNombre] = useState("")
  const [identificador, setIdentificador] = useState("")
  const [turno, setTurno] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [contraseñaConfirmacion, setContraseñaConfirmacion] = useState("")

  const packInputData = () => {
      return {
          apellido: apellido,
          nombre: nombre,
          turno: turno,
          password: contraseña,
          id: identificador
      }
  }

  const resetInputs = () => {
    setApellido("")
    setNombre("")
    setIdentificador("")
    setTurno("")
    setContraseña("")
    setContraseñaConfirmacion("")
  }


  const tryRegistration = (e) => {
    e.preventDefault()
      const validation = validatePassword(contraseña, contraseñaConfirmacion)
      if(!validation.isValid) {
        //handle error
        alert(validation.error)
        console.log(validation.error)
        return;
      }
      const bedelData = packInputData()
      resetInputs()
      //PUT API call
      axios({
        method: 'post',
        url: `http://localhost:3000/bedeles`,
        data: bedelData
      }).then(response => {
          //### Avisar exito
          alert("Bedel registrado con exito")
          console.log(response)
      }).catch(e => {
          //### Avisar error
          alert("No se pudo registrar el bedel")
          console.log(e)
      })
  }

  return (
      
    <div className={styles.register_container}>
        <form onSubmit={(e) => tryRegistration(e)}>
        <div>
            <div className={styles.header_container}>
            <h2>REGISTRAR BEDEL</h2>
            </div>
            <h4>Apellido</h4>
            <input type="text" required value={apellido} onChange={(e)=>setApellido(e.target.value)}></input>
            <h4>Nombre</h4>
            <input type="text" required value={nombre} onChange={(e)=>setNombre(e.target.value)}></input>
            <h4>Identificador</h4>
            <input type="text" required value={identificador} onChange={(e)=>setIdentificador(e.target.value)}></input>
            <h4>Turno</h4>
            <select value={turno} required onChange={(e)=>setTurno(e.target.value)} className={styles.hide_disabled_option}>
              <option value="" disabled>Seleccionar</option>
              <option value="Mañana">Mañana</option>
              <option value="Tarde">Tarde</option>
              <option value="Noche">Noche</option>
            </select>
            <h4>Contraseña</h4>
            <input type="password" required value={contraseña} minLength={8}  onChange={(e)=>setContraseña(e.target.value)}></input>
            <h4>Confirmar contraseña</h4>
            <input type="password" required value={contraseñaConfirmacion} onChange={(e)=>setContraseñaConfirmacion(e.target.value)}></input>
            <div className={styles.warning_msg}>
                <p>La contraseña debe contener al menos un dígito.</p>
                <p>Debe contener al menos una letra mayúscula</p>
                <p>Debe contener signos especiales (@#$%&*)</p>
                <p>Debe tener por lo menos 8 caracteres</p>
            </div>
        </div>
        <div className={styles.btn_section_container}>
            <input type="submit" value="Registrar" className={styles.registrar_btn}></input>
            <button onClick={() => resetInputs()} className={styles.limpiar_btn}>Limpiar</button>
        </div>
        </form>
    </div>
      
  )
  }
  
  export default RegistrarBedelContent
  