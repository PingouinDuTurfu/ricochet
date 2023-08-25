package fr.pingouinduturfu.ricochet.websocket.model.output.model;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class OutputCommandPlayerSpawn {
    private String sessionId;
    private double positionX;
    private double positionY;
}