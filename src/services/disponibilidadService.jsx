import api from "./api"


const baseEsporadica= "disponibilidad/esporadica" 
const basePeriodica= "disponibilidad/periodica"



export const getDisponibilidadEsporadica = (data) => {
    return api.post(baseEsporadica, data)
}


export const getDisponibilidadPeriodica = (data) => {
    return api.post(basePeriodica, data)
}

export const getDisponibilidad = (data, tipo_reserva) => {
    let base = tipo_reserva.toLowerCase() === "esporadica" ? baseEsporadica : basePeriodica
    return api.post(base, data)
}



export default { getDisponibilidadEsporadica, getDisponibilidadPeriodica, getDisponibilidad }
