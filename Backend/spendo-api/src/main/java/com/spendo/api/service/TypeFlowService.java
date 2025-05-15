package com.spendo.api.service;
import com.spendo.api.model.TypeFlowModel;
import com.spendo.api.repository.ITypeFlowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TypeFlowService {
    @Autowired
    private ITypeFlowRepository typeFlowepository;

    public List<TypeFlowModel> getAllTypeFlows() {
        return typeFlowepository.findAll();
    }
    public Optional<TypeFlowModel> getTypeFlowById(Long id) {
        return typeFlowepository.findById(id);
    }
    public TypeFlowModel createTypeFlow(TypeFlowModel typeFlow) {
        return typeFlowepository.save(typeFlow);
    }
    public TypeFlowModel updateTypeFlow(Long id, TypeFlowModel typeFlow) {
        if (typeFlowepository.existsById(id)) {
            typeFlow.setId_type(id);
            return typeFlowepository.save(typeFlow);
        } else {
            return null; // or throw an exception
        }
    }
    public void deleteTypeFlow(Long id) {
        typeFlowepository.deleteById(id);
    }
}