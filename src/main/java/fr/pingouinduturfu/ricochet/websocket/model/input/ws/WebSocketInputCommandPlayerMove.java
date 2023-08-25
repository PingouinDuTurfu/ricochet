package fr.pingouinduturfu.ricochet.websocket.model.input.ws;

import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandPlayerMove;
import fr.pingouinduturfu.ricochet.websocket.model.input.WebSocketInputCommand;
import fr.pingouinduturfu.ricochet.websocket.model.input.WebSocketInputCommandType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WebSocketInputCommandPlayerMove implements WebSocketInputCommand<InputCommandPlayerMove> {

    private String actionName = WebSocketInputCommandType.PLAYER_MOVE.name();

    private InputCommandPlayerMove data;
}