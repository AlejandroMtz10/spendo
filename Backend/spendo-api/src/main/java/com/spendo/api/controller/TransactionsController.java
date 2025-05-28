package com.spendo.api.controller;

import com.spendo.api.model.TransactionsModel;
import com.spendo.api.repository.ITransactionsRepository;
import com.spendo.api.service.TransactionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Transactions")
@CrossOrigin(origins = "*")
public class TransactionsController {
    @Autowired
    private TransactionsService transactionsService;

    @GetMapping(value = "readTransactions", headers = "Accept=application/json")
    public List<TransactionsModel> getAllTransactions() {
        return transactionsService.getAllTransactions();
    }

    @GetMapping(value = "readTransactionById/{id}", headers = "Accept=application/json")
    public Optional<TransactionsModel> getTransactionById(@PathVariable Long id) {
        return transactionsService.getTransactionById(id);
    }

    @PostMapping(value = "createTransaction", headers = "Accept=application/json")
    public TransactionsModel createTransaction(@RequestBody TransactionsModel transaction) {
        return transactionsService.createTransaction(transaction);
    }

    @PutMapping(value = "updateTransaction/{id}", headers = "Accept=application/json")
    public TransactionsModel updateTransaction(@PathVariable Long id, @RequestBody TransactionsModel transaction) {
        return transactionsService.updateTransaction(id, transaction);
    }

    @DeleteMapping(value = "deleteTransaction/{id}", headers = "Accept=application/json")
    public HttpStatus deleteTransaction(@PathVariable Long id) {
        transactionsService.deleteTransaction(id);
        return HttpStatus.NO_CONTENT;
    }
}