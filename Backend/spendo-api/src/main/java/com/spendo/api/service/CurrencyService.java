package com.spendo.api.service;

import com.spendo.api.model.Currency;
import com.spendo.api.repository.ICurrencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CurrencyService {
    @Autowired
    private ICurrencyRepository currencyRepository;

    public List<Currency> getAllCurrencies() {
        return currencyRepository.findAll();
    }

    public Optional<Currency> getCurrencyByCode(String code) {
        return currencyRepository.findById(code);
    }
    
    public List<Currency> createAll(List<Currency> currencies){
        return currencyRepository.saveAll(currencies);
    }


    public Currency createcCurrency(Currency currency){
        return currencyRepository.save(currency);
    }

    public Currency updateCurrency(String code, Currency currency) {
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