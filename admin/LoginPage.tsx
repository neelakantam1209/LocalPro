import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { EyeIcon, EyeSlashIcon, LockIcon } from '../components/icons';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAdmin, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(username, password);
    if (!success) {
      setError('Invalid username or password.');
    } else {
      navigate('/admin/dashboard', { replace: true });
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-sm border border-border">
        <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold font-display text-primary">
                Local<span className="text-accent">Pro</span> Admin
              </h1>
              <p className="text-text-secondary mt-2">Sign in to manage the platform.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="admin-username" className="block text-sm font-medium text-text-secondary">Username</label>
                    <input 
                      type="text" 
                      id="admin-username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      required 
                      className="mt-1 w-full pl-4 pr-4 py-3 border border-border rounded-full focus:ring-2 focus:ring-primary focus:border-primary transition-shadow bg-background text-text-primary placeholder-text-secondary"
                    />
                </div>
                <div className="relative">
                    <label htmlFor="admin-password" className="block text-sm font-medium text-text-secondary">Password</label>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      id="admin-password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="admin123"
                      required 
                      className="mt-1 w-full pl-4 pr-10 py-3 border border-border rounded-full focus:ring-2 focus:ring-primary focus:border-primary transition-shadow bg-background text-text-primary placeholder-text-secondary"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 top-7 pr-4 flex items-center text-text-secondary hover:text-text-primary">
                        {showPassword ? <EyeSlashIcon/> : <EyeIcon/>}
                    </button>
                </div>
                
                {error && <p className="text-error text-sm font-semibold text-center">{error}</p>}
                
                <div className="pt-2">
                    <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white font-bold font-sans py-3 px-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:shadow-inner active:translate-y-px transition-all duration-200 flex items-center justify-center gap-2">
                        <LockIcon className="w-5 h-5" />
                        <span>Login</span>
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;