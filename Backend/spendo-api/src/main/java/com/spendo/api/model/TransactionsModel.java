package com.spendo.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Transactions")
public class TransactionsModel {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)

    @Column(name = "id_transaction")
    private Long id_transaction;

    @Column(name = "id_type")
    private Long id_type;

    @Column(name = "id_user")
    private Long id_user;

    @Column(name = "id_local")
    private Long id_local;

    @Column(name = "code_currency")
    private String code_currency;

    @Column(name = "id_category")
    private Long id_category;

    @Column(name = "mount")
    private Double mount;

    @Column(name = "date_transaction")
    private String date_transaction;
}
