import api from "./api"


const baseUrlEsporadica = "reservas/esporadica"
const baseUrlPeriodica = "reservas/periodica"

export const postReservaEsporadica = (data) => {
    return api.post(baseUrlEsporadica, data)
}

export const postReservaPeriodica = (data) => {
    return api.post(baseUrlPeriodica, data)
}


export const postReserva = (data, tipo_reserva) => {
    let baseUrl = tipo_reserva.toLowerCase() === "esporadica" ? baseUrlEsporadica : baseUrlPeriodica
    return api.post(baseUrl, data)
}

export default { postReserva, postReservaEsporadica, postReservaPeriodica }




