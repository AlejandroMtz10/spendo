import TableSkeleton from '../../UI/TableSkeleton';
import { LuPencil, LuTrash2 } from "react-icons/lu";

const TableAccounts = ({ data, onEdit, onDelete, loading }) => {
    
    // format balance as currency, we can enhance this later to use the actual currency code from the row
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);
    };

    return (
        <div className="bg-emerald-200 border-emerald-300 dark:bg-neutral-900 border dark:border-neutral-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-emerald-400 text-neutral-900 dark:bg-neutral-800/50 dark:text-neutral-400 text-sm uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold">Account Name</th>
                        <th className="px-6 py-4 font-semibold">Type</th>
                        <th className="px-6 py-4 font-semibold">Currency</th>
                        <th className="px-6 py-4 font-semibold">Balance</th>
                        <th className="px-6 py-4 font-semibold text-center">Actions</th>
                    </tr>
                </thead>
                
                {loading ? (
                    <TableSkeleton rows={5} />
                ) : (
                    <tbody className="divide-y divide-white dark:divide-neutral-800">
                        {data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.account_id} className="hover:bg-neutral-800/30 transition-colors">
                                    {/* Name */}
                                    <td className="px-6 py-4 text-neutral-900 dark:text-neutral-200 font-medium">
                                        {item.name}
                                    </td>
                                    
                                    {/* Type with a small Badge */}
                                    <td className="px-6 py-4 text-neutral-900 dark:text-neutral-400">
                                        <span className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs px-2 py-1 rounded-lg border border-emerald-500/20">
                                            {item.type}
                                        </span>
                                    </td>

                                    {/* Currency */}
                                    <td className="px-6 py-4 text-neutral-950 dark:text-emerald-400 font-mono font-bold">
                                        {item.code_currency}
                                    </td>

                                    {/* Balance */}
                                    <td className={`px-6 py-4 font-bold ${item.balance >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                                        {formatCurrency(item.balance)}
                                    </td>

                                    {/* Actions */}
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
                                <td colSpan="5" className="px-6 py-10 text-center text-emerald-500 dark:text-neutral-500 italic">
                                    No accounts found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                )}
            </table>
        </div>
    );
};

export default TableAccounts;