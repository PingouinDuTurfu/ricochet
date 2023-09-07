package fr.pingouinduturfu.ricochet.websocket.model.input.model;

import lombok.Data;

@Data
public class InputCommandCreateGame {

    private String mapName;
    private String username;
}
