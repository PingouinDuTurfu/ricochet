package fr.pingouinduturfu.ricochet.websocket.model.input.ws;

import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandPlayerLogin;
import fr.pingouinduturfu.ricochet.websocket.model.input.WebSocketInputCommand;
import fr.pingouinduturfu.ricochet.websocket.model.input.WebSocketInputCommandType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WebSocketInputCommandPlayerLogin implements WebSocketInputCommand<InputCommandPlayerLogin> {

    private String actionName = WebSocketInputCommandType.PLAYER_LOGIN.name();

    private InputCommandPlayerLogin data;
}