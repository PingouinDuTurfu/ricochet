package fr.pingouinduturfu.ricochet.websocket.model.output.model;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class OutputCommandPlayerMove {
    private String sessionId;
    private String direction;
    private double distance;
}