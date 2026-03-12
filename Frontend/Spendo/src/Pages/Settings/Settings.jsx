import React, { useState, useEffect } from 'react';
import api from '../../api/connection.jsx';
import { HiOutlineLockClosed, HiOutlineTrash } from "react-icons/hi";
import Profile from '../../Components/Settings/Profile';
import ModalPassword from '../../Components/Settings/ModalChangePassword';
import ModalDeleteAccount from '../../Components/Settings/ModalDeleteAccount';
import { toast, ToastContainer } from 'react-toastify';

const Settings = () => {
    const [user, setUser] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(false);
    
    // States for modals
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Load user profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/profile');
                setUser({ name: res.data.name, email: res.data.email });
            } catch (error) {
                toast.error(error.response?.data?.message ||"Error fetching profile");
            }
        };
        fetchProfile();
    }, []);

    // Handle profile update
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put('/profile', user);
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors">
            <div className="max-w-4xl mx-auto space-y-8">
                <header>
                    <h1 className="text-3xl font-bold">Settings</h1>
                    <p className="text-neutral-500 mt-1">Manage your account preferences and security.</p>
                </header>

                {/* Profile Component */}
                <Profile 
                    user={user} 
                    setUser={setUser} 
                    onSave={handleUpdateProfile} 
                    loading={loading} 
                />

                {/* Secction of security */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button 
                        onClick={() => setIsPasswordModalOpen(true)} 
                        className="flex items-center justify-between p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-emerald-500 transition-all group shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                                <HiOutlineLockClosed className="text-2xl text-emerald-500" />
                            </div>
                            <div className="text-left">
                                <span className="block font-bold">Update Password</span>
                                <span className="text-xs text-neutral-500">Change your login credentials</span>
                            </div>
                        </div>
                    </button>

                    <button 
                        onClick={() => setIsDeleteModalOpen(true)} 
                        className="flex items-center justify-between p-6 bg-red-50/50 dark:bg-red-950/10 border border-red-200 dark:border-red-900/30 rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-all group shadow-sm"
                    >
                        <div className="flex items-center gap-4 text-red-600 dark:text-red-400">
                            <div className="p-3 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
                                <HiOutlineTrash className="text-2xl" />
                            </div>
                            <div className="text-left">
                                <span className="block font-bold">Delete Account</span>
                                <span className="text-xs text-red-500/70 text-opacity-80">Permanently erase all your data</span>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <ModalPassword isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
            <ModalDeleteAccount isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
            <ToastContainer position="bottom-right" theme="dark" />
        </div>
    );
};

export default Settings;