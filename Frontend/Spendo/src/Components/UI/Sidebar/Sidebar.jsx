import React, { useState, useEffect } from 'react';
import { 
    LuLayoutDashboard, LuArrowUpDown, LuSettings,LuLogOut, LuChevronLeft, LuChevronRight, LuMoon, LuSun 
} from "react-icons/lu";

{/* Sidebar component received props for expanded state and setter */}
const Sidebar = ({ expanded, setExpanded }) => {

    const [darkMode, setDarkMode] = useState(true); // Dark mode active by default

    // Manage dark mode class on the root element
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <aside className={`
            fixed top-0 left-0 h-screen transition-all duration-300 z-50
            bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800
            flex flex-col ${expanded ? 'w-64' : 'w-20'}
        `}>
        
        {/* Header: Logo */}
        <div className="p-4 mb-2 flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-xl">
                <LuArrowUpDown className="w-6 h-6 text-white" />
            </div>
            {expanded && (
                <span className="text-xl font-bold dark:text-white tracking-tighter">Spendo</span>
            )}
        </div>

        {/* Button to expand/collapse */}
        <button 
            onClick={() => setExpanded(!expanded)} // Use the setter from props to toggle expanded state
            className="mx-4 mb-6 p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-emerald-500 transition-colors flex items-center justify-center"
        >
            {expanded ? <LuChevronLeft size={30} /> : <LuChevronRight size={30} />}
        </button>

        {/* Nav Links */}
        <nav className="flex-1 px-4 space-y-2">
            <SidebarItem icon={<LuLayoutDashboard size={20}/>} text="Dashboard" active expanded={expanded} />
            <SidebarItem icon={<LuArrowUpDown size={20}/>} text="Transactions" expanded={expanded} />
            <SidebarItem icon={<LuSettings size={20}/>} text="Settings" expanded={expanded} />
        </nav>

        {/* Footer: DarkMode Toggle & Logout */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
            
            {/* Dark Mode Toggle */}
            <button 
                onClick={() => setDarkMode(!darkMode)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-100 dark:hover:bg-neutral-800 transition-all text-neutral-500"
            >
                {darkMode ? <LuSun size={20} /> : <LuMoon size={20} />}
                {expanded && <span className="font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
            </button>

            {/* Logout */}
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-neutral-500 hover:text-red-500 transition-all">
                <LuLogOut size={20} />
                {expanded && <span className="font-medium">Logout</span>}
            </button>
        </div>
        </aside>
    );
};

// Subcomponent for sidebar items
const SidebarItem = ({ icon, text, active, expanded }) => (
    <div className={`
        flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all group
        ${active 
        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
        : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'}
    `}>
        {icon}
        {expanded && <span className="font-medium whitespace-nowrap">{text}</span>}
        {!expanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-emerald-500 text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
            {text}
        </div>
        )}
    </div>
);

export default Sidebar;