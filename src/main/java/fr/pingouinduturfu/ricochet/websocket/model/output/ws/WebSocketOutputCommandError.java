package fr.pingouinduturfu.ricochet.websocket.model.output.ws;

import fr.pingouinduturfu.ricochet.websocket.model.output.WebSocketOutputCommand;
import fr.pingouinduturfu.ricochet.websocket.model.output.model.OutputCommandError;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WebSocketOutputCommandError implements WebSocketOutputCommand<OutputCommandError> {
    private String actionName;
    private OutputCommandError data;
}