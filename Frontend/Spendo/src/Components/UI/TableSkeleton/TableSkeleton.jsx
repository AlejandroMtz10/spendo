import React from 'react';

const TableSkeleton = ({ rows = 5 }) => {
    return (
        <tbody className="divide-y divide-neutral-800">
            {[...Array(rows)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                <td className="px-6 py-5">
                    <div className="h-4 bg-neutral-800 rounded-md w-12"></div>
                </td>
                <td className="px-6 py-5">
                    <div className="h-4 bg-neutral-800 rounded-md w-48"></div>
                </td>
                <td className="px-6 py-5">
                    <div className="flex justify-center gap-3">
                    <div className="h-8 w-8 bg-neutral-800 rounded-lg"></div>
                    <div className="h-8 w-8 bg-neutral-800 rounded-lg"></div>
                    </div>
                </td>
                </tr>
            ))}
        </tbody>
    );
};

export default TableSkeleton;