package com.spendo.api.controller;
import com.spendo.api.model.TypeFlowModel;
import com.spendo.api.service.TypeFlowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/TypeFlows")
@CrossOrigin(origins = "*")
public class TypeFlowController {
    @Autowired
    private TypeFlowService typeFlowService;

    @GetMapping(value = "readTypeFlows", headers = "Accept=application/json")
    public List<TypeFlowModel> getAllTypeFlows() {
        return typeFlowService.getAllTypeFlows();
    }
    @GetMapping(value = "readTypeFlowById/{id}", headers = "Accept=application/json")
    public ResponseEntity<TypeFlowModel> getTypeFlowById(@PathVariable Long id) {
        return typeFlowService.getTypeFlowById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping(value = "createTypeFlow", headers = "Accept=application/json")
    public void createTypeFlow(@RequestBody TypeFlowModel typeFlow) {
        typeFlowService.createTypeFlow(typeFlow);
    }

    @PutMapping(value = "updateTypeFlow/{Id}", headers = "Accept=application/json")
    public ResponseEntity<TypeFlowModel> updateTypeFlow(@PathVariable Long Id, @RequestBody TypeFlowModel typeFlow) {
        TypeFlowModel updatedTypeFlow = typeFlowService.updateTypeFlow(Id, typeFlow);
        if (updatedTypeFlow != null) {
            return ResponseEntity.ok(updatedTypeFlow);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping(value = "deleteTypeFlow/{Id}",headers = "Accept=application/json")
    public ResponseEntity<Void> deleteTypeFlow(@PathVariable Long Id) {
        typeFlowService.deleteTypeFlow(Id);
        return ResponseEntity.noContent().build();
    }
}
