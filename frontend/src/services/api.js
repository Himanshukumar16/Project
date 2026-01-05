import axios from 'axios';

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAllStudents = async () => {
    const response = await api.get('/show-student');
    return response.data;
};

export const getStudentById = async (id) => {
    const response = await api.get(`/show-student-by-id-${id}`);
    return response.data;
};

export const addStudent = async (student) => {
    const response = await api.post('/add-student', student);
    return response.data;
};

export const updateStudent = async (id, student) => {
    const response = await api.put(`/update-student-by-id-${id}`, student);
    return response.data;
};

export const deleteStudent = async (id) => {
    const response = await api.delete(`/delete-student-by-id-${id}`);
    return response.data;
};

export default api;
