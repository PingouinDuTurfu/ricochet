package fr.pingouinduturfu.ricochet.websocket.model.input;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import fr.pingouinduturfu.ricochet.websocket.model.input.ws.WebSocketInputCommandPlayerCreateGame;
import fr.pingouinduturfu.ricochet.websocket.model.input.ws.WebSocketInputCommandPlayerJoinGame;
import fr.pingouinduturfu.ricochet.websocket.model.input.ws.WebSocketInputCommandPlayerLogin;
import fr.pingouinduturfu.ricochet.websocket.model.input.ws.WebSocketInputCommandPlayerMove;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        property = "actionName",
        visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = WebSocketInputCommandPlayerLogin.class, name = "PLAYER_LOGIN"),
        @JsonSubTypes.Type(value = WebSocketInputCommandPlayerMove.class, name = "PLAYER_MOVE"),
        @JsonSubTypes.Type(value = WebSocketInputCommandPlayerCreateGame.class, name = "PLAYER_CREATE_GAME"),
        @JsonSubTypes.Type(value = WebSocketInputCommandPlayerJoinGame.class, name = "PLAYER_JOIN_GAME")
})
public interface WebSocketInputCommand<T> {

    String getActionName();
    T getData();
}