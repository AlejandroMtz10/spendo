import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

const BarChartWidget = ({ data, dataKey, xKey, title }) => {
    // validate if the data is empty or all values are zero to show a message instead of the chart
    const isAllZero = data.length > 0 && data.every(item => item[dataKey] === 0);

    return (
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm h-96 flex flex-col relative">
            <h3 className="text-lg font-bold mb-4 dark:text-white">{title}</h3>
            
            <div className="flex-1 w-full relative">
                {/* Message overlay if all values are 0 */}
                {isAllZero && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <p className="text-neutral-400 text-sm bg-white/80 dark:bg-neutral-900/80 px-4 py-2 rounded-full">
                            No balance recorded this period
                        </p>
                    </div>
                )}

                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.1} />
                        <XAxis 
                            dataKey={xKey} 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#888', fontSize: 12}} 
                        />
                        {/* Axis Y to show values */}
                        <YAxis hide domain={['auto', 'auto']} />
                        <Tooltip 
                            cursor={{fill: 'transparent'}}
                            contentStyle={{ 
                                borderRadius: '12px', 
                                border: 'none', 
                                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                                backgroundColor: '#171717',
                                color: '#fff'
                            }}
                            itemStyle={{ color: '#fff' }}
                        />
                        {/* Base line at 0 to separate positives from negatives */}
                        <ReferenceLine y={0} stroke="#666" strokeWidth={1} opacity={0.5} />
                        
                        <Bar dataKey={dataKey}>
                            {data.map((entry, index) => {
                                const value = entry[dataKey];
                                return (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        // Green if > 0, Red if < 0, Gray if 0
                                        fill={value > 0 ? '#10b981' : value < 0 ? '#ef4444' : '#d4d4d4'} 
                                        // Radius adjustment: if negative, rounding goes on the bottom
                                        radius={value >= 0 ? [6, 6, 0, 0] : [0, 0, 6, 6]}
                                    />
                                );
                            })}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BarChartWidget;