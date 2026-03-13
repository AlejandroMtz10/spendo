import React, { useState } from 'react';
import api from '../../../api/connection.jsx';
import { HiOutlineX, HiOutlineLockClosed } from "react-icons/hi";
import { toast } from 'react-toastify';

const ModalChangePassword = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        email: '',
        last_password: '',
        new_password: '',
        new_password_confirmation: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await api.post('/change-password', formData);
            setFormData({ email: '', last_password: '', new_password: '', new_password_confirmation: '' });
            toast.success("Password updated successfully!");
            onClose();
        } catch (err) {
            toast.error(err.response?.data?.message || "Error updating password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-neutral-900 w-full max-w-md rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-2">
                        <HiOutlineLockClosed className="text-xl text-emerald-500" />
                        <h2 className="text-xl font-bold dark:text-white">Update Password</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
                        <HiOutlineX className="text-xl text-neutral-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="p-3 text-sm text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Confirm Email</label>
                        <input 
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Current Password</label>
                        <input 
                            type="password"
                            required
                            value={formData.last_password}
                            onChange={(e) => setFormData({...formData, last_password: e.target.value})}
                            className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">New Password</label>
                            <input 
                                type="password"
                                required
                                value={formData.new_password}
                                onChange={(e) => setFormData({...formData, new_password: e.target.value})}
                                className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Confirm New Password</label>
                            <input 
                                type="password"
                                required
                                value={formData.new_password_confirmation}
                                onChange={(e) => setFormData({...formData, new_password_confirmation: e.target.value})}
                                className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-neutral-950 font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 mt-2"
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ModalChangePassword;