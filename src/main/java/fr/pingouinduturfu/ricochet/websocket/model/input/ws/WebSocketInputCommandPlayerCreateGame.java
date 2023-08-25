package fr.pingouinduturfu.ricochet.websocket.model.input.ws;

import fr.pingouinduturfu.ricochet.websocket.model.input.WebSocketInputCommand;
import fr.pingouinduturfu.ricochet.websocket.model.input.WebSocketInputCommandType;
import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandPlayerCreateGame;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WebSocketInputCommandPlayerCreateGame implements WebSocketInputCommand<InputCommandPlayerCreateGame> {

    private String actionName = WebSocketInputCommandType.PLAYER_CREATE_GAME.name();

    private InputCommandPlayerCreateGame data;
}
