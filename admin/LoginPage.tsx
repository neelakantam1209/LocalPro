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
    <div className="min-h-screen flex items-center justify-center bg-ivoryWhite p-4">
      <div className="glassmorphism rounded-2xl shadow-2xl w-full max-w-sm border border-goldAccent/20">
        <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold font-display text-royalBlue">
                Local<span className="text-goldAccent">Pro</span> Admin
              </h1>
              <p className="text-slateGray mt-2">Sign in to manage the platform.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="admin-username" className="block text-sm font-medium text-slateGray">Username</label>
                    <input 
                      type="text" 
                      id="admin-username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      required 
                      className="mt-1 w-full pl-4 pr-4 py-3 b order border-coolGray/30 rounded-full focus:ring-2 focus:ring-goldAccent/80 focus:border-goldAccent transition-shadow bg-softWhite soft-shadow-inset text-charcoalBlack placeholder-slateGray"
                    />
                </div>
                <div className="relative">
                    <label htmlFor="admin-password" className="block text-sm font-medium text-slateGray">Password</label>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      id="admin-password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="admin123"
                      required 
                      className="mt-1 w-full pl-4 pr-10 py-3 border border-coolGray/30 rounded-full focus:ring-2 focus:ring-goldAccent/80 focus:border-goldAccent transition-shadow bg-softWhite soft-shadow-inset text-charcoalBlack placeholder-slateGray"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 top-7 pr-4 flex items-center text-slateGray hover:text-charcoalBlack">
                        {showPassword ? <EyeSlashIcon/> : <EyeIcon/>}
                    </button>
                </div>
                
                {error && <p className="text-errorRed text-sm font-semibold text-center">{error}</p>}
                
                <div className="pt-2">
                    <button type="submit" className="w-full bg-royalBlue hover:bg-deepNavy text-white font-bold font-sans py-3 px-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:shadow-inner active:translate-y-px transition-all duration-200 flex items-center justify-center gap-2">
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