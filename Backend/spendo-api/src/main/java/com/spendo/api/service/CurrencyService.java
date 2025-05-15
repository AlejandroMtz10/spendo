package com.spendo.api.service;

import com.spendo.api.model.CurrencyModel;
import com.spendo.api.repository.ICurrencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CurrencyService {
    @Autowired
    private ICurrencyRepository currencyRepository;

    public List<CurrencyModel> getAllCurrencies() {
        return currencyRepository.findAll();
    }

    public Optional<CurrencyModel> getCurrencyByCode(String code) {
        return currencyRepository.findById(code);
    }
    
    public List<CurrencyModel> createAll(List<CurrencyModel> currencies){
        return currencyRepository.saveAll(currencies);
    }


    public CurrencyModel createcCurrency(CurrencyModel currency){
        return currencyRepository.save(currency);
    }

    public CurrencyModel updateCurrency(String code, CurrencyModel currency) {
        if (currencyRepository.existsById(code)) {
            currency.setCode_currency(code);
            return currencyRepository.save(currency);
        } else {
            return null; // or throw an exception
        }
    }

    public void deleteCurrency(String code) {
        currencyRepository.deleteById(code);
    }
}