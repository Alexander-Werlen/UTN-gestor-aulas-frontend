import api from "./api";

const baseUrl = "docentes";

export const getDocentes =  () => {
    return api.get(baseUrl)
    
}

export const getDocenteById =  (id) => {
    return api.get(baseUrl + `/${id}`)
    
}



export default { getDocentes, getDocenteById }