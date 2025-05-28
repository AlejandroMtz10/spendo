package com.spendo.api.service;

import com.spendo.api.model.TransactionsModel;
import com.spendo.api.repository.ITransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionsService {
    @Autowired
    private ITransactionsRepository transactionsRepository;

    public List<TransactionsModel> getAllTransactions() {
        return transactionsRepository.findAll();
    }
    public Optional<TransactionsModel> getTransactionById(Long id) {
        return transactionsRepository.findById(id);
    }
    public TransactionsModel createTransaction(TransactionsModel transaction) {
        return transactionsRepository.save(transaction);
    }
    public TransactionsModel updateTransaction(Long id, TransactionsModel transaction) {
        if (transactionsRepository.existsById(id)) {
            transaction.setId_transaction(id);
            return transactionsRepository.save(transaction);
        } else {
            return null; // or throw an exception
        }
    }
    public void deleteTransaction(Long id) {
        transactionsRepository.deleteById(id);
    }
    public List<TransactionsModel> createAll(List<TransactionsModel> transaction) {
        return transactionsRepository.saveAll(transaction);
    }
}
