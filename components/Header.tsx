import React, { useContext } from 'react';
import { LocationPinIcon, DashboardIcon, CartIcon, CalendarIcon } from './icons';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  location: string;
  onOpenCart?: () => void;
  onOpenBookings?: () => void;
}

const Header: React.FC<HeaderProps> = ({ location, onOpenCart, onOpenBookings }) => {
  const { isAdmin } = useContext(AuthContext);
  const { cartItems } = useCart();

  return (
    <header className="bg-surface sticky top-0 z-50 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-y-3">
        <a href="#/" className="text-3xl font-bold font-display text-primary tracking-tight">
          Local<span className="text-accent">Pro</span>
        </a>
        <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end w-full sm:w-auto">
          <div className="flex items-center gap-2 text-sm text-text-secondary bg-background px-3 py-1.5 rounded-full border border-border">
            <LocationPinIcon className="text-primary"/>
            <span className="font-medium text-text-primary truncate max-w-[150px]">{location}</span>
          </div>
          
          {onOpenBookings && (
            <button 
              onClick={onOpenBookings}
              className="text-text-primary hover:text-primary transition-colors flex items-center gap-1"
              title="My Bookings"
            >
              <CalendarIcon className="w-6 h-6"/>
            </button>
          )}

          {onOpenCart && (
            <button 
              onClick={onOpenCart}
              className="relative text-text-primary hover:text-primary transition-colors flex items-center gap-1"
              title="Cart"
            >
              <CartIcon className="w-6 h-6"/>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-error text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
          )}
          
          <a
            href={isAdmin ? '#/admin/dashboard' : '#/admin/login'}
            className="flex items-center gap-2 text-sm font-semibold text-white bg-secondary hover:bg-black px-4 py-2 rounded-lg shadow-md transition-all hover:-translate-y-px"
          >
            <DashboardIcon className="w-4 h-4" />
            <span>{isAdmin ? 'Dashboard' : 'Admin'}</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;