package fr.pingouinduturfu.ricochet.websocket.model.output.ws;

import fr.pingouinduturfu.ricochet.websocket.model.output.WebSocketOutputCommand;
import fr.pingouinduturfu.ricochet.websocket.model.output.model.OutputCommandUpdateGame;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WebSocketOutputCommandUpdateGame implements WebSocketOutputCommand<OutputCommandUpdateGame> {
    private String actionName;
    private OutputCommandUpdateGame data;
}
