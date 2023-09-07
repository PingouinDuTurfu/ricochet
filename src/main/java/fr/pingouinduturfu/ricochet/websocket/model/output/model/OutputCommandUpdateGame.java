package fr.pingouinduturfu.ricochet.websocket.model.output.model;

import fr.pingouinduturfu.ricochet.game.Player;
import fr.pingouinduturfu.ricochet.game.mapper.GameMapper;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class OutputCommandUpdateGame {
    private String sessionId;
    private String gameId;
    private GameMapper map;
    private List<Player> players;
}
