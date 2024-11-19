import api from "./api";



const baseUrl = "validaciones/password";

export const getRestriccionesContraseña =  () => {
    return api.get(baseUrl)
    
}

export default { getRestriccionesContraseña }

