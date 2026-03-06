import TableSkeleton from '../../UI/TableSkeleton';
import { LuPencil, LuTrash2 } from "react-icons/lu";

const TableCurrencies = ({ data, onEdit, onDelete, loading }) => {
    return (
        <div className="bg-emerald-200 border-emerald-300 dark:bg-neutral-900 border dark:border-neutral-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-emerald-400 text-neutral-900 dark:bg-neutral-800/50 dark:text-neutral-400 text-sm uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold">Code</th>
                        <th className="px-6 py-4 font-semibold">Name</th>
                        <th className="px-6 py-4 font-semibold text-center">Actions</th>
                    </tr>
                </thead>
                
                {loading ? (
                    <TableSkeleton rows={5} />
                ) : (
                    <tbody className="divide-y divide-white dark:divide-neutral-800">
                        {data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.code_currency} className="hover:bg-neutral-800/30 transition-colors">
                                    <td className="px-6 py-4 text-neutral-950 dark:text-emerald-400 font-mono font-bold">{item.code_currency}</td>
                                    <td className="px-6 py-4 text-neutral-900 dark:text-neutral-200">{item.currency}</td>
                                    <td className="px-6 py-4 flex justify-center gap-2">
                                        <button onClick={() => onEdit(item)} className="p-2 text-neutral-700 dark:text-neutral-400 hover:text-emerald-300 hover:bg-emerald-700 dark:hover:text-emerald-400 dark:hover:bg-emerald-400/10 rounded-lg">
                                            <LuPencil size={18} />
                                        </button>
                                        <button onClick={() => onDelete(item)} className="p-2 text-neutral-700 dark:text-neutral-400 hover:text-red-300 hover:bg-red-700 dark:hover:text-red-400 dark:hover:bg-red-400/10 rounded-lg">
                                            <LuTrash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-6 py-10 text-center text-emerald-500 dark:text-neutral-500 italic">
                                    No currencies found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                )}
            </table>
        </div>
    );
};

export default TableCurrencies;