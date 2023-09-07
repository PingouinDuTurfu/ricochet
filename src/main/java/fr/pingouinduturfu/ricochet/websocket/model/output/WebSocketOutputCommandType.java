package fr.pingouinduturfu.ricochet.websocket.model.output;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum WebSocketOutputCommandType {

    MOVE("MOVE"),
    UPDATE_GAME("UPDATE_GAME"),
    ERROR("ERROR");
    private final String type;

    public static WebSocketOutputCommandType fromType(String type) {
        for (WebSocketOutputCommandType actionType : WebSocketOutputCommandType.values()) {
            if (actionType.type.equals(type)) {
                return actionType;
            }
        }
        throw new IllegalArgumentException("Type code not recognized: " + type);
    }
}