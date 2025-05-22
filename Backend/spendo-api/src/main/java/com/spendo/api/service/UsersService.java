package com.spendo.api.service;

import org.springframework.stereotype.Service;
import com.spendo.api.repository.IUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.spendo.api.model.UsersModel;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {
    @Autowired
    private IUsersRepository usersRepository;

    public List<UsersModel> getAllUsers() {
        return usersRepository.findAll();
    }

    public Optional<UsersModel> getUserById(Long id) {
        return usersRepository.findById(id);
    }

    public UsersModel createUser(UsersModel user) {
        return usersRepository.save(user);
    }

    public UsersModel updateUser(Long id, UsersModel user) {
        if (usersRepository.existsById(id)) {
            user.setId_user(id);
            return usersRepository.save(user);
        } else {
            return null; // or throw an exception
        }
    }

    public void deleteUser(Long id) {
        usersRepository.deleteById(id);
    }
}
