import React, { useContext } from 'react';
import { LocationPinIcon, DashboardIcon } from './icons';
import { AuthContext } from '../context/AuthContext';

interface HeaderProps {
  location: string;
}

const Header: React.FC<HeaderProps> = ({ location }) => {
  const { isAdmin } = useContext(AuthContext);

  return (
    <header className="glassmorphism sticky top-0 z-50 border-b border-goldAccent/20">
      <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-y-3">
        <a href="#/" className="text-3xl font-bold font-display text-royalBlue">
          Local<span className="text-goldAccent">Pro</span>
        </a>
        <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end w-full sm:w-auto">
          <div className="flex items-center gap-2 text-sm text-slateGray bg-white/30 px-3 py-1.5 rounded-full shadow-inner">
            <LocationPinIcon className="text-royalBlue"/>
            <span className="font-medium">{location}</span>
          </div>
          <a
            href={isAdmin ? '#/admin/dashboard' : '#/admin/login'}
            className="flex items-center gap-2 text-sm font-semibold text-charcoalBlack bg-luxuryGold hover:bg-goldAccent px-4 py-1.5 rounded-full shadow-md transition-all hover:-translate-y-px btn-gold-glow"
          >
            <DashboardIcon className="w-4 h-4" />
            <span>{isAdmin ? 'Dashboard' : 'Admin Login'}</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;