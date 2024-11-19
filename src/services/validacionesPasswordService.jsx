import api from "./api";



const baseUrl = "validaciones/password";

export const getRestriccionesContrasena =  () => {
    return api.get(baseUrl)
    
}

export default { getRestriccionesContrasena }

