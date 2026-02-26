import React, { useState } from 'react';
import { LuArrowUpDown } from "react-icons/lu";
import FormLogin from "../../Components/Auth/FormLogin";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
            {/* Principal card */}
            <div className="w-full max-w-225 grid md:grid-cols-2 bg-neutral-900/50 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
                
                {/* Left side adaptable */}
                <div className="hidden md:flex flex-col items-center justify-center bg-linear-to-br from-emerald-600/20 to-neutral-900 p-12 relative">
                    <div className="z-10 text-center">
                        <div className="bg-emerald-500/10 p-5 rounded-3xl inline-block mb-6 border border-emerald-500/20">
                            <LuArrowUpDown className="w-14 h-14 text-emerald-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-3">Control your finances.</h2>
                        <p className="text-neutral-400 max-w-xs mx-auto">
                            The easy way to manage your expenses and savings in one place.
                        </p>
                    </div>
                    {/* background */}
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
                </div>

                {/* right side form */}
                <FormLogin showPassword={showPassword} setShowPassword={setShowPassword} />
            </div>
        </div>
    );
};

export default Login;