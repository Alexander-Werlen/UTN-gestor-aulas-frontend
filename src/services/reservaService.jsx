import api from "./api"


const baseUrlEsporadica = "reservas/esporadica"
const baseUrlPeriodica = "reservas/periodica"

export const postReservaEsporadica = (data) => {
    data.bedel_id = localStorage.getItem("id")
    return api.post(baseUrlEsporadica, data)
}

export const postReservaPeriodica = (data) => {
    data.bedel_id = localStorage.getItem("id")
    return api.post(baseUrlPeriodica, data)
}


export const postReserva = (data, tipo_reserva) => {
    data.bedel_id = localStorage.getItem("id")
    let baseUrl = tipo_reserva.toLowerCase() === "esporadica" ? baseUrlEsporadica : baseUrlPeriodica
    return api.post(baseUrl, data)
}

export default { postReserva, postReservaEsporadica, postReservaPeriodica }




