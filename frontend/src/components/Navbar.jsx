import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Database, PlusCircle } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="glass-panel sticky top-0 z-50 mb-8 px-6 py-4">
            <div className="container flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-accent hover:text-accent-hover transition-colors">
                    <GraduationCap className="h-8 w-8" />
                    <span>StudentManager</span>
                </Link>

                <div className="flex gap-4">
                    <Link
                        to="/"
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all ${location.pathname === '/'
                                ? 'bg-accent/20 text-accent'
                                : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                            }`}
                    >
                        <Database className="h-4 w-4" />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        to="/add"
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all ${location.pathname === '/add'
                                ? 'bg-accent/20 text-accent'
                                : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                            }`}
                    >
                        <PlusCircle className="h-4 w-4" />
                        <span>Add Student</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
