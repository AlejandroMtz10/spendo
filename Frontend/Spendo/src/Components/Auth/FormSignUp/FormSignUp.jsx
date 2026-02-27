import React from 'react';
import { LuArrowUpDown, LuMail, LuLock, LuEye, LuEyeOff, LuUser, LuX } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';

export const FormSignUp = ({ showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }) => {

    const navigate = useNavigate();

    return(
        <div className="p-8 md:p-12 flex flex-col justify-center bg-neutral-900">
            <div className="mb-8 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                    <LuArrowUpDown className="w-8 h-8 text-emerald-400" />
                    <span className="text-2xl font-bold text-white tracking-tighter">Spendo</span>
                </div>
                <h1 className="text-2xl font-semibold text-white italic">Create Account</h1>
                <p className="text-neutral-500 text-sm mt-2">Join us to start managing your flow.</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {/* Full Name */}
                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1.5 ml-1">Full Name</label>
                    <div className="relative group">
                        <LuUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600 group-focus-within:text-emerald-400 transition-colors" />
                        <input 
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
                    <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-500/10 active:scale-[0.98]">
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

            <p className="mt-6 text-center text-[11px] text-neutral-600 leading-relaxed px-4">
                By signing up, you agree to our <span className="text-neutral-400 underline underline-offset-4 cursor-pointer hover:text-emerald-400 transition-colors">Terms of Service</span>.
            </p>
        </div>
    );
};

export default FormSignUp;