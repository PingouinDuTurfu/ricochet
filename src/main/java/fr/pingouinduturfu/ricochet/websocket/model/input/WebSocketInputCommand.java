package fr.pingouinduturfu.ricochet.websocket.model.input;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import fr.pingouinduturfu.ricochet.websocket.model.input.ws.WebSocketInputCommandCreateGame;
import fr.pingouinduturfu.ricochet.websocket.model.input.ws.WebSocketInputCommandJoinGame;
import fr.pingouinduturfu.ricochet.websocket.model.input.ws.WebSocketInputCommandMove;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        property = "actionName",
        visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = WebSocketInputCommandMove.class, name = "MOVE"),
        @JsonSubTypes.Type(value = WebSocketInputCommandCreateGame.class, name = "CREATE_GAME"),
        @JsonSubTypes.Type(value = WebSocketInputCommandJoinGame.class, name = "JOIN_GAME")
})
public interface WebSocketInputCommand<T> {

    String getActionName();
    T getData();
}