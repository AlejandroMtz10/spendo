package com.spendo.api.service;

import com.spendo.api.model.CategoriesModel;
import com.spendo.api.repository.ICatergoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriesService {
    @Autowired
    private ICatergoriesRepository categoryRepository;

    public List<CategoriesModel> getAllCategories() {
        return categoryRepository.findAll();
    }
    public Optional<CategoriesModel> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }
    public CategoriesModel createCategory(CategoriesModel category) {
        return categoryRepository.save(category);
    }
    public CategoriesModel updateCategory(Long id, CategoriesModel category) {
        if (categoryRepository.existsById(id)) {
            category.setId_category(id);
            return categoryRepository.save(category);
        } else {
            return null; // or throw an exception
        }
    }
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
