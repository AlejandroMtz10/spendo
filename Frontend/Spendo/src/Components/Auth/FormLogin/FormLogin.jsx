import React from 'react';
import { LuArrowUpDown, LuMail, LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import { Link } from 'react-router-dom';

export const FormLogin = ({ showPassword, setShowPassword }) => {
    return(
        <div className="p-8 md:p-12 flex flex-col justify-center bg-neutral-900">
            <div className="mb-10 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                    <LuArrowUpDown className="w-8 h-8 text-emerald-400" />
                    <span className="text-2xl font-bold text-white tracking-tighter">Spendo</span>
                </div>
                <h1 className="text-2xl font-semibold text-white italic">Welcome back!</h1>
                <p className="text-neutral-500 text-sm mt-2">Login with your account to continue.</p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2 ml-1">Email</label>
                    <div className="relative group">
                        <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600 group-focus-within:text-emerald-400 transition-colors" />
                        <input 
                            type="email" 
                            placeholder="name@example.com"
                            className="w-full bg-neutral-800/50 border border-neutral-700 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2 ml-1">Password</label>
                    <div className="relative group">
                        <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600 group-focus-within:text-emerald-400 transition-colors" />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••"
                            className="w-full bg-neutral-800/50 border border-neutral-700 rounded-2xl py-3.5 pl-12 pr-12 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-white transition-colors"
                        >
                            {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                        </button>
                    </div>
                </div>

                <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/10 active:scale-[0.98] mt-2">
                    Login
                </button>
            </form>

            <div className="relative my-9">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-neutral-800"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-neutral-900 px-4 text-neutral-500 font-medium">Or</span>
                </div>
            </div>

            <div className="space-y-3">
                <Link 
                    to="/SignUp"
                    className="w-full flex items-center justify-center gap-2 bg-transparent hover:bg-neutral-800 text-white font-semibold py-3.5 rounded-2xl border border-neutral-700 transition-all active:scale-[0.98]"
                >
                    Sign up
                </Link>
            </div>
        </div>
    );
};

export default FormLogin;