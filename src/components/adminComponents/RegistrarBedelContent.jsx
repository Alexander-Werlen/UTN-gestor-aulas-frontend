import { useState, useEffect } from "react"
import validatePassword from "../../utils/passwordValidation"

import styles from "../../styles/adminStyles/registrarBedelContent.module.css"
import bedelService from "../../services/bedelService"
import Alert from "../general/Alert"
import axios from "axios"

function RegistrarBedelContent() {

  const [apellido, setApellido] = useState("")
  const [nombre, setNombre] = useState("")
  const [identificador, setIdentificador] = useState("")
  const [turno, setTurno] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [contraseñaConfirmacion, setContraseñaConfirmacion] = useState("")
  const [restriccionesContraseña, setRestriccionesContraseña] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/validaciones/password").then(r => {
      setRestriccionesContraseña(r.data)
    }).catch(e => console.log(e))
  }, [])

  const [message, setMessage] = useState({
    open: false,
    text: "",
    severity: "warning",
    positionX: "center",
    positionY: "bottom",
    autoCloseDuration: undefined

  })

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
    if (!validation.isValid) {
      //handle error
      setMessage({
        open: true,
        text: validation.error,
        severity: "error",
        positionX: "center",
        positionY: "bottom",
        autoCloseDuration: 5000
      })
      console.log(validation.error)
      return;
    }
    const bedelData = packInputData()
    //PUT API call
    bedelService.registerBedel(bedelData)
    .then(() => {
      resetInputs()
      //### Avisar exito
      setMessage({
        open: true,
        text: "Bedel registrado con éxito",
        severity: "success",
        positionX: "center",
        positionY: "bottom",
        autoCloseDuration: 5000
      })
    }).catch(e => {
      //### Avisar error
      let error = e.response.data.error
      if (error.constructor === Array) error = error[0]
      setMessage({
        open: true,
        text: error,
        severity: "error",
        positionX: "center",
        positionY: "bottom",
        autoCloseDuration: 5000
      })
      console.log(e)
    })
  }

  return (

    <div className={styles.register_container}>
      <form onSubmit={(e) => tryRegistration(e)}>
        <header className={styles.header_container}>
          <h2>REGISTRAR BEDEL</h2>
        </header>
        <div className={styles.content_container}>
          <label>Apellido
            <input type="text" required value={apellido} onChange={(e) => setApellido(e.target.value)}></input>
          </label>
          <label>Nombre
            <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)}></input>
          </label>
          <label>Identificador
            <input type="text" required value={identificador} onChange={(e) => setIdentificador(e.target.value)}></input>
          </label>
          <label>Turno
            <select value={turno} required onChange={(e) => setTurno(e.target.value)} className={styles.hide_disabled_option}>
              <option value="" disabled>Seleccionar</option>
              <option value="Mañana">Mañana</option>
              <option value="Tarde">Tarde</option>
              <option value="Noche">Noche</option>
            </select>
          </label>
          <label>Contraseña
            <input type="password" required value={contraseña} onChange={(e) => setContraseña(e.target.value)}></input>
          </label>
          <label>Confirmar contraseña
            <input type="password" required value={contraseñaConfirmacion} onChange={(e) => setContraseñaConfirmacion(e.target.value)}></input>
            <div className={styles.warning_msg}>
              {restriccionesContraseña.map(restriccion => <p key={restriccion}>{restriccion}</p>)}
            </div>
          </label>
          <div className={styles.btn_section_container}>
            <button type="submit"  className={styles.registrar_btn}>
              Registrar
            </button>
            <button
              type="button"
             onClick={() => resetInputs()} className={styles.limpiar_btn}>Limpiar</button>
          </div>
        </div>

      </form>
      {message.open && <Alert severity={message.severity} text={message.text} positionX={message.positionX} positionY={message.positionY} onClose={ () => setMessage({open: false})}
      autoCloseDuration={message.autoCloseDuration} />}
    </div>

  )
}

export default RegistrarBedelContent
