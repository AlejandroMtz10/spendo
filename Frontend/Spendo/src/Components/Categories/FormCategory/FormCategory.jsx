import React from 'react';
import { HiOutlineSaveAs } from "react-icons/hi";
import { TiDelete } from "react-icons/ti";

const FormCategory = ({ isOpen, onClose, selectedCategory, setSelectedCategory, isEditing, onSave }) => {
    
    // Predefined category types for the dropdown selector
    const categoryTypes = [
        { value: "Income", label: "Income" },
        { value: "Expense", label: "Expense" }
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-2xl p-6 shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-4">
                    {isEditing ? 'Edit Category' : 'Add New Category'}
                </h2>
                
                <div className="space-y-4">
                    {/* Category Name */}
                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Category Name</label>
                        <input 
                            type="text" 
                            value={selectedCategory.name}
                            onChange={(e) => setSelectedCategory({...selectedCategory, name: e.target.value})}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 transition-all"
                            placeholder="e.g. Groceries, Salary, Subscriptions"
                        />
                    </div>

                    {/* Category Type Selector */}
                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Category Type</label>
                        <select 
                            value={selectedCategory.type}
                            onChange={(e) => setSelectedCategory({...selectedCategory, type: e.target.value})}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
                        >
                            <option value="">Select a type</option>
                            {categoryTypes.map((typeObj) => (
                                <option key={typeObj.value} value={typeObj.value}>
                                    {typeObj.label} 
                                </option>
                            ))}
                        </select>
                        <p className="mt-1.5 text-xs text-neutral-500">
                            Determines if this category belongs to an income or an expense.
                        </p>
                    </div>
                </div>

                <div className="flex gap-3 mt-8">
                    {/* Cancel Button */}
                    <button 
                        onClick={onClose} 
                        className="flex-1 px-4 py-3 rounded-xl text-neutral-400 hover:bg-red-600 hover:text-white transition-all font-semibold gap-1 flex items-center justify-center active:scale-95"
                    >
                        <TiDelete className='text-2xl' />
                        Cancel
                    </button>

                    {/* Save/Update Button */}
                    <button 
                        onClick={onSave} 
                        className="flex-1 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold transition-all gap-1 flex items-center justify-center active:scale-95"
                    >
                        <HiOutlineSaveAs className='text-2xl'/>
                        {isEditing ? 'Update' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormCategory;