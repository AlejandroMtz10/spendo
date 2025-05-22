package com.spendo.api.controller;

import com.spendo.api.model.UsersModel;
import com.spendo.api.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Users")
@CrossOrigin(origins = "*")
public class UsersController {
    @Autowired
    private UsersService usersService;

    @GetMapping(value = "readUsers", headers = "Accept=application/json")
    public List<UsersModel> getAllUsers() {
        return usersService.getAllUsers();
    }

    @GetMapping(value = "readUserById/{id}", headers = "Accept=application/json")
    public ResponseEntity<UsersModel> getUserById(@PathVariable Long id) {
        return usersService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(value = "createUser", headers = "Accept=application/json")
    public void createUser(@RequestBody UsersModel user) {
        usersService.createUser(user);
    }

    @PutMapping(value = "updateUser/{Id}", headers = "Accept=application/json")
    public ResponseEntity<UsersModel> updateUser(@PathVariable Long Id, @RequestBody UsersModel user) {
        UsersModel updatedUser = usersService.updateUser(Id, user);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "deleteUser/{Id}", headers = "Accept=application/json")
    public ResponseEntity<Void> deleteUser(@PathVariable Long Id) {
        usersService.deleteUser(Id);
        return ResponseEntity.noContent().build();
    }

}
