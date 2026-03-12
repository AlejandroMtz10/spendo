import React from 'react';
import { HiOutlineUserCircle } from "react-icons/hi";

const Profile = ({ user, setUser, onSave, loading }) => {
    return (
        <section className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <HiOutlineUserCircle className="text-2xl text-emerald-500" />
                <h2 className="text-xl font-semibold">Public Profile</h2>
            </div>
            
            <form onSubmit={onSave} className="space-y-4">
                <div>
                    <label className="block text-sm text-neutral-500 mb-1">Full Name</label>
                    <input 
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({...user, name: e.target.value})}
                        className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        placeholder="Your name"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm text-neutral-500 mb-1">Email Address</label>
                    <input 
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        placeholder="your@email.com"
                        required
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading} 
                    className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-neutral-950 font-bold py-3 px-6 rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                >
                    {loading ? 'Saving Changes...' : 'Save Changes'}
                </button>
            </form>
        </section>
    );
};

export default Profile;