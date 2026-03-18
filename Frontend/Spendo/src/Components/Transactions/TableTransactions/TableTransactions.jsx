import React, { useState, useMemo } from 'react';
import { HiOutlineTrash, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { MdOutlineCategory, MdOutlineAccountBalanceWallet, MdOutlineSort } from "react-icons/md";
import TableSkeleton from '../../UI/TableSkeleton';

const TableTransactions = ({ data, onDelete, loading }) => {
    // States for filters and sorting
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc' o 'desc'

    //  Helpers 
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 5 }, (_, i) => currentYear - i);
    }, []);

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

    // Order transactions by date and filter by selected month/year
    const filteredAndSortedData = useMemo(() => {
        return data
            .filter(item => {
                const itemDate = new Date(item.date);
                return itemDate.getFullYear() === parseInt(selectedYear) && 
                        itemDate.getMonth() === parseInt(selectedMonth);
            })
            .sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            });
    }, [data, selectedYear, selectedMonth, sortOrder]);

    const toggleSort = () => {
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="flex flex-col gap-4">
            {/*  Toolbar  */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-emerald-300 dark:border-neutral-800 shadow-sm">
                <div className="flex items-center gap-2">
                    <select 
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="bg-emerald-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm rounded-lg p-2 outline-none border border-emerald-200 dark:border-neutral-700"
                    >
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>

                    <div className="flex items-center bg-emerald-50 dark:bg-neutral-800 rounded-lg border border-emerald-200 dark:border-neutral-700">
                        <button 
                            onClick={() => setSelectedMonth(prev => prev === 0 ? 11 : prev - 1)}
                            className="p-2 hover:text-emerald-600 dark:text-white"
                        ><HiOutlineChevronLeft /></button>
                        <span className="text-sm font-medium min-w-20 text-center dark:text-white">
                            {months[selectedMonth]}
                        </span>
                        <button 
                            onClick={() => setSelectedMonth(prev => prev === 11 ? 0 : prev + 1)}
                            className="p-2 hover:text-emerald-600 dark:text-white"
                        ><HiOutlineChevronRight /></button>
                    </div>
                </div>

                <div className="text-xs text-neutral-500 font-medium">
                    {filteredAndSortedData.length} transactions found
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border bg-emerald-100/50 border-emerald-300 dark:bg-neutral-900 dark:border-neutral-800 shadow-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b bg-emerald-400 text-neutral-900 dark:bg-neutral-800/50 dark:text-neutral-400">
                            <th 
                                className="p-4 text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-emerald-500 dark:hover:bg-neutral-700 transition-colors"
                                onClick={toggleSort}
                            >
                                <div className="flex items-center gap-1">
                                    Date <MdOutlineSort size={16} className={sortOrder === 'asc' ? 'rotate-180' : ''} />
                                </div>
                            </th>
                            <th className="p-4 text-xs font-bold uppercase tracking-wider">Description</th>
                            <th className="p-4 text-xs font-bold uppercase tracking-wider">Category / Account</th>
                            <th className="p-4 text-xs font-bold uppercase tracking-wider">Amount</th>
                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-center">Actions</th>
                        </tr>
                    </thead>

                    {loading ? (
                        <TableSkeleton rows={8} columns={5} />
                    ) : filteredAndSortedData.length === 0 ? (
                        <tbody className="divide-y divide-white dark:divide-neutral-800">
                            <tr>
                                <td colSpan="5" className="p-10 text-center text-neutral-500 italic">
                                    There are no transactions for {months[selectedMonth]} of {selectedYear}.
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody className="divide-y divide-white dark:divide-neutral-800 text-neutral-900 dark:text-white">
                            {filteredAndSortedData.map((item) => (
                                <tr key={item.transaction_id} className="hover:bg-white/40 dark:hover:bg-neutral-800/30 transition-colors group">
                                    <td className="p-4 text-sm font-medium">
                                        {formatDate(item.date)}
                                    </td>
                                    <td className="p-4">
                                        <span className="font-semibold block">{item.description}</span>
                                        <span className="text-[10px] uppercase tracking-tighter opacity-60 md:hidden">{item.type}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center text-xs gap-1 opacity-80">
                                                <MdOutlineCategory className="text-emerald-600 dark:text-emerald-400" />
                                                {item.category?.name || 'Sin categoría'}
                                            </div>
                                            <div className="flex items-center text-xs gap-1 opacity-80">
                                                <MdOutlineAccountBalanceWallet className="text-blue-500 dark:text-blue-400" />
                                                {item.account?.name || 'Sin cuenta'}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`text-sm font-bold ${
                                            item.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                                        }`}>
                                            {item.type === 'income' ? '+' : '-'} {formatCurrency(item.amount)}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button 
                                            onClick={() => onDelete(item)}
                                            className="p-2 text-neutral-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-500/10 rounded-lg transition-all active:scale-90"
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
        </div>
    );
};

export default TableTransactions;