package com.spendo.api.repository;

import com.spendo.api.model.TypeFlowModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITypeFlowRepository extends JpaRepository<TypeFlowModel, Long> {

}
