import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { DashboardIcon, UsersIcon, LogoutIcon, MenuIcon } from './icons';

const NavLink: React.FC<{ to: string; children: React.ReactNode; icon: React.ReactNode }> = ({ to, children, icon }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <Link to={to} className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-semibold ${isActive ? 'bg-luxuryGold text-charcoalBlack shadow-md btn-gold-glow' : 'text-slateGray hover:bg-coolGray/50 hover:text-royalBlue'}`}>
            {icon}
            <span>{children}</span>
        </Link>
    );
}

const AdminSidebar: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    const { logout } = useContext(AuthContext);
    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>
            <div className={`w-64 bg-softWhite p-4 flex flex-col h-screen soft-shadow border-r border-coolGray/50 fixed inset-y-0 left-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <div className="text-3xl font-bold font-display text-royalBlue text-center py-6">
                Local<span className="text-goldAccent">Pro</span>
                </div>
                <nav className="flex-grow mt-8">
                    <ul className="space-y-3">
                        <li>
                            <NavLink to="/admin/dashboard" icon={<DashboardIcon className="w-6 h-6"/>}>Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/workers" icon={<UsersIcon className="w-6 h-6"/>}>Workers</NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="p-2">
                    <button onClick={logout} className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-lg font-semibold text-slateGray hover:bg-errorRed/10 hover:text-errorRed transition-colors">
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
        <div className="flex min-h-screen bg-ivoryWhite">
            <AdminSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
                 {/* Mobile Header */}
                <div className="md:hidden flex justify-between items-center mb-6">
                    <a href="#/" className="text-2xl font-bold font-display text-royalBlue">
                        Local<span className="text-goldAccent">Pro</span>
                    </a>
                    <button onClick={() => setSidebarOpen(true)} className="p-2 text-slateGray">
                        <MenuIcon className="w-7 h-7" />
                    </button>
                </div>
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;