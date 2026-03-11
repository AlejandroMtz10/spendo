import React, { useState, useEffect } from 'react';
import { LuPlus, LuSearch, LuArrowLeftRight } from "react-icons/lu";
import api from '../../api/connection.jsx';
import { toast, ToastContainer } from 'react-toastify';

import FormTransaction from "../../Components/Transactions/FormTransaction";
import FormTransactionDelete from "../../Components/Transactions/FormTransactionDelete";
import TableTransactions from "../../Components/Transactions/TableTransactions";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    const initialTransactionState = { 
        transaction_id: '', 
        account_id: '', 
        category_id: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0], // Current date by default
        type: 'Expense' // Expense by default
    };

    const [selectedTransaction, setSelectedTransaction] = useState(initialTransactionState);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const response = await api.get('/transactions');
            const finalData = response.data.data || response.data;
            setTransactions(Array.isArray(finalData) ? finalData : []);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error loading transactions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleSave = async () => {
        try {
            await api.post('/transactions', selectedTransaction);
            toast.success("Transaction recorded successfully");
            
            fetchTransactions();
            setIsAddModalOpen(false);
        } catch (error) {
            const msg = error.response?.data?.errors 
                ? Object.values(error.response.data.errors).flat()[0] 
                : (error.response?.data?.message || "Operation failed");
            toast.error(msg);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/transactions/${selectedTransaction.transaction_id}`);
            toast.success("Transaction deleted");
            fetchTransactions();
            setIsDeleteModalOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting transaction");
        }
    };

    // Filter transactions based on search term
    const filteredTransactions = transactions.filter(item => 
        (item.description?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (item.category?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (item.account?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    const openAddModal = () => {
        setSelectedTransaction(initialTransactionState);
        setIsAddModalOpen(true);
    };

    const openDeleteModal = (item) => {
        setSelectedTransaction(item);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-emerald-600 gap-2 flex items-center mb-1">
                        <LuArrowLeftRight className="inline-block mr-2" />
                        Transactions
                    </h1>
                    <p className="text-neutral-500 text-sm">Monitor your cash flow and movements.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                        <input 
                            type="text"
                            placeholder="Search movements..."
                            className="bg-emerald-200 border-emerald-300 text-black dark:bg-neutral-800 border dark:border-neutral-700 dark:text-white pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:border-emerald-500 transition-all w-64"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={openAddModal}
                        className="bg-emerald-500 hover:bg-emerald-400 text-white dark:text-neutral-950 font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-all active:scale-95"
                    >
                        <LuPlus size={20} /> New Transaction
                    </button>
                </div>
            </div>

            <TableTransactions 
                data={filteredTransactions} 
                onDelete={openDeleteModal} 
                loading={loading} 
            />

            <FormTransaction 
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                selectedTransaction={selectedTransaction}
                setSelectedTransaction={setSelectedTransaction}
                onSave={handleSave}
            />

            <FormTransactionDelete 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDelete}
                description={selectedTransaction.description}
            />
            
            <ToastContainer position="bottom-right" theme="dark" />
        </div>
    );
};

export default Transactions;