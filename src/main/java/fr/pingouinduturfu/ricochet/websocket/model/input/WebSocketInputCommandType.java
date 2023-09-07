package fr.pingouinduturfu.ricochet.websocket.model.input;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum WebSocketInputCommandType {

    MOVE("MOVE"),
    CREATE_GAME("CREATE_GAME"),
    JOIN_GAME("JOIN_GAME");

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