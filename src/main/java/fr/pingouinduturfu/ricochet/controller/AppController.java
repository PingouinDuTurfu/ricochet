package fr.pingouinduturfu.ricochet.controller;

import fr.pingouinduturfu.ricochet.persistence.Map;
import fr.pingouinduturfu.ricochet.repository.MapRepository;
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
//        Grid grid = new Grid(10, 10);
//        model.addAttribute("grid", grid.getGrid());
        return "home";
    }

    @PostMapping(value = "/saveMap", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> saveMap(@Param("name") String name, @Param("mapData") String mapData) {
        System.out.println("name: " + name);
        System.out.println("data: " + mapData);
        mapRepository.save(new Map(name, mapData));
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}