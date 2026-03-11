import React from 'react';
import TableSkeleton from '../../UI/TableSkeleton';
import { LuPencil, LuTrash2 } from "react-icons/lu";

const TableCategories = ({ data, onEdit, onDelete, loading }) => {

    const formatDate = (dateString) => {
        if (!dateString) return "No date";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Invalid Date";

        return new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    return (
        <div className="bg-emerald-200 border-emerald-300 dark:bg-neutral-900 border dark:border-neutral-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-emerald-400 text-neutral-900 dark:bg-neutral-800/50 dark:text-neutral-400 text-sm uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold">Category Name</th>
                        <th className="px-6 py-4 font-semibold">Type</th>
                        <th className="px-6 py-4 font-semibold">Last Updated</th>
                        <th className="px-6 py-4 font-semibold text-center">Actions</th>
                    </tr>
                </thead>
                
                {loading ? (
                    <TableSkeleton rows={5} columns={4} />
                ) : (
                    <tbody className="divide-y divide-white dark:divide-neutral-800">
                        {data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.category_id} className="hover:bg-neutral-800/30 transition-colors">
                                    <td className="px-6 py-4 text-neutral-900 dark:text-neutral-200 font-medium">
                                        {item.name}
                                    </td>
                                    
                                    <td className="px-6 py-4 text-neutral-900 dark:text-neutral-400">
                                        <span className={`text-xs px-2 py-1 rounded-lg border ${
                                            item.type === 'Income' 
                                            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                                            : 'bg-orange-500/10 text-orange-600 border-orange-500/20'
                                        }`}>
                                            {item.type}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                                        {formatDate(item.updated_at)}
                                    </td>

                                    <td className="px-6 py-4 flex justify-center gap-2">
                                        <button 
                                            onClick={() => onEdit(item)} 
                                            className="p-2 text-neutral-700 dark:text-neutral-400 hover:text-emerald-300 hover:bg-emerald-700 dark:hover:text-emerald-400 dark:hover:bg-emerald-400/10 rounded-lg transition-all"
                                        >
                                            <LuPencil size={18} />
                                        </button>
                                        <button 
                                            onClick={() => onDelete(item)} 
                                            className="p-2 text-neutral-700 dark:text-neutral-400 hover:text-red-300 hover:bg-red-700 dark:hover:text-red-400 dark:hover:bg-red-400/10 rounded-lg transition-all"
                                        >
                                            <LuTrash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-emerald-500 dark:text-neutral-500 italic">
                                    No categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                )}
            </table>
        </div>
    );
};

export default TableCategories;