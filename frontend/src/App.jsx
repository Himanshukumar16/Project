
import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import Modal from './components/Modal';
import Button from './components/Button';
import { Plus } from 'lucide-react';
import './App.css';

import Toast from './components/Toast';

function App() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const data = await api.getAllStudents();
      setStudents(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load students. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddClick = () => {
    setCurrentStudent(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (student) => {
    setCurrentStudent(student);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const msg = await api.deleteStudent(id);
        showToast(msg, 'success');
        fetchStudents();
      } catch (err) {
        showToast('Failed to delete student', 'error');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      let msg;
      if (currentStudent) {
        msg = await api.updateStudent(currentStudent.sId, formData);
      } else {
        msg = await api.addStudent(formData);
      }
      setIsModalOpen(false);
      showToast(msg, 'success');
      fetchStudents();
    } catch (err) {
      console.error(err);
      showToast('Failed to save student info', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>Student Management</h1>
          <Button onClick={handleAddClick}>
            <Plus size={20} />
            Add Student
          </Button>
        </div>
      </header>

      <main className="app-main">
        {error ? (
          <div className="error-message">{error}</div>
        ) : isLoading ? (
          <div className="loading">Loading students...</div>
        ) : (
          <StudentList
            students={students}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentStudent ? 'Edit Student' : 'Add New Student'}
      >
        <StudentForm
          student={currentStudent}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
