
const API_BASE = ''; // Proxy handles the host

export const api = {
    getAllStudents: async () => {
        const res = await fetch(`${API_BASE}/show-student`);
        if (!res.ok) throw new Error('Failed to fetch students');
        return res.json();
    },

    addStudent: async (student) => {
        const res = await fetch(`${API_BASE}/add-student`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student),
        });
        // Backend returns String response, read as text
        if (!res.ok) throw new Error('Failed to add student');
        return res.text();
    },

    updateStudent: async (id, student) => {
        const res = await fetch(`${API_BASE}/update-student-by-id/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...student, sId: id }),
        });
        if (!res.ok) throw new Error('Failed to update student');
        return res.text();
    },

    deleteStudent: async (id) => {
        const res = await fetch(`${API_BASE}/delete-student-by-id/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete student');
        return res.text();
    }
};
