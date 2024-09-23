import api from "./api"

const baseUrl = "cursos"

export const getCursos = () => {
    return api.get(baseUrl)
}

export default { getCursos }


