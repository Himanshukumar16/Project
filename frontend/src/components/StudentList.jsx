
import React from 'react';
import Card from './Card';
import Button from './Button';
import { Pencil, Trash2 } from 'lucide-react';
import './StudentList.css';

const StudentList = ({ students, onEdit, onDelete }) => {
    if (!students || students.length === 0) {
        return (
            <div className="empty-state">
                <p>No students found. Add one to get started!</p>
            </div>
        );
    }

    return (
        <div className="student-grid">
            {students.map(student => (
                <Card key={student.sId} className="student-card">
                    <div className="student-info">
                        <h3 className="student-name">{student.sFirstName} {student.sLastName}</h3>
                        <div className="student-meta">
                            <span className="student-id">ID: {student.sId.substring(0, 8)}...</span>
                            <span className="student-marks">Marks: {student.sMarks}</span>
                        </div>
                    </div>
                    <div className="student-actions">
                        <Button
                            variant="outline"
                            className="action-btn"
                            onClick={() => onEdit(student)}
                            aria-label="Edit student"
                        >
                            <Pencil size={16} />
                        </Button>
                        <Button
                            variant="danger"
                            className="action-btn"
                            onClick={() => onDelete(student.sId)}
                            aria-label="Delete student"
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default StudentList;
