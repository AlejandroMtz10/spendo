import React, { useState, useEffect } from 'react';
import { HiOutlineSaveAs } from "react-icons/hi";
import { TiDelete } from "react-icons/ti";
import api from '../../../api/connection.jsx';

const FormTransaction = ({ isOpen, onClose, selectedTransaction, setSelectedTransaction, onSave }) => {
    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loadingData, setLoadingData] = useState(false);

    // Load accounts and categories when the form opens
    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                setLoadingData(true);
                try {
                    const [accRes, catRes] = await Promise.all([
                        api.get('/accounts'),
                        api.get('/categories')
                    ]);
                    
                    setAccounts(accRes.data.data || accRes.data);
                    setCategories(catRes.data.data || catRes.data);
                } catch (error) {
                    console.error("Error fetching data for transaction form", error);
                } finally {
                    setLoadingData(false);
                }
            };
            fetchData();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-6">Record New Transaction</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Amount */}
                    <div className="md:col-span-2">
                        <label className="block text-sm text-neutral-400 mb-1">Amount</label>
                        <input 
                            type="number" 
                            step="0.01"
                            value={selectedTransaction.amount}
                            onChange={(e) => setSelectedTransaction({...selectedTransaction, amount: e.target.value})}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-4 text-2xl font-bold text-emerald-500 focus:outline-none focus:border-emerald-500"
                            placeholder="0.00"
                        />
                    </div>

                    {/* Type Selector */}
                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Type</label>
                        <select 
                            value={selectedTransaction.type}
                            onChange={(e) => setSelectedTransaction({...selectedTransaction, type: e.target.value})}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 appearance-none"
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Date</label>
                        <input 
                            type="date" 
                            value={selectedTransaction.date}
                            onChange={(e) => setSelectedTransaction({...selectedTransaction, date: e.target.value})}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                        />
                    </div>

                    {/* Account Selector */}
                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Source Account</label>
                        <select 
                            value={selectedTransaction.account_id}
                            onChange={(e) => setSelectedTransaction({...selectedTransaction, account_id: e.target.value})}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 appearance-none"
                        >
                            <option value="">Select Account</option>
                            {accounts.map(acc => (
                                <option key={acc.account_id} value={acc.account_id}>{acc.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Category Selector */}
                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Category</label>
                        <select 
                            value={selectedTransaction.category_id}
                            onChange={(e) => setSelectedTransaction({...selectedTransaction, category_id: e.target.value})}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 appearance-none"
                        >
                            <option value="">Select Category</option>
                            {categories
                                .filter(cat => cat.type?.toLowerCase() === selectedTransaction.type?.toLowerCase()) 
                                .map(cat => (
                                    <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm text-neutral-400 mb-1">Description</label>
                        <textarea 
                            value={selectedTransaction.description}
                            onChange={(e) => setSelectedTransaction({...selectedTransaction, description: e.target.value})}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 h-20 resize-none"
                            placeholder="Lunch with the team..."
                        />
                    </div>
                </div>

                <div className="flex gap-3 mt-8">
                    <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl text-neutral-400 hover:bg-red-600 hover:text-white transition-all font-semibold flex items-center justify-center gap-1 active:scale-95">
                        <TiDelete className='text-2xl' />
                        Cancel
                    </button>
                    <button 
                        onClick={onSave} 
                        disabled={loadingData}
                        className="flex-1 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold transition-all flex items-center justify-center gap-1 active:scale-95 disabled:opacity-50"
                    >
                        <HiOutlineSaveAs className='text-2xl'/>
                        Save Transaction
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormTransaction;