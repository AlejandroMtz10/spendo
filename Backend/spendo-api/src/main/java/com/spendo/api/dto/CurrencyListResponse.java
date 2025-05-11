package com.spendo.api.dto;

import java.util.List;
import com.spendo.api.model.Currency;

public class CurrencyListResponse {
    private List<Currency> currencies;

    // Constructor
    public CurrencyListResponse(List<Currency> currencies) {
        this.currencies = currencies;
    }

    // Getter y Setter
    public List<Currency> getCurrencies() {
        return currencies;
    }

    public void setCurrencies(List<Currency> currencies) {
        this.currencies = currencies;
    }
}