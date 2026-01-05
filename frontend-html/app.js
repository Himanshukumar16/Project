
// Constants
const API_BASE = 'http://localhost:8080';

// DOM Elements
const studentGrid = document.getElementById('student-grid');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error-message');
const addStudentBtn = document.getElementById('add-student-btn');
const modalOverlay = document.getElementById('student-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const cancelBtn = document.getElementById('cancel-btn');
const studentForm = document.getElementById('student-form');
const modalTitle = document.getElementById('modal-title');
const submitText = document.getElementById('submit-text');

// State
let isSubmitting = false;

// Icons logic (initialize Lucide)
const initIcons = () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }
};

// API Functions
async function fetchStudents() {
    try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/show-student`);
        if (!res.ok) throw new Error('Failed to fetch students');
        const data = await res.json();
        renderStudents(data);
    } catch (err) {
        showError('Failed to load students. Ensure backend is running.');
    } finally {
        setLoading(false);
    }
}

async function addStudent(student) {
    const res = await fetch(`${API_BASE}/add-student`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
    });
    if (!res.ok) throw new Error('Failed to add student');
    return await res.text();
}

async function updateStudent(id, student) {
    const res = await fetch(`${API_BASE}/update-student-by-id/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
    });
    if (!res.ok) throw new Error('Failed to update student');
    return await res.text();
}

async function deleteStudent(id) {
    const res = await fetch(`${API_BASE}/delete-student-by-id/${id}`, {
        method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete student');
    return await res.text();
}

// UI Functions
function setLoading(isLoading) {
    if (isLoading) {
        loadingDiv.classList.remove('hidden');
        studentGrid.classList.add('hidden');
        errorDiv.classList.add('hidden');
    } else {
        loadingDiv.classList.add('hidden');
        studentGrid.classList.remove('hidden');
    }
}

function showError(msg) {
    errorDiv.textContent = msg;
    errorDiv.classList.remove('hidden');
    loadingDiv.classList.add('hidden');
}

function renderStudents(students) {
    studentGrid.innerHTML = '';

    if (students.length === 0) {
        studentGrid.innerHTML = '<div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #94a3b8;">No students found. Add one to get started!</div>';
        return;
    }

    students.forEach(student => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="student-info">
                <h3 class="student-name">${escapeHtml(student.sFirstName)} ${escapeHtml(student.sLastName)}</h3>
                <div class="student-meta">
                    <span class="student-id">ID: ${student.sId.substring(0, 8)}...</span>
                    <span class="student-marks">Marks: ${student.sMarks}</span>
                </div>
            </div>
            <div class="student-actions">
                <button class="btn btn-outline edit-btn" data-id="${student.sId}">
                    <i data-lucide="pencil" style="width: 16px; height: 16px;"></i>
                </button>
                <button class="btn btn-danger delete-btn" data-id="${student.sId}">
                    <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                </button>
            </div>
        `;

        // Add event listeners to buttons
        const editBtn = card.querySelector('.edit-btn');
        const deleteBtn = card.querySelector('.delete-btn');

        editBtn.addEventListener('click', () => openModal(student));
        deleteBtn.addEventListener('click', () => handleDelete(student.sId));

        studentGrid.appendChild(card);
    });
    initIcons();
}

function openModal(student = null) {
    modalOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    const idInput = document.getElementById('student-id');
    const firstNameInput = document.getElementById('sFirstName');
    const lastNameInput = document.getElementById('sLastName');
    const marksInput = document.getElementById('sMarks');

    if (student) {
        modalTitle.textContent = 'Edit Student';
        submitText.textContent = 'Update Student';
        idInput.value = student.sId;
        firstNameInput.value = student.sFirstName;
        lastNameInput.value = student.sLastName;
        marksInput.value = student.sMarks;
    } else {
        modalTitle.textContent = 'Add New Student';
        submitText.textContent = 'Add Student';
        studentForm.reset();
        idInput.value = '';
    }
}

function closeModal() {
    modalOverlay.classList.add('hidden');
    document.body.style.overflow = '';
}

// Handlers
async function handleDelete(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        try {
            const msg = await deleteStudent(id);
            alert(msg);
            fetchStudents();
        } catch (err) {
            alert('Failed to delete student');
        }
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;

    const formData = new FormData(studentForm);
    const student = {
        sFirstName: formData.get('sFirstName'),
        sLastName: formData.get('sLastName'),
        sMarks: formData.get('sMarks')
    };
    const id = formData.get('sId');

    try {
        isSubmitting = true;
        submitText.textContent = 'Saving...';

        let msg;
        if (id) {
            student.sId = id;
            msg = await updateStudent(id, student);
        } else {
            msg = await addStudent(student);
        }

        closeModal();
        alert(msg);
        fetchStudents();
    } catch (err) {
        console.error(err);
        alert('Failed to save student');
    } finally {
        isSubmitting = false;
        submitText.textContent = id ? 'Update Student' : 'Add Student';
    }
}

function escapeHtml(text) {
    if (!text) return '';
    return text.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Event Listeners
addStudentBtn.addEventListener('click', () => openModal());
closeModalBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);
studentForm.addEventListener('submit', handleFormSubmit);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    fetchStudents();
    initIcons();
});
