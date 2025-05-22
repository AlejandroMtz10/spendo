package com.spendo.api.repository;

import com.spendo.api.model.UsersModel;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface IUsersRepository extends JpaRepository<UsersModel, Long> {

}