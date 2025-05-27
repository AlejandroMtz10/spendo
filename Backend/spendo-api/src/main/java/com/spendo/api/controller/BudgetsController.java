package com.spendo.api.controller;

import com.spendo.api.model.BudgetsModel;
import com.spendo.api.repository.IBudgetsRepository;
import com.spendo.api.service.BudgetsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Budgets")
@CrossOrigin(origins = "*")
public class BudgetsController {

    @Autowired
    private BudgetsService budgetsService;

    @GetMapping(value = "readBudgets", headers = "Accept=application/json")
    public List<BudgetsModel> getAllBudgets() {
        return budgetsService.getAllBudgets();
    }

    @GetMapping(value = "readBudgetById/{id}", headers = "Accept=application/json")
    public Optional<BudgetsModel> getBudgetById(@PathVariable Long id) {
        return budgetsService.getBudgetById(id);
    }

    @PostMapping(value = "createBudget", headers = "Accept=application/json")
    public BudgetsModel createBudget(@RequestBody BudgetsModel budget) {
        return budgetsService.createBudget(budget);
    }

    @PutMapping(value = "updateBudget/{id}", headers = "Accept=application/json")
    public BudgetsModel updateBudget(@PathVariable Long id, @RequestBody BudgetsModel budget) {
        return budgetsService.updateBudget(id, budget);
    }

    @DeleteMapping(value = "deleteBudget/{id}", headers = "Accept=application/json")
    public HttpStatus deleteBudget(@PathVariable Long id) {
        budgetsService.deleteBudget(id);
        return HttpStatus.NO_CONTENT;
    }
}