import React from 'react';
import { TiDelete } from "react-icons/ti";
import { GoAlert } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";

const FormCurrencyDelete = ({ isOpen, onClose, onDelete, currencyCode }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-neutral-900 border border-neutral-800 w-full max-w-sm rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GoAlert size={32} />
                </div>
                <h2 className="text-xl font-bold text-white">Are you sure?</h2>
                <p className="text-neutral-500 mt-2">
                    Delete <span className="text-white font-bold">{currencyCode}</span>? This action is permanent.
                </p>
                <div className="flex gap-3 mt-8">
                    <button 
                        onClick={onClose}
                        className="flex-1 px-4 py-3 rounded-xl text-neutral-400 hover:bg-neutral-800 transition-all font-semibold gap-1 flex items-center justify-center active:scale-95"
                    >
                        <TiDelete className='text-2xl' />
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="flex-1 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold transition-all gap-1 flex items-center justify-center active:scale-95"
                    >
                        <RiDeleteBin6Line className='text-2xl' />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormCurrencyDelete;