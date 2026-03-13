import React, { useState, useEffect } from 'react';
import { LuPlus, LuSearch } from "react-icons/lu";
import api from '../../api/connection.jsx';
import { toast } from 'react-toastify';
import { BsCurrencyExchange } from "react-icons/bs";

// Importación de componentes modulares
import FormCurrency from "../../Components/Currencies/FormCurrency";
import FormCurrencyDelete from "../../Components/Currencies/FormCurrencyDelete";
import TableCurrencies from "../../Components/Currencies/TableCurrencies";

const Currencies = () => {
    const [currencies, setCurrencies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    const [selectedCurrency, setSelectedCurrency] = useState({ code_currency: '', currency: '' });
    const [isEditing, setIsEditing] = useState(false);

    // 1. Cargar divisas desde la API
    const fetchCurrencies = async () => {
        setLoading(true);
        try {
            const response = await api.get('/currencies');
            const rawData = response.data;
            const finalData = Array.isArray(rawData) 
                ? rawData 
                : (Array.isArray(rawData.data) ? rawData.data : []);
            setCurrencies(finalData);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Error loading currencies"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrencies();
    }, []);

    // 2. Funciones de persistencia
    const handleSave = async () => {
        try {
            if (isEditing) {
                await api.put(`/currencies/${selectedCurrency.code_currency}`, { 
                    _method: 'PUT', 
                    code_currency: selectedCurrency.code_currency,
                    currency: selectedCurrency.currency
                });
                toast.success("Currency updated successfully");
            } else {
                await api.post('/currencies', selectedCurrency);
                toast.success("Currency created successfully");
            }
            fetchCurrencies();
            setIsAddEditModalOpen(false);
        } catch (error) {
            // Aquí mostramos el error específico que viene de Laravel si existe
            const errorMessage = error.response?.data?.errors 
                ? Object.values(error.response.data.errors).flat()[0] 
                : (error.response?.data?.message || "Operation failed");

            toast.error(errorMessage);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/currencies/${selectedCurrency.code_currency}`);
            toast.success("Currency deleted successfully");
            fetchCurrencies();
            setIsDeleteModalOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting currency");
        }
    };

    // 3. Filtrado
    const filteredCurrencies = Array.isArray(currencies) 
        ? currencies.filter(item => 
            (item.currency?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (item.code_currency?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        ): [];

    // 4. Handlers para abrir modales
    const openAddModal = () => {
        setSelectedCurrency({ code_currency: '', currency: '' });
        setIsEditing(false);
        setIsAddEditModalOpen(true);
    };

    const openEditModal = (item) => {
        setSelectedCurrency(item);
        setIsEditing(true);
        setIsAddEditModalOpen(true);
    };

    const openDeleteModal = (item) => {
        setSelectedCurrency(item);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Header y Buscador */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-emerald-600 gap-2 flex items-center mb-1">
                        <BsCurrencyExchange className="inline-block mr-2" />
                        Currencies
                    </h1>
                    <p className="text-neutral-500 text-sm">Manage your available global currencies.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                        <input 
                            type="text"
                            placeholder="Search currency..."
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

            {/* Tabla Modular: Aquí pasamos la prop 'loading' para que VS Code deje de quejarse */}
            <TableCurrencies 
                data={filteredCurrencies} 
                onEdit={openEditModal} 
                onDelete={openDeleteModal} 
                loading={loading} 
            />

            {/* Modal de Formulario */}
            <FormCurrency 
                isOpen={isAddEditModalOpen}
                onClose={() => setIsAddEditModalOpen(false)}
                selectedCurrency={selectedCurrency}
                setSelectedCurrency={setSelectedCurrency}
                isEditing={isEditing}
                onSave={handleSave}
            />

            {/* Modal de Eliminación */}
            <FormCurrencyDelete 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDelete}
                currencyCode={selectedCurrency.code_currency}
            />

        </div>
    );
};

export default Currencies;