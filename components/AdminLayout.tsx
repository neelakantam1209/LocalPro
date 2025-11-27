import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { DashboardIcon, UsersIcon, LogoutIcon, MenuIcon, HomeIcon, TagIcon } from './icons';

interface NavLinkProps {
    to: string;
    children: React.ReactNode;
    icon: React.ReactNode;
    onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, icon, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <Link 
            to={to} 
            onClick={onClick}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-semibold ${isActive ? 'bg-primary text-white shadow-md' : 'text-text-secondary hover:bg-primary-subtle hover:text-primary'}`}
        >
            {icon}
            <span>{children}</span>
        </Link>
    );
}

const AdminSidebar: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    const { logout } = useContext(AuthContext);

    // Function to handle link clicks, closing the sidebar only on mobile
    const handleLinkClick = () => {
        // Only trigger close if it's potentially open on mobile (though safe to call always as layout manages state)
        if (window.innerWidth < 768) {
            onClose();
        }
    };

    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>
            <div className={`w-64 bg-surface p-4 flex flex-col h-screen shadow-lg border-r border-border fixed inset-y-0 left-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <div className="text-3xl font-bold font-display text-primary text-center py-6">
                Local<span className="text-accent">Pro</span>
                </div>
                <nav className="flex-grow mt-8">
                    <ul className="space-y-3">
                        <li>
                            <NavLink to="/admin/dashboard" icon={<DashboardIcon className="w-6 h-6"/>} onClick={handleLinkClick}>Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/workers" icon={<UsersIcon className="w-6 h-6"/>} onClick={handleLinkClick}>Workers</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/offers" icon={<TagIcon className="w-6 h-6"/>} onClick={handleLinkClick}>Offers</NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="p-2 border-t border-border mt-auto space-y-2">
                    <a href="#/" className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-md font-semibold text-text-secondary hover:bg-background transition-colors">
                        <HomeIcon className="w-6 h-6"/>
                        Go to Home
                    </a>
                    <button onClick={logout} className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-md font-semibold text-text-secondary hover:bg-red-50 hover:text-error transition-colors">
                        <LogoutIcon className="w-6 h-6"/>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};


const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-background">
            <AdminSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="flex-1 p-4 lg:p-10 overflow-y-auto w-full">
                 {/* Mobile Header */}
                <div className="md:hidden flex justify-between items-center mb-6">
                    <a href="#/" className="text-2xl font-bold font-display text-primary">
                        Local<span className="text-accent">Pro</span>
                    </a>
                    <button onClick={() => setSidebarOpen(true)} className="p-2 text-text-secondary">
                        <MenuIcon className="w-7 h-7" />
                    </button>
                </div>
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;