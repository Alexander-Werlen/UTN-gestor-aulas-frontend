
const validatePassword = (psw, pswConfirmation) => {

    if(psw!=pswConfirmation) return {
      isValid: false,
      error: "La contraseña repetida no coincide con la original"
    }
    return {
      isValid: true,
      error: null
    }

}

export default validatePassword