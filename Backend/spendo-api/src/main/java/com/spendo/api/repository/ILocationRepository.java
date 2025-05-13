package com.spendo.api.repository;

import com.spendo.api.model.LocationsModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ILocationRepository extends JpaRepository<LocationsModel, Long> {


}