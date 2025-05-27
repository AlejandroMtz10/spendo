package com.spendo.api.service;

import com.spendo.api.model.BudgetsModel;
import com.spendo.api.repository.IBudgetsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BudgetsService {
    @Autowired
    private IBudgetsRepository budgetsRepository;

    public List<BudgetsModel> getAllBudgets() {
        return budgetsRepository.findAll();
    }

    public Optional<BudgetsModel> getBudgetById(Long id) {
        return budgetsRepository.findById(id);
    }

    public BudgetsModel createBudget(BudgetsModel budget) {
        return budgetsRepository.save(budget);
    }

    public BudgetsModel updateBudget(Long id, BudgetsModel budget) {
        if (budgetsRepository.existsById(id)) {
            budget.setId_budget(id);
            return budgetsRepository.save(budget);
        } else {
            return null;
        }
    }

    public void deleteBudget(Long id) {
        budgetsRepository.deleteById(id);
    }
}