import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addStudent, getStudentById, updateStudent } from '../services/api';
import { Save, ArrowLeft, Loader2, CheckCircle, RefreshCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [student, setStudent] = useState({
        sFirstName: '',
        sLastName: '',
        sMarks: ''
    });
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEditMode);
    const [error, setError] = useState(null);
    const [savedId, setSavedId] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            fetchStudent();
        }
    }, [id]);

    const fetchStudent = async () => {
        try {
            const data = await getStudentById(id);
            setStudent(data);
        } catch (err) {
            setError('Failed to fetch student details');
        } finally {
            setInitialLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isEditMode) {
                await updateStudent(id, student);
                navigate('/');
            } else {
                const response = await addStudent(student);
                // Assuming response is the student object which contains sId
                // Based on standard patterns, if addStudent returns response.data, and backend returns the object.
                // If backend returns just ID, adjust accordingly. 
                // Using 'sId' based on StudentCard usage.
                if (response && response.sId) {
                    setSavedId(response.sId);
                } else {
                    // Fallback if structure is different
                    navigate('/');
                }
            }
        } catch (err) {
            console.error(err);
            setError(`Failed to ${isEditMode ? 'update' : 'add'} student. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSavedId(null);
        setStudent({
            sFirstName: '',
            sLastName: '',
            sMarks: ''
        });
    };

    if (initialLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-accent" />
            </div>
        );
    }

    if (savedId) {
        return (
            <div className="container max-w-2xl">
                <div className="glass-panel p-12 text-center animate-in fade-in zoom-in duration-300">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-success/20 p-4 ring-2 ring-success/30">
                            <CheckCircle className="h-16 w-16 text-success" />
                        </div>
                    </div>

                    <h2 className="mb-2 text-3xl font-bold text-text-primary">Success!</h2>
                    <p className="mb-8 text-lg text-text-secondary">Student has been successfully added to the system.</p>

                    <div className="mb-8 rounded-xl bg-bg-secondary p-6 border border-border">
                        <p className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-2">Generated Student ID</p>
                        <p className="text-4xl font-mono font-bold text-accent tracking-widest">{savedId}</p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <button
                            onClick={handleReset}
                            className="btn-primary flex items-center justify-center gap-2"
                        >
                            <RefreshCcw className="h-5 w-5" />
                            Add Another Student
                        </button>

                        <button
                            onClick={() => navigate('/')}
                            className="bg-bg-secondary border border-border hover:bg-bg-secondary/80 text-text-primary flex items-center justify-center gap-2"
                        >
                            <Home className="h-5 w-5" />
                            Return to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container max-w-2xl">
            <Link to="/" className="mb-6 inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
            </Link>

            <div className="glass-panel p-8">
                <h2 className="mb-6 text-2xl font-bold flex items-center gap-2">
                    {isEditMode ? 'Edit Student' : 'New Student'}
                </h2>

                {error && (
                    <div className="mb-6 rounded-lg bg-danger/10 p-4 text-sm text-danger border border-danger/20">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-text-secondary">First Name</label>
                            <input
                                type="text"
                                name="sFirstName"
                                value={student.sFirstName}
                                onChange={handleChange}
                                required
                                className="input-field"
                                placeholder="John"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-text-secondary">Last Name</label>
                            <input
                                type="text"
                                name="sLastName"
                                value={student.sLastName}
                                onChange={handleChange}
                                required
                                className="input-field"
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-text-secondary">Marks / Grade</label>
                        <input
                            type="text"
                            name="sMarks"
                            value={student.sMarks}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="e.g. 95 or A+"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 btn-primary flex items-center justify-center gap-2 w-full sm:w-auto self-end"
                    >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                        {isEditMode ? 'Update Student' : 'Save Student'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;
