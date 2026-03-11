import React from 'react';
import { HiOutlineTrash } from "react-icons/hi";
import { TiArrowBack } from "react-icons/ti";

const FormTransactionDelete = ({ isOpen, onClose, onDelete, description }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-neutral-900 border border-neutral-800 w-full max-w-sm rounded-2xl p-6 shadow-2xl text-center">
                {/* Alert icon */}
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-900/20 mb-4">
                    <HiOutlineTrash className="h-10 w-10 text-red-500" />
                </div>

                <h2 className="text-xl font-bold text-white mb-2">Delete Transaction?</h2>
                
                <p className="text-neutral-400 mb-6">
                    Are you sure you want to delete <span className="text-white font-semibold">"{description || 'this movement'}"</span>? 
                    This action cannot be undone and will affect your balances.
                </p>

                <div className="flex gap-3">
                    <button 
                        onClick={onClose} 
                        className="flex-1 px-4 py-3 rounded-xl text-neutral-400 hover:bg-neutral-800 transition-all font-semibold flex items-center justify-center gap-1 active:scale-95"
                    >
                        <TiArrowBack className='text-2xl' />
                        No, Keep it
                    </button>
                    <button 
                        onClick={onDelete} 
                        className="flex-1 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all flex items-center justify-center gap-1 active:scale-95 shadow-lg shadow-red-900/20"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormTransactionDelete;