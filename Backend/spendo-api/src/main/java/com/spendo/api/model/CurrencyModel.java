package com.spendo.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "currencies")
public class CurrencyModel {

    @Id
    @Column(name = "code_currency")
    private String code_currency;

    @Column(name = "currency")
    private String currency;

    @Column(name = "symbol")
    private String symbol;
    
    @Column(name = "price_mexican_pesos")
    private float price_mexican_pesos;
}