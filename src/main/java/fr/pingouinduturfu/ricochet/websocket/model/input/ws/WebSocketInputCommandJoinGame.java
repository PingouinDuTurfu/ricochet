package fr.pingouinduturfu.ricochet.websocket.model.input.ws;

import fr.pingouinduturfu.ricochet.websocket.model.input.WebSocketInputCommand;
import fr.pingouinduturfu.ricochet.websocket.model.input.WebSocketInputCommandType;
import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandJoinGame;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WebSocketInputCommandJoinGame implements WebSocketInputCommand<InputCommandJoinGame> {

    private String actionName = WebSocketInputCommandType.JOIN_GAME.name();

    private InputCommandJoinGame data;
}
