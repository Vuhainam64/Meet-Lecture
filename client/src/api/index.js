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
//get
export const getAllUser = async () => {
    try {
        const res = await axios.get(`${baseURL}/Account`);
        return res.data.data;
    } catch (err) {
        return null;
    }
};
export const getAllBookingByLecturerIDORStudentID = async (id) => {
    try {
        const res = await axios.get(`${baseURL}/Booking/GetAllById/${id}`);
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
export const getAllFeedBackByLecturer = async (id) => {
    try {
        const res = await axios.get(`${baseURL}/Feedback/GetAllById//${id}`);
        return res.data.data;
    } catch (err) {
        return null;
    }
};
export const getAllSubject = async () => {
    try {
        const res = await axios.get(`${baseURL}/Subject`);
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

export const searchStudentById = async (id) => {
    try {
        const res = await axios.get(`${baseURL}/Account/${id}`);
        return res.data.data;
    } catch (err) {
        return null;
    }
};

export const searchSubjectById = async (id) => {
    try {
        const res = await axios.get(`${baseURL}/Subject/${id}`);
        return res.data.data;
    } catch (err) {
        return null;
    }
};
export const searchSlotById = async (id) => {
    try {
        const res = await axios.get(`${baseURL}/Slot/${id}`);
        return res.data.data;
    } catch (err) {
        console.error('Error in searchSlotById:', err);
        return {};
    }
};
export const searchBookingById = async (id) => {
    try {
        const res = await axios.get(`${baseURL}/Booking/${id}`);
        return res.data.data;
    } catch (err) {
        return null;
    }
};
//create
export const createAccount= async (form) => {
    try {
        const res = await axios.post(`${baseURL}/Account`,form);
        // Check if the response status is 200 OK
        if (res.status === 200) {
            console.log('Account create successfully.');
        } else {
            console.log(`Received status ${res.status} from the server.`);
        }
    } catch (err) {
        // Log the detailed error message
        console.error('Error create account:', err);
    }
}
export const createCourse= async (form) => {
    try {
        const res = await axios.post(`${baseURL}/Subject`,form);
        // Check if the response status is 200 OK
        if (res.status === 200) {
            console.log('Subject create successfully.');
        } else {
            console.log(`Subject status ${res.status} from the server.`);
        }
    } catch (err) {
        // Log the detailed error message
        console.error('Error create course:', err);
    }
}
export const createSlot= async (form) => {
    try {
        const res = await axios.post(`${baseURL}/Slot`,form);
        // Check if the response status is 200 OK
        if (res.status === 200) {
            console.log('Slot create successfully.');
        } else {
            console.log(`Slot status ${res.status} from the server.`);
        }
    } catch (err) {
        // Log the detailed error message
        console.error('Error create slot:', err);
    }
}


//delete
export const deleteAccountById = async (id) => {
    try {
        const res = await axios.delete(`${baseURL}/Account/${id}`);
        // Check if the response status is 200 OK
        if (res.status === 200) {
            console.log('Account deleted successfully.');
        } else {
            console.log(`Received status ${res.status} from the server.`);
        }
    } catch (err) {
        // Log the detailed error message
        console.error('Error deleting account:', err);
    }
}
export const deleteSubjectById = async (id) => {
    try {
        const res = await axios.delete(`${baseURL}/Subject/${id}`);
        // Check if the response status is 200 OK
        if (res.status === 200) {
            console.log('subject deleted successfully.');
        } else {
            console.log(`Received status ${res.status} from the server.`);
        }
    } catch (err) {
        // Log the detailed error message
        console.error('Error deleting subject:', err);
    }
}
export const deleteSlotById = async (id) => {
    try {
        const res = await axios.delete(`${baseURL}/Slot/${id}`);
        // Check if the response status is 200 OK
        if (res.status === 200) {
            console.log('subject deleted successfully.');
        } else {
            console.log(`Received status ${res.status} from the server.`);
        }
    } catch (err) {
        // Log the detailed error message
        console.error('Error deleting subject:', err);
    }
}
export const deleteRequestById = async (id) => {
    try {
        const res = await axios.delete(`${baseURL}/Request/${id}`);
        // Check if the response status is 200 OK
        if (res.status === 200) {
            console.log('subject deleted successfully.');
        } else {
            console.log(`Received status ${res.status} from the server.`);
        }
    } catch (err) {
        // Log the detailed error message
        console.error('Error deleting subject:', err);
    }
}
//update
export const updateAccountById= async (form,id) => {
    try {
        const res = await axios.put(`${baseURL}/Account/${id}`,form);
        // Check if the response status is 200 OK
        if (res.status === 200) {
            console.log('Subject update successfully.');
        } else {
            console.log(`Subject status ${res.status} from the server.`);
        }
    } catch (err) {
        // Log the detailed error message
        console.error('Error update course:', err);
    }
}
export const updateCourseById= async (form,id) => {
    try {
        const res = await axios.put(`${baseURL}/Subject/${id}`,form);
        // Check if the response status is 200 OK
        if (res.status === 200) {
            console.log('Subject update successfully.');
        } else {
            console.log(`Subject status ${res.status} from the server.`);
        }
    } catch (err) {
        // Log the detailed error message
        console.error('Error update Subject:', err);
    }
}
export const updateBookingById= async (form,id) => {
    try {
        const res = await axios.put(`${baseURL}/Booking/${id}`,form);
        // Check if the response status is 200 OK
        if (res.status === 200) {
            console.log('Slot update successfully.');
        } else {
            console.log(`Slot status ${res.status} from the server.`);
        }
    } catch (err) {
        // Log the detailed error message
        console.error('Error update slot:', err);
    }
}
export const updateSlotById= async (form,id) => {
    try {
        const res = await axios.put(`${baseURL}/Slot/${id}`,form);
        // Check if the response status is 200 OK
        if (res.status === 200) {
            console.log('Slot update successfully.');
        } else {
            console.log(`Slot status ${res.status} from the server.`);
        }
    } catch (err) {
        // Log the detailed error message
        console.error('Error update slot:', err);
    }
}

