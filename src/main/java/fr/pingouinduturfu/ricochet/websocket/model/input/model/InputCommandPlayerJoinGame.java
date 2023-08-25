package fr.pingouinduturfu.ricochet.websocket.model.input.model;

import lombok.Data;

@Data
public class InputCommandPlayerJoinGame {

    private int gameId;
    private String username;
}
