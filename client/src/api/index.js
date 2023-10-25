import axios from "axios";

export const baseURL =
    "https://meetmylecturer1.azurewebsites.net/api";

export const validateUserJWTToken = async (token) => {
    try {
        const res = await axios.get(`${baseURL}/api/users/jwtVerfication`, {
            headers: {
                Authorization: "Bearer " + token
            },
        });
        return res.data.data;
    } catch (err) {
        return null;
    }
};

export const getAllUser = async () => {
    try {
        const res = await axios.get(`${baseURL}/Account`);
        return res.data.data;
    } catch (err) {
        return null;
    }
};