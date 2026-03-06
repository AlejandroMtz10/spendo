{/* This component is for creating or updating data about currencies */}
import React from 'react';
import { HiOutlineSaveAs } from "react-icons/hi";
import { TiDelete } from "react-icons/ti";

const FormCurrency = ({ isOpen, onClose, selectedCurrency, setSelectedCurrency, isEditing, onSave }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-2xl p-6 shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-4">
                    {isEditing ? 'Edit Currency' : 'Add New Currency'}
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Code (ISO)</label>
                        <input 
                            type="text" 
                            maxLength={3}
                            disabled={isEditing}
                            value={selectedCurrency.code_currency}
                            onChange={(e) => setSelectedCurrency({...selectedCurrency, code_currency: e.target.value.toUpperCase()})}
                            className={`w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 ${isEditing && 'opacity-50 cursor-not-allowed'}`}
                            placeholder="USD"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Currency Name</label>
                        <input 
                            type="text" 
                            value={selectedCurrency.currency}
                            onChange={(e) => setSelectedCurrency({...selectedCurrency, currency: e.target.value})}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                            placeholder="US Dollar"
                        />
                    </div>
                </div>
                <div className="flex gap-3 mt-8">
                    <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl text-neutral-400 hover:bg-red-600 hover:text-white transition-all font-semibold gap-1 flex items-center justify-center active:scale-95">
                        <TiDelete className='text-2xl' />
                        Cancel
                    </button>
                    <button onClick={onSave} className="flex-1 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 hover:text-white text-neutral-950 font-bold transition-all gap-1 flex items-center justify-center active:scale-95">
                        <HiOutlineSaveAs className='text-2xl'/>
                        {isEditing ? 'Update' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormCurrency;