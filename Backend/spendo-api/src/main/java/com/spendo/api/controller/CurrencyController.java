package com.spendo.api.controller;

import com.spendo.api.model.Currency;
import com.spendo.api.service.CurrencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/currencies")
@CrossOrigin(origins = "*")
public class CurrencyController {
    @Autowired
    private CurrencyService currencyService;

    @GetMapping(value = "readCurrencies", headers = "Accept=application/json")
    public List<Currency> getAllCurrencies() {
        return currencyService.getAllCurrencies();
    }

    @GetMapping(value = "readCurrencyById/{code}", headers = "Accept=application/json")
    public ResponseEntity<Currency> getCurrencyByCode(@PathVariable String code) {
        return currencyService.getCurrencyByCode(code)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(value = "createCurrency", headers = "Accept=application/json")
    public void createCategory(@RequestBody Currency Currency) {
        //TODO: process POST request
        currencyService.createcCurrency(Currency);
    }

    @PostMapping(value = "createAllCurrencies", headers = "Accept=application/json")
    public ResponseEntity<List<Currency>> createAllCurrencies(@RequestBody List<Currency> currencies) {
        List<Currency> created = currencyService.createAll(currencies);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }


    @PutMapping(value = "updateCurrency/{code}", headers = "Accept=application/json")
    public ResponseEntity<Currency> updateCurrency(@PathVariable String code, @RequestBody Currency currency) {
        Currency updatedCurrency = currencyService.updateCurrency(code, currency);
        if (updatedCurrency != null) {
            return ResponseEntity.ok(updatedCurrency);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "deleteCurrency/{code}",headers = "Accept=application/json")
    public ResponseEntity<Void> deleteCurrency(@PathVariable String code) {
        currencyService.deleteCurrency(code);
        return ResponseEntity.noContent().build();
    }
}