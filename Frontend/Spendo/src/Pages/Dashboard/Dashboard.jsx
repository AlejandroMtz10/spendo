import React, { useEffect, useState } from "react";
import api from "../../api/connection.jsx";
import BarChartWidget from "../../Components/Dashboard/BarChartWidget";
import PieChartWidget from "../../Components/Dashboard/PieChartWidget";
import { HiOutlineTrendingUp, HiOutlineTrendingDown, HiOutlineScale } from "react-icons/hi";

function Dashboard() {
    const [mainData, setMainData] = useState(null);
    const [expenseData, setExpenseData] = useState([]);
    const [savingsData, setSavingsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [main, expenses, savings] = await Promise.all([
                    api.get('/dashboard/main'),
                    api.get('/dashboard/expenses'),
                    api.get('/dashboard/savings')
                ]);
                setMainData(main.data);
                setExpenseData(expenses.data.by_category);
                setSavingsData(savings.data.savings_trend);
            } catch (error) {
                console.error("Error loading dashboard", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const income = mainData?.month_income || 0;
    const expense = mainData?.month_expense || 0;
    const diff = income - expense;

    if (loading) {
        return (
            <div className="p-6 space-y-6 max-w-7xl mx-auto animate-pulse">
                <div className="h-20 bg-neutral-200 dark:bg-neutral-800 rounded-3xl w-1/3"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-32 bg-neutral-200 dark:bg-neutral-800 rounded-3xl"></div>
                    <div className="h-32 bg-neutral-200 dark:bg-neutral-800 rounded-3xl"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-80 bg-neutral-200 dark:bg-neutral-800 rounded-3xl"></div>
                    <div className="h-80 bg-neutral-200 dark:bg-neutral-800 rounded-3xl"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto animate-fadeIn">
            <header>
                <h1 className="text-3xl font-bold dark:text-white">Financial Overview</h1>
                <p className="text-neutral-500">Track your progress and spending habits.</p>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* General Balance Card by currency */}
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm text-neutral-500 font-medium">Total Balance</p>
                        <div className="mt-2 space-y-1">
                            {mainData?.balances?.length > 0 ? (
                                mainData.balances.map((b) => (
                                    <p key={b.currency} className="text-2xl font-bold dark:text-white">
                                        {new Intl.NumberFormat('es-MX', { 
                                            style: 'currency', 
                                            currency: b.currency, 
                                            currencyDisplay: 'code'
                                        }).format(b.total)}
                                    </p>
                                ))
                            ) : (
                                <p className="text-2xl font-bold dark:text-white">$0.00</p>
                            )}
                        </div>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-2xl text-blue-500">
                        <HiOutlineScale />
                    </div>
                </div>

                {/* Monthly Cash Flow Card */}
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm text-neutral-500 font-medium">Monthly Cash Flow</p>
                        <p className={`text-2xl font-bold mt-1 ${diff >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                            {diff >= 0 ? '+' : ''}{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(diff)}
                        </p>
                        <div className="flex gap-4 mt-2 text-xs font-medium">
                            <span className="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">
                                In: ${income.toLocaleString()}
                            </span>
                            <span className="text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg">
                                Out: ${expense.toLocaleString()}
                            </span>
                        </div>
                    </div>
                    <div className={`p-4 rounded-2xl text-2xl ${diff >= 0 ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500' : 'bg-red-50 dark:bg-red-900/20 text-red-500'}`}>
                        {diff >= 0 ? <HiOutlineTrendingUp /> : <HiOutlineTrendingDown />}
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BarChartWidget 
                    title="Savings Trend (Last 6 Months)" 
                    data={savingsData} 
                    xKey="month" 
                    dataKey="savings" 
                />
                <PieChartWidget 
                    title="Expenses by Category" 
                    data={expenseData} 
                />
            </div>
        </div>
    );
}

export default Dashboard;