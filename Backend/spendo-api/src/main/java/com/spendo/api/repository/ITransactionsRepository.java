package com.spendo.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.spendo.api.model.TransactionsModel;

@Repository
public interface ITransactionsRepository extends JpaRepository<TransactionsModel, Long> {
    
}