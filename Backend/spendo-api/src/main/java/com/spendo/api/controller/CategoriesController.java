package com.spendo.api.controller;

import com.spendo.api.model.CategoriesModel;
import com.spendo.api.service.CategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Categories")
@CrossOrigin(origins = "*")
public class CategoriesController {
    @Autowired
    private CategoriesService categoriesService;

    @GetMapping(value = "readCategories", headers = "Accept=application/json")
    public List<CategoriesModel> getAllCategories() {
        return categoriesService.getAllCategories();
    }

    @GetMapping(value = "readCategoryById/{id}", headers = "Accept=application/json")
    public ResponseEntity<CategoriesModel> getCategoryById(@PathVariable Long id) {
        return categoriesService.getCategoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(value = "createCategory", headers = "Accept=application/json")
    public void createCategory(@RequestBody CategoriesModel category) {
        categoriesService.createCategory(category);
    }

    @PutMapping(value = "updateCategory/{Id}", headers = "Accept=application/json")
    public ResponseEntity<CategoriesModel> updateCategory(@PathVariable Long Id, @RequestBody CategoriesModel category) {
        CategoriesModel updatedCategory = categoriesService.updateCategory(Id, category);
        if (updatedCategory != null) {
            return ResponseEntity.ok(updatedCategory);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping(value = "deleteCategory/{Id}", headers = "Accept=application/json")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long Id) {
        categoriesService.deleteCategory(Id);
        return ResponseEntity.noContent().build();
    }
}
