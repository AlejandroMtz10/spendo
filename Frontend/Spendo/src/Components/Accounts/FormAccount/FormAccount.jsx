import React, { useState, useEffect } from 'react';
import { HiOutlineSaveAs } from "react-icons/hi";
import { TiDelete } from "react-icons/ti";
import api from '../../../api/connection.jsx';

const FormAccount = ({ isOpen, onClose, selectedAccount, setSelectedAccount, isEditing, onSave }) => {
    const [currencies, setCurrencies] = useState([]);
    const [loadingCurrencies, setLoadingCurrencies] = useState(false);

    // Types of accounts add more if you needed
    const accountTypes = [
        { value: "cash", label: "Cash" },
        { value: "bank", label: "Bank | Checks | Nomina | Debit Card" },
        { value: "credit card", label: "Credit Card" },
        { value: "savings", label: "Savings" },
        { value: "investment", label: "Investment" }
    ];

    // Load currencies when the modal opens
    useEffect(() => {
        if (isOpen) {
            const fetchCurrencies = async () => {
                setLoadingCurrencies(true);
                try {
                    const response = await api.get('/currencies');
                    const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
                    setCurrencies(data);
                } catch (error) {
                    console.error("Error fetching currencies for select", error);
                } finally {
                    setLoadingCurrencies(false);
                }
            };
            fetchCurrencies();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-2xl p-6 shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-4">
                    {isEditing ? 'Edit Account' : 'Add New Account'}
                </h2>
                
                <div className="space-y-4">
                    {/* Account Name */}
                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Account Name</label>
                        <input 
                            type="text" 
                            value={selectedAccount.name}
                            onChange={(e) => setSelectedAccount({...selectedAccount, name: e.target.value})}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                            placeholder="e.g. Main Wallet"
                        />
                    </div>

                    {/* Currency selector */}
                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Currency</label>
                        <select 
                            disabled={loadingCurrencies} // <-- Usamos el estado aquí
                            value={selectedAccount.code_currency}
                            onChange={(e) => setSelectedAccount({...selectedAccount, code_currency: e.target.value})}
                            className={`w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 appearance-none ${loadingCurrencies ? 'opacity-50 cursor-wait' : ''}`}
                        >
                            {loadingCurrencies ? (
                                <option>Loading currencies...</option>
                            ) : (
                                <>
                                    <option value="">Select a currency</option>
                                    {currencies.map((curr) => (
                                        <option key={curr.code_currency} value={curr.code_currency}>
                                            {curr.code_currency} - {curr.currency}
                                        </option>
                                    ))}
                                </>
                            )}
                        </select>
                    </div>

                    {/* Account Type Selector */}
                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Account Type</label>
                        <select 
                            value={selectedAccount.type}
                            onChange={(e) => setSelectedAccount({...selectedAccount, type: e.target.value})}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 appearance-none"
                        >
                            <option value="">Select type</option>
                            {accountTypes.map((typeObj) => (
                                <option key={typeObj.value} value={typeObj.value}>
                                    {typeObj.label} 
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Initial Balance (Disabled if you are editing, depending on your business logic) */}
                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Balance</label>
                        <input 
                            type="number" 
                            step="0.01"
                            value={selectedAccount.balance}
                            onChange={(e) => setSelectedAccount({...selectedAccount, balance: e.target.value})}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div className="flex gap-3 mt-8">
                    <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl text-neutral-400 hover:bg-red-600 hover:text-white transition-all font-semibold gap-1 flex items-center justify-center active:scale-95">
                        <TiDelete className='text-2xl' />
                        Cancel
                    </button>
                    <button onClick={onSave} className="flex-1 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold transition-all gap-1 flex items-center justify-center active:scale-95">
                        <HiOutlineSaveAs className='text-2xl'/>
                        {isEditing ? 'Update' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormAccount;