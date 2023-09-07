package fr.pingouinduturfu.ricochet.websocket.model.input.ws;

import fr.pingouinduturfu.ricochet.websocket.model.input.WebSocketInputCommand;
import fr.pingouinduturfu.ricochet.websocket.model.input.WebSocketInputCommandType;
import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandCreateGame;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WebSocketInputCommandCreateGame implements WebSocketInputCommand<InputCommandCreateGame> {

    private String actionName = WebSocketInputCommandType.CREATE_GAME.name();

    private InputCommandCreateGame data;
}
