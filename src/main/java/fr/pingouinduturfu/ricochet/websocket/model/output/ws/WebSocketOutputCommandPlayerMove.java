package fr.pingouinduturfu.ricochet.websocket.model.output.ws;

import fr.pingouinduturfu.ricochet.websocket.model.output.WebSocketOutputCommand;
import fr.pingouinduturfu.ricochet.websocket.model.output.model.OutputCommandPlayerMove;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WebSocketOutputCommandPlayerMove implements WebSocketOutputCommand<OutputCommandPlayerMove> {
    private String actionName;
    private OutputCommandPlayerMove data;

}