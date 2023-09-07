package fr.pingouinduturfu.ricochet.websocket.model.input.model;

import lombok.Data;

@Data
public class InputCommandJoinGame {

    private String gameId;
    private String username;
}
