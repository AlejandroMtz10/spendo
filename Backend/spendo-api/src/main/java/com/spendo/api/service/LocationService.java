package com.spendo.api.service;
import com.spendo.api.model.LocationsModel;
import com.spendo.api.repository.ILocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationService {
    @Autowired
    private ILocationRepository locationRepository;

    public List<LocationsModel> getAllLocations() {
        return locationRepository.findAll();
    }
    public Optional<LocationsModel> getLocationById(Long id) {
        return locationRepository.findById(id);
    }
    public LocationsModel createLocation(LocationsModel location) {
        return locationRepository.save(location);
    }
    public LocationsModel updateLocation(Long id, LocationsModel location) {
        if (locationRepository.existsById(id)) {
            location.setId_local(id);
            return locationRepository.save(location);
        } else {
            return null; // or throw an exception
        }
    }
    public void deleteLocation(Long id) {
        locationRepository.deleteById(id);
    }
    public List<LocationsModel> createAll(List<LocationsModel> locations) {
        return locationRepository.saveAll(locations);
    }
}