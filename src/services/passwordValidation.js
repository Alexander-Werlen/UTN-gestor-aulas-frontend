
const validatePassword = (psw, pswConfirmation) => {

    if(psw!=pswConfirmation) return {
      isValid: false,
      error: "La contraseña repetida no coincide con la original"
    }
    if(!(/\d/.test(psw))) return {
      isValid: false,
      error: "La contraseña debe contener al menos 1 digito"
    }
    if(!(/[A-Z]/.test(psw))) return {
      isValid: false,
      error: "La contraseña debe contener al menos 1 mayúscula"
    }
    if(!(/[@#$%&*]/.test(psw))) return {
      isValid: false,
      error: "La contraseña debe contener al menos 1 caracter especial(@#$%&*)"
    }
    if(psw.length < 8) return {
      isValid: false,
      error: "La contraseña debe tener por lo menos 8 caracteres"
    }
    return {
      isValid: true,
      error: null
    }

}

export default validatePassword