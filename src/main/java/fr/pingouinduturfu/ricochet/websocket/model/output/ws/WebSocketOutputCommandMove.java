package fr.pingouinduturfu.ricochet.websocket.model.output.ws;

import fr.pingouinduturfu.ricochet.websocket.model.output.WebSocketOutputCommand;
import fr.pingouinduturfu.ricochet.websocket.model.output.model.OutputCommandMove;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WebSocketOutputCommandMove implements WebSocketOutputCommand<OutputCommandMove> {
    private String actionName;
    private OutputCommandMove data;
}