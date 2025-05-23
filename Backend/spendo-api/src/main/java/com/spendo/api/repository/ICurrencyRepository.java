package com.spendo.api.repository;

import com.spendo.api.model.CurrencyModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICurrencyRepository extends JpaRepository<CurrencyModel, String> {
    
}