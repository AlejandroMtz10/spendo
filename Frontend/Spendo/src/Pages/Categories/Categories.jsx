import React, { useState, useEffect } from 'react';
import { LuPlus, LuSearch, LuTags } from "react-icons/lu";
import api from '../../api/connection.jsx';
import { toast, ToastContainer } from 'react-toastify';

import FormCategory from "../../Components/Categories/FormCategory";
import FormCategoryDelete from "../../Components/Categories/FormCategoryDelete";
import TableCategories from "../../Components/Categories/TableCategories";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    const initialCategoryState = { 
        category_id: '', 
        name: '', 
        type: 'Income' // Coincide con tu regla 'in:Ingreso,Gasto'
    };

    const [selectedCategory, setSelectedCategory] = useState(initialCategoryState);
    const [isEditing, setIsEditing] = useState(false);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await api.get('/categories');
            // Manejamos la estructura de Laravel Resource (.data)
            const finalData = response.data.data || response.data;
            setCategories(Array.isArray(finalData) ? finalData : []);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error loading categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSave = async () => {

        const payload = { ...selectedCategory };
        if (!payload.category_id || payload.category_id === '') {
            delete payload.category_id;
        }

        try {
            if (isEditing) {
                await api.post(`/categories/${selectedCategory.category_id}`, { 
                    _method: 'PUT',
                    ...payload
                });
                toast.success("Category updated");
            } else {
                await api.post('/categories', payload);
                toast.success("Category created");
            }
            fetchCategories();
            setIsAddEditModalOpen(false);
        } catch (error) {
            const msg = error.response?.data?.errors 
                ? Object.values(error.response.data.errors).flat()[0] 
                : "Operation failed";
            toast.error(msg);
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/categories/${selectedCategory.category_id}`);
            toast.success("Category deleted");
            fetchCategories();
            setIsDeleteModalOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting this category");
        }
    };

    const filteredCategories = categories.filter(item => 
        (item.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (item.type?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    const openAddModal = () => {
        setSelectedCategory(initialCategoryState);
        setIsEditing(false);
        setIsAddEditModalOpen(true);
    };

    const openEditModal = (item) => {
        setSelectedCategory(item);
        setIsEditing(true);
        setIsAddEditModalOpen(true);
    };

    const openDeleteModal = (item) => {
        setSelectedCategory(item);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-emerald-600 gap-2 flex items-center mb-1">
                        <LuTags className="inline-block mr-2" />
                        Categories
                    </h1>
                    <p className="text-neutral-500 text-sm">Organize your income and expenses by category.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                        <input 
                            type="text"
                            placeholder="Search category..."
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

            <TableCategories 
                data={filteredCategories} 
                onEdit={openEditModal} 
                onDelete={openDeleteModal} 
                loading={loading} 
            />

            <FormCategory 
                isOpen={isAddEditModalOpen}
                onClose={() => setIsAddEditModalOpen(false)}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                isEditing={isEditing}
                onSave={handleSave}
            />

            <FormCategoryDelete 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDelete}
                categoryName={selectedCategory.name}
            />
            <ToastContainer position="bottom-right" theme="dark" />
        </div>
    );
};

export default Categories;