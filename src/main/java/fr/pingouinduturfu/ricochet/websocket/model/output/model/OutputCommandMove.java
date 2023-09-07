package fr.pingouinduturfu.ricochet.websocket.model.output.model;

import fr.pingouinduturfu.ricochet.game.mapper.RobotMapper;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class OutputCommandMove {
    private String sessionId;
    private List<RobotMapper> robots;
    private double distance;
}