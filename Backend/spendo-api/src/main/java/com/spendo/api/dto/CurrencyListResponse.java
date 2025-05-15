package com.spendo.api.dto;

import java.util.List;
import com.spendo.api.model.CurrencyModel;

public class CurrencyListResponse {
    private List<CurrencyModel> currencies;

    // Constructor
    public CurrencyListResponse(List<CurrencyModel> currencies) {
        this.currencies = currencies;
    }

    // Getter y Setter
    public List<CurrencyModel> getCurrencies() {
        return currencies;
    }

    public void setCurrencies(List<CurrencyModel> currencies) {
        this.currencies = currencies;
    }
}