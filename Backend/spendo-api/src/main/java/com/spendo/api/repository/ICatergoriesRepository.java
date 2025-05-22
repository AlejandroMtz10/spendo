package com.spendo.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.spendo.api.model.CategoriesModel;

@Repository
public interface ICatergoriesRepository extends JpaRepository<CategoriesModel, Long> {
    
}
