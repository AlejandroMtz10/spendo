import React, { useState, useEffect } from 'react';
import { LuPlus, LuSearch } from "react-icons/lu";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import api from '../../api/connection.jsx';
import { toast, ToastContainer } from 'react-toastify';

import FormAccount from "../../Components/Accounts/FormAccount";
import FormAccountDelete from "../../Components/Accounts/FormAccountDelete";
import TableAccounts from "../../Components/Accounts/TableAccounts";

const Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    // Initial state for a new account, also used to reset the form when adding a new account
    const initialAccountState = { 
        account_id: '', 
        code_currency: '', 
        name: '', 
        type: 'Cash', // Default type, you can change it as needed
        balance: 0 
    };

    const [selectedAccount, setSelectedAccount] = useState(initialAccountState);
    const [isEditing, setIsEditing] = useState(false);

    // Load data from API
    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const response = await api.get('/accounts');
            const rawData = response.data;
            const finalData = Array.isArray(rawData) ? rawData : (rawData.data || []);
            setAccounts(finalData);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error loading accounts", {
                position: "bottom-right", theme: "dark"
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    // Save (Create or Update)
    const handleSave = async () => {
        try {
            if (isEditing) {
                // Use POST with _method: 'PUT' for updating, as per your backend setup
                await api.post(`/accounts/${selectedAccount.account_id}`, { 
                    _method: 'PUT',
                    ...selectedAccount
                });
                toast.success("Account updated successfully");
            } else {
                await api.post('/accounts', selectedAccount);
                toast.success("Account created successfully");
            }
            fetchAccounts();
            setIsAddEditModalOpen(false);
        } catch (error) {
            const errorMessage = error.response?.data?.errors 
                ? Object.values(error.response.data.errors).flat()[0] 
                : (error.response?.data?.message || "Operation failed");
            toast.error(errorMessage);
        }
    };

    // Delete
    const handleDelete = async () => {
        try {
            await api.delete(`/accounts/${selectedAccount.account_id}`);
            toast.success("Account deleted successfully");
            fetchAccounts();
            setIsDeleteModalOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting account");
        }
    };

    // Filter accounts based on search term (searching in name and type)
    const filteredAccounts = Array.isArray(accounts) 
        ? accounts.filter(item => 
            (item.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (item.type?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        ) : [];

    const openAddModal = () => {
        setSelectedAccount(initialAccountState);
        setIsEditing(false);
        setIsAddEditModalOpen(true);
    };

    const openEditModal = (item) => {
        setSelectedAccount(item);
        setIsEditing(true);
        setIsAddEditModalOpen(true);
    };

    const openDeleteModal = (item) => {
        setSelectedAccount(item);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-emerald-600 gap-2 flex items-center mb-1">
                        <MdOutlineAccountBalanceWallet className="inline-block mr-2" />
                        Accounts
                    </h1>
                    <p className="text-neutral-500 text-sm">Manage your bank accounts, wallets and balances.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                        <input 
                            type="text"
                            placeholder="Search account..."
                            className="bg-emerald-200 border-emerald-300 text-black dark:bg-neutral-800 border dark:border-neutral-700 dark:text-white pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:border-emerald-500 transition-all w-64"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={openAddModal}
                        className="bg-emerald-500 hover:bg-emerald-400 text-white dark:text-neutral-950 font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-all active:scale-95"
                    >
                        <LuPlus size={20} /> Add New
                    </button>
                </div>
            </div>

            <TableAccounts 
                data={filteredAccounts} 
                onEdit={openEditModal} 
                onDelete={openDeleteModal} 
                loading={loading} 
            />

            <FormAccount 
                isOpen={isAddEditModalOpen}
                onClose={() => setIsAddEditModalOpen(false)}
                selectedAccount={selectedAccount}
                setSelectedAccount={setSelectedAccount}
                isEditing={isEditing}
                onSave={handleSave}
            />

            <FormAccountDelete 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDelete}
                accountName={selectedAccount.name}
            />
            <ToastContainer position="bottom-right" theme="dark" />
        </div>
    );
};

export default Accounts;