package com.spendo.api.repository;

import com.spendo.api.model.BudgetsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBudgetsRepository extends JpaRepository<BudgetsModel, Long> {
    
}