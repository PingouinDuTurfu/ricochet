package fr.pingouinduturfu.ricochet.websocket.model.input.ws;

import fr.pingouinduturfu.ricochet.websocket.model.input.WebSocketInputCommand;
import fr.pingouinduturfu.ricochet.websocket.model.input.WebSocketInputCommandType;
import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandPlayerJoinGame;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WebSocketInputCommandPlayerJoinGame implements WebSocketInputCommand<InputCommandPlayerJoinGame> {

    private String actionName = WebSocketInputCommandType.PLAYER_JOIN_GAME.name();

    private InputCommandPlayerJoinGame data;
}
