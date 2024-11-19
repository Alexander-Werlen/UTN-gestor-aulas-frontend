import api from "./api";

const baseUrl = "/login";

export const login = ({id , password}) => {
    return api.post(baseUrl, {
        id,
        password
    });
}

export default { login }