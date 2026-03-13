import React, { useState } from 'react';
import { LuArrowUpDown, LuMail, LuLock, LuEye, LuEyeOff, LuUser, LuX } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import api from '../../../api/connection.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FormSignUp = ({ showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }) => {
    const navigate = useNavigate();
    
    // Local state for inputs
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    // Inputs change manager
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Post data to backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation: check if passwords match
        if (formData.password !== formData.password_confirmation) {
            toast.error(
                "Passwords do not match",{
                    position:"bottom-right",
                    theme:"dark",
                    autoClose:3000,
                }
            );
            return;
        }

        try {
            // instance connection with axios, post to /register endpoint
            const response = await api.post('/register', formData);
            
            if (response.status === 201 || response.status === 200) {
                toast.success(
                    "Account created successfully!",{
                        position:"bottom-right",
                        theme:"dark",
                        autoClose:3000,
                    }
                );
                navigate('/'); // direct to login page after successful registration
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Error during registration",{
                    position:"bottom-right",
                    theme:"dark",
                    autoClose:3000,
                }
            );
        }
    };

    return (
        <div className="p-8 md:p-12 flex flex-col justify-center bg-neutral-900">
            <div className="mb-8 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                    <LuArrowUpDown className="w-8 h-8 text-emerald-400" />
                    <span className="text-2xl font-bold text-white tracking-tighter">Spendo</span>
                </div>
                <h1 className="text-2xl font-semibold text-white italic">Create Account</h1>
                <p className="text-neutral-500 text-sm mt-2">Join us to start managing your flow.</p>
            </div>

            {/* Add onSubmit */}
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1.5 ml-1">Full Name</label>
                    <div className="relative group">
                        <LuUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600 group-focus-within:text-emerald-400 transition-colors" />
                        <input 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            type="text" 
                            placeholder="John Doe"
                            className="w-full bg-neutral-800/50 border border-neutral-700 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1.5 ml-1">Email</label>
                    <div className="relative group">
                        <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600 group-focus-within:text-emerald-400 transition-colors" />
                        <input 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            type="email" 
                            placeholder="name@example.com"
                            className="w-full bg-neutral-800/50 border border-neutral-700 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1.5 ml-1">Password</label>
                    <div className="relative group">
                        <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600 group-focus-within:text-emerald-400 transition-colors" />
                        <input 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••"
                            className="w-full bg-neutral-800/50 border border-neutral-700 rounded-2xl py-3 pl-12 pr-12 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-white transition-colors"
                        >
                            {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1.5 ml-1">Confirm Password</label>
                    <div className="relative group">
                        <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600 group-focus-within:text-emerald-400 transition-colors" />
                        <input 
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            required
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="••••••••"
                            className="w-full bg-neutral-800/50 border border-neutral-700 rounded-2xl py-3 pl-12 pr-12 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                        />
                        <button 
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-white transition-colors"
                        >
                            {showConfirmPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="pt-2 space-y-3">
                    <button 
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-500/10 active:scale-[0.98]"
                    >
                        Register
                    </button>
                    
                    <button 
                        type="button"
                        onClick={() => navigate('/')}
                        className="w-full flex items-center justify-center gap-2 bg-transparent hover:bg-neutral-800 text-neutral-400 hover:text-white font-semibold py-3 rounded-2xl border border-neutral-800 transition-all active:scale-[0.98]"
                    >
                        <LuX size={18} />
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormSignUp;