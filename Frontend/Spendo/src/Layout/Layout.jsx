import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "../Components/UI/Sidebar";

function Layout() {

    const [expanded, setExpanded] = useState(true);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-neutral-100 text-emerald-500 dark:bg-neutral-900 dark:text-emerald-400">
            {/* Sidebar status */}
            <Sidebar expanded={expanded} setExpanded={setExpanded} />


            <main className={`
                flex-1 p-8 transition-all duration-300 
                ${expanded ? 'ml-64' : 'ml-20'}
            `}>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;