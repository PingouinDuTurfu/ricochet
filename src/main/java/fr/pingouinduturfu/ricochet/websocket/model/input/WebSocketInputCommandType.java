package fr.pingouinduturfu.ricochet.websocket.model.input;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum WebSocketInputCommandType {

    PLAYER_LOGIN("player_login"),
    PLAYER_MOVE("player_move"),
    PLAYER_CREATE_GAME("player_create_game"),
    PLAYER_JOIN_GAME("player_join_game");

    private final String type;

    public static WebSocketInputCommandType fromType(String type) {
        for (WebSocketInputCommandType actionType : WebSocketInputCommandType.values()) {
            if (actionType.type.equals(type)) {
                return actionType;
            }
        }
        throw new IllegalArgumentException("Type code not recognized: " + type);
    }
}