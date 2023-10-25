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

export const getAllSlotByLecturerID = async (id) => {
    try {
        const res = await axios.get(`${baseURL}/Slot/GetAllById/${id}`);
        return res.data.data;
    } catch (err) {
        return null;
    }
};
export const getAllRequestByLecturerORStudentID = async (id) => {
    try {
        const res = await axios.get(`${baseURL}/Request/GetAllById//${id}`);
        return res.data.data;
    } catch (err) {
        return null;
    }
};
export const searchTeacherById = async (id) => {
    try {
        const res = await axios.get(`${baseURL}/Account/${id}`);
        return res.data.data;
    } catch (err) {
        return null;
    }
};
