import React, { useState } from 'react';
import api from '../../../api/connection.jsx';
import { HiOutlineX, HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ModalDeleteAccount = ({ isOpen, onClose }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Send delete request with credentials for validation
            await api.post('/delete-account', credentials);
            
            // If successful, clear local storage and redirect to login page
            localStorage.clear(); 
            toast.success("Account deleted successfully");
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials or error deleting account");
            toast.error(err.response?.data?.message || "Error deleting account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <div className="bg-white dark:bg-neutral-900 w-full max-w-md rounded-3xl shadow-2xl border border-red-100 dark:border-red-900/30 overflow-hidden">
                
                {/* Header */}
                <div className="p-6 bg-red-50 dark:bg-red-950/20 border-b border-red-100 dark:border-red-900/30">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 text-red-600 dark:text-red-500">
                            <HiOutlineExclamationCircle className="text-3xl" />
                            <h2 className="text-xl font-bold">Delete Account</h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-full transition-colors">
                            <HiOutlineX className="text-xl text-red-600" />
                        </button>
                    </div>
                    <p className="mt-4 text-sm text-red-700 dark:text-red-400 font-medium">
                        This action is permanent. All your transactions, categories, and accounts will be deleted forever.
                    </p>
                </div>

                {/* validation form */}
                <form onSubmit={handleDelete} className="p-6 space-y-4">
                    {error && (
                        <div className="p-3 text-sm text-red-600 bg-red-100 dark:bg-red-900/40 rounded-xl border border-red-200 dark:border-red-800">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Confirm your email</label>
                        <input 
                            type="email"
                            required
                            value={credentials.email}
                            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                            className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                            placeholder="Enter your email to confirm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Password</label>
                        <input 
                            type="password"
                            required
                            value={credentials.password}
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                            className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold py-3 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="flex-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-600/20"
                        >
                            {loading ? 'Deleting...' : 'Delete Permanently'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalDeleteAccount;