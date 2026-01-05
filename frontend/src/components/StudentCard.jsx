import React from 'react';
import { Trash2, Edit, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentCard = ({ student, onDelete }) => {
    return (
        <div className="glass-panel p-6 transition-all hover:translate-y-[-4px] hover:shadow-lg hover:shadow-accent/10">
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-lg">
                            {student.sFirstName.charAt(0)}{student.sLastName.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-text-primary">
                                {student.sFirstName} {student.sLastName}
                            </h3>
                            <p className="text-sm text-text-secondary">ID: {student.sId}</p>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-text-secondary bg-bg-secondary/50 rounded-lg p-2">
                        <Award className="h-5 w-5 text-accent" />
                        <span className="font-medium">Marks:</span>
                        <span className="text-text-primary font-bold">{student.sMarks}</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex gap-3">
                <Link
                    to={`/edit/${student.sId}`}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-bg-secondary py-2 text-sm font-medium hover:bg-bg-secondary/80 transition-colors"
                >
                    <Edit className="h-4 w-4" />
                    Edit
                </Link>
                <button
                    onClick={() => onDelete(student.sId)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-danger/10 px-4 py-2 text-sm font-medium text-danger hover:bg-danger/20 transition-colors"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default StudentCard;
