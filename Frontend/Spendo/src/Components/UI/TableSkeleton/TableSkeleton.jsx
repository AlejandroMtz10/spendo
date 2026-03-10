import React from 'react';

const TableSkeleton = ({ rows = 5, columns = 3 }) => {
    return (
        <tbody className="divide-y divide-white dark:divide-neutral-800">
            {[...Array(rows)].map((_, rowIndex) => (
                <tr key={rowIndex} className="animate-pulse">
                    {[...Array(columns)].map((_, colIndex) => {

                        const isLastColumn = colIndex === columns - 1;

                        return (
                            <td key={colIndex} className="px-6 py-5">
                                {isLastColumn ? (
                                    
                                    <div className="flex justify-center gap-3">
                                        <div className="h-8 w-8 bg-emerald-400/20 dark:bg-neutral-800 rounded-lg"></div>
                                        <div className="h-8 w-8 bg-emerald-400/20 dark:bg-neutral-800 rounded-lg"></div>
                                    </div>
                                ) : (

                                    <div 
                                        className="h-4 bg-emerald-400/20 dark:bg-neutral-800 rounded-md" 
                                        style={{ width: `${Math.floor(Math.random() * (80 - 40 + 1) + 40)}%` }}
                                    ></div>
                                )}
                            </td>
                        );
                    })}
                </tr>
            ))}
        </tbody>
    );
};

export default TableSkeleton;