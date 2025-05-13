package com.spendo.api.controller;
import com.spendo.api.model.LocationsModel;
import com.spendo.api.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
@CrossOrigin(origins = "*")
public class LocationController {
    @Autowired
    private LocationService locationService;

    @GetMapping(value = "readLocations", headers = "Accept=application/json")
    public List<LocationsModel> getAllLocations() {
        return locationService.getAllLocations();
    }

    @GetMapping(value = "readLocationById/{id}", headers = "Accept=application/json")
    public ResponseEntity<LocationsModel> getLocationById(@PathVariable Long id) {
        return locationService.getLocationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(value = "createLocation", headers = "Accept=application/json")
    public void createCategory(@RequestBody LocationsModel location) {
        locationService.createLocation(location);
    }

        @PostMapping(value = "createAllLocations", headers = "Accept=application/json")
    public ResponseEntity<List<LocationsModel>> createAllLocations(@RequestBody List<LocationsModel> Location) {
        List<LocationsModel> created = locationService.createAll(Location);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }


    @PutMapping(value = "updateLocation/{Id}", headers = "Accept=application/json")
    public ResponseEntity<LocationsModel> updateLocation(@PathVariable Long Id, @RequestBody LocationsModel Location) {
        LocationsModel updatedLocation = locationService.updateLocation(Id, Location);
        if (updatedLocation != null) {
            return ResponseEntity.ok(updatedLocation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "deleteLocation/{Id}",headers = "Accept=application/json")
    public ResponseEntity<Void> deleteLocation(@PathVariable Long Id) {
        locationService.deleteLocation(Id);
        return ResponseEntity.noContent().build();
    }
}
