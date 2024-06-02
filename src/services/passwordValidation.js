
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

export default validatePassword