import api from "./api";


const baseUrl = "/bedeles";


export const getAllBedeles = () => {
    return api.get(baseUrl);
}

export const getBedelByFilter = (apellido, turno) => {
    return api.get(`${baseUrl}?apellido=${apellido}&turno=${turno}`);
}

export const deleteBedel = (id) => {
    return api.delete(`${baseUrl}/${id}`);
}

export const registerBedel = (bedelData) => {
    return api.post(baseUrl, bedelData);
}

export const modifyBedel = (id, bedelData) => {
    return api.put(`${baseUrl}/${id}`, bedelData);
}





export default { getAllBedeles , deleteBedel , registerBedel , modifyBedel , getBedelByFilter }