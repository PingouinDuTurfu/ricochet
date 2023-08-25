package fr.pingouinduturfu.ricochet.controller;

import fr.pingouinduturfu.ricochet.persistence.MapPersistence;
import fr.pingouinduturfu.ricochet.repository.MapRepository;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;


@Controller
public class AppController {

    @Autowired
    private MapRepository mapRepository;

    @GetMapping("")
    public String showRoot() {
        return "redirect:home";
    }

    @GetMapping("/home")
    public String showHome() {
        return "home";
    }

    @PostMapping(value = "/getMapsNames", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<JSONObject> getMapsNames() {
        JSONObject json = new JSONObject();
        json.put("mapsNames", mapRepository.findAllNames());
        System.out.println("mapsNames: " + json.get("mapsNames"));
        return ResponseEntity.status(HttpStatus.OK).body(json);
    }

    @PostMapping(value = "/saveMap", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> saveMap(@Param("name") String name, @Param("mapData") String mapData) {
        System.out.println("name: " + name);
        System.out.println("data: " + mapData);
        mapRepository.save(new MapPersistence(name, mapData));
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping(value = "/loadMap", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<JSONObject> loadMap(@Param("name") String name) {
        MapPersistence map = mapRepository.findFirstByName(name);
        JSONObject json = new JSONObject();
        json.put("mapData", map.getData());
        return ResponseEntity.status(HttpStatus.OK).body(json);
    }

}