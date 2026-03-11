import React from 'react';
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineCategory, MdOutlineAccountBalanceWallet } from "react-icons/md";
import TableSkeleton from '../../UI/TableSkeleton'; 

const TableTransactions = ({ data, onDelete, loading }) => {
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-MX', options);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
        }).format(amount);
    };

    return (
        <div className="overflow-hidden rounded-2xl border bg-emerald-200 border-emerald-300 dark:bg-neutral-900 dark:border-neutral-800 shadow-xl">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b bg-emerald-400 text-neutral-900 dark:bg-neutral-800/50 dark:text-neutral-400">
                        <th className="p-4 text-xs font-bold uppercase tracking-wider">Date</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-wider">Description</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-wider">Category / Account</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-wider">Amount</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-wider text-center">Actions</th>
                    </tr>
                </thead>

                {loading ? (
                    <TableSkeleton rows={8} columns={5} />
                ) : data.length === 0 ? (
                    <tbody className="divide-y divide-white dark:divide-neutral-800">
                        <tr>
                            <td colSpan="5" className="p-10 text-center text-neutral-500">
                                There are no transactions yet. Start by adding your first movement!
                            </td>
                        </tr>
                    </tbody>
                ) : (
                    <tbody className="divide-y divide-white dark:divide-neutral-800">
                        {data.map((item) => (
                            <tr key={item.transaction_id} className="hover:bg-neutral-800/30 transition-colors group">
                                <td className="p-4 text-neutral-900 dark:text-white text-sm">
                                    {formatDate(item.date)}
                                </td>
                                <td className="p-4">
                                    <span className="text-neutral-800 dark:text-white font-medium block">{item.description}</span>
                                    <span className="text-xs text-neutral-500 md:hidden">{item.type}</span>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center text-xs text-neutral-700 dark:text-neutral-300 gap-1">
                                            <MdOutlineCategory className="text-emerald-600 dark:text-emerald-400" />
                                            {item.category?.name || 'Without category'}
                                        </div>
                                        <div className="flex items-center text-xs text-neutral-700 dark:text-neutral-300 gap-1">
                                            <MdOutlineAccountBalanceWallet className="text-blue-500 dark:text-blue-400" />
                                            {item.account?.name || 'Without account'}
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`text-sm font-bold ${
                                        item.type === 'income' ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'
                                    }`}>
                                        {item.type === 'income' ? '+' : '-'} {formatCurrency(item.amount)}
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    <button 
                                        onClick={() => onDelete(item)}
                                        className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-300 dark:text-neutral-500 dark:hover:text-red-500 dark:hover:bg-red-500/10 rounded-lg transition-all active:scale-90"
                                        title="Delete transaction"
                                    >
                                        <HiOutlineTrash size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
        </div>
    );
};

export default TableTransactions;