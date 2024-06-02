import { useState } from "react"

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
          contraseña: contraseña,
          identificador: identificador
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

  const validatePassword = (psw, pswConfirmation) => {

    if(psw!=pswConfirmation) return {
      isValid: false,
      error: "bad confirmation"
    }
    if(!(/\d/.test(psw))) return {
      isValid: false,
      error: "lacks digit"
    }
    if(!(/[A-Z]/.test(psw))) return {
      isValid: false,
      error: "lacks uppercase"
    }
    if(!(/[@#$%&*]/.test(psw))) return {
      isValid: false,
      error: "lacks special char"
    }
    if(psw.length < 8) return {
      isValid: false,
      error: "not enough chars"
    }
    return {
      isValid: true,
      error: null
    }

  }

  const tryRegistration = () => {
      const validation = validatePassword(contraseña, contraseñaConfirmacion)
      if(!validation.isValid) {
        //handle error
        console.log(validation.error)
        return;
      }
      const bedelData = packInputData()
      console.log(bedelData)
      resetInputs()
      //PUT API call
      //handle API response
  }

  return (
      
    <div className={styles.register_container}>
        <div className={styles.input_section_container}>
          <div className={styles.header_container}>
          <h2>REGISTRAR BEDEL</h2>
          </div>
          <h4>Apellido</h4>
          <input type="text" value={apellido} onChange={(e)=>setApellido(e.target.value)}></input>
          <h4>Nombre</h4>
          <input type="text" value={nombre} onChange={(e)=>setNombre(e.target.value)}></input>
          <h4>Identificador</h4>
          <input type="text" value={identificador} onChange={(e)=>setIdentificador(e.target.value)}></input>
          <h4>Turno</h4>
          <select value={turno} onChange={(e)=>setTurno(e.target.value)}>
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Noche">Noche</option>
            <option value="" disabled>Seleccionar</option>
          </select>
          <h4>Contraseña</h4>
          <input type="password" value={contraseña} onChange={(e)=>setContraseña(e.target.value)}></input>
          <h4>Confirmar contraseña</h4>
          <input type="password" value={contraseñaConfirmacion} onChange={(e)=>setContraseñaConfirmacion(e.target.value)}></input>
          <div className={styles.warning_msg}>
              <p>La contraseña debe contener al menos un dígito.</p>
              <p>Debe contener al menos una letra mayúscula</p>
              <p>Debe contener signos especiales (@#$%&*)</p>
              <p>Debe tener por lo menos 8 caracteres</p>
          </div>
        </div>
        <div className={styles.btn_section_container}>
            <button onClick={() => tryRegistration()} className={styles.registrar_btn}>Registrar</button>
            <button onClick={() => resetInputs()} className={styles.limpiar_btn}>Limpiar</button>
        </div>
    </div>
      
  )
  }
  
  export default RegistrarBedelContent
  