import React, { useEffect, useState } from 'react';
import { getAllStudents, deleteStudent } from '../services/api';
import StudentCard from '../components/StudentCard';
import { Users, Search, Loader2 } from 'lucide-react';

const Home = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const data = await getAllStudents();
            setStudents(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch students. Please check if the backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await deleteStudent(id);
                fetchStudents(); // Refresh list
            } catch (err) {
                alert('Failed to delete student');
            }
        }
    };

    const filteredStudents = students.filter(student =>
        student.sFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.sLastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-accent" />
            </div>
        );
    }

    return (
        <div className="container">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
                    <p className="text-text-secondary">Manage your student records</p>
                </div>

                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                    <input
                        type="text"
                        placeholder="Search students..."
                        className="input-field pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {error ? (
                <div className="rounded-lg border border-danger/20 bg-danger/10 p-4 text-danger text-center">
                    {error}
                </div>
            ) : filteredStudents.length === 0 ? (
                <div className="glass-panel flex flex-col items-center justify-center py-16 text-center">
                    <Users className="mb-4 h-16 w-16 text-text-secondary/20" />
                    <h3 className="text-xl font-medium text-text-primary">No Students Found</h3>
                    <p className="mt-2 text-text-secondary">Get started by adding a new student.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredStudents.map(student => (
                        <StudentCard
                            key={student.sId}
                            student={student}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
