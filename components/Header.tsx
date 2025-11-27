import React, { useContext } from 'react';
import { CartIcon, CalendarIcon, UserPlusIcon } from './icons';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onOpenCart?: () => void;
  onOpenBookings?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenCart, onOpenBookings }) => {
  const { isAdmin } = useContext(AuthContext);
  const { cartItems } = useCart();

  return (
    <header className="bg-surface sticky top-0 z-50 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center gap-4">
        <a href="#/" className="text-3xl font-bold font-display text-primary tracking-tight">
          Local<span className="text-accent">Pro</span>
        </a>
        
        <div className="flex items-center gap-4 sm:gap-6">
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
                <span className="absolute -top-1 -right-2 bg-error text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                  {cartItems.length}
                </span>
              )}
            </button>
          )}
          
          <a
            href={isAdmin ? '#/admin/dashboard' : '#/admin/login'}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-black text-white shadow-md transition-all hover:-translate-y-px"
            title={isAdmin ? 'Dashboard' : 'Admin Login'}
          >
            <UserPlusIcon className="w-6 h-6" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;