package fr.pingouinduturfu.ricochet.websocket.model.output.model;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class OutputCommandError {
    private String sessionId;
    private String message;
}
