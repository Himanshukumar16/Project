
import React, { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import './StudentForm.css';

const StudentForm = ({ student, onSubmit, onCancel, isSubmitting }) => {
    const [formData, setFormData] = useState({
        sFirstName: '',
        sLastName: '',
        sMarks: ''
    });

    useEffect(() => {
        if (student) {
            setFormData({
                sFirstName: student.sFirstName || '',
                sLastName: student.sLastName || '',
                sMarks: student.sMarks || ''
            });
        } else {
            setFormData({ sFirstName: '', sLastName: '', sMarks: '' });
        }
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="student-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <Input
                    label="First Name"
                    name="sFirstName"
                    value={formData.sFirstName}
                    onChange={handleChange}
                    placeholder="e.g. John"
                    required
                />
                <Input
                    label="Last Name"
                    name="sLastName"
                    value={formData.sLastName}
                    onChange={handleChange}
                    placeholder="e.g. Doe"
                    required
                />
            </div>
            <Input
                label="Marks"
                name="sMarks"
                value={formData.sMarks}
                onChange={handleChange}
                placeholder="e.g. 85"
                required
            />

            <div className="form-actions">
                <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
                    Cancel
                </Button>
                <Button type="submit" isLoading={isSubmitting}>
                    {student ? 'Update Student' : 'Add Student'}
                </Button>
            </div>
        </form>
    );
};

export default StudentForm;
