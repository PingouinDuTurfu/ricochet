package fr.pingouinduturfu.ricochet.controller;

import fr.pingouinduturfu.ricochet.exception.MapManagerException;
import fr.pingouinduturfu.ricochet.game.manager.MapManager;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
import java.util.Map;


@Controller
@RequiredArgsConstructor
public class AppController {

    private final MapManager mapManager;

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
        Map<String, List<String>> jsonMap = Map.of("mapsNames", mapManager.getMapsNames());
        return ResponseEntity.status(HttpStatus.OK).body(new JSONObject(jsonMap));
    }

    @PostMapping(value = "/saveMap", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> saveMap(@Param("name") String name, @Param("mapData") String mapData) {
        try {
            mapManager.saveMap(name, mapData);
        } catch (MapManagerException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping(value = "/loadMap", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<JSONObject> loadMap(@Param("name") String name) {
        try {
            Map<String, String> jsonMap = Map.of("mapData", mapManager.loadMap(name));
            return ResponseEntity.status(HttpStatus.OK).body(new JSONObject(jsonMap));
        } catch (MapManagerException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

}