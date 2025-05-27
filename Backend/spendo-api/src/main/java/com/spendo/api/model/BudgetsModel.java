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
@Table(name = "Budgets")
public class BudgetsModel {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name = "id_budget")
    private Long id_budget;

    @Column(name = "id_user")
    private Long id_user;

    @Column(name = "code_currency")
    private String code_currency;

    @Column(name = "mount_goal")
    private Double mount_goal;

    @Column(name = "date_goal")
    private String date_goal;

    @Column(name = "status")
    private boolean status;
}