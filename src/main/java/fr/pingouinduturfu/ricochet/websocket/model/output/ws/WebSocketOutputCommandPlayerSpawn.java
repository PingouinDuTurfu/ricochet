package fr.pingouinduturfu.ricochet.websocket.model.output.ws;

import fr.pingouinduturfu.ricochet.websocket.model.output.WebSocketOutputCommand;
import fr.pingouinduturfu.ricochet.websocket.model.output.model.OutputCommandPlayerSpawn;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WebSocketOutputCommandPlayerSpawn implements WebSocketOutputCommand<OutputCommandPlayerSpawn> {
    private String actionName;
    private OutputCommandPlayerSpawn data;
}