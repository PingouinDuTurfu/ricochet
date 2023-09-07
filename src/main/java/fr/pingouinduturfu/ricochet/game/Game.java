package fr.pingouinduturfu.ricochet.game;

import fr.pingouinduturfu.ricochet.exception.GameManagerException;
import fr.pingouinduturfu.ricochet.game.mapper.CellMapper;
import fr.pingouinduturfu.ricochet.game.mapper.GameMapper;
import fr.pingouinduturfu.ricochet.game.mapper.RobotMapper;
import fr.pingouinduturfu.ricochet.websocket.WebSocketSessionWrapper;
import lombok.Getter;
import lombok.ToString;
import org.springframework.web.socket.WebSocketSession;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Getter
@ToString
public class Game {
    private final Map map;
    private final HashMap<WebSocketSession, Player> players = new HashMap<>();
    private final HashMap<String, Robot> robots = new HashMap<>();
    private final String gameId;

    public Game(WebSocketSession session, String gameId, String username, Map map, HashMap<String, Robot> robots) {
        this.gameId = gameId;
        for (Robot robot : robots.values())
            map.getGrid()[robot.getY()][robot.getX()].addRobot();
        this.map = map;
        this.robots.putAll(robots);
        players.put(session, new Player(username, 0));
    }

    public void addPlayer(WebSocketSession session, String username) throws GameManagerException {
        if(players.containsKey(session))
            throw new GameManagerException("You are already in this game");
        players.put(session, new Player(username, 0));
    }

    public void removePlayer(WebSocketSession session) throws GameManagerException {
        if(!players.containsKey(session))
            throw new GameManagerException("You are not in this game");
        players.remove(session);
    }

    public List<Player> getPlayersList() {
        return new ArrayList<>(players.values());
    }
    public void moveRobot(int x, int y, String color) {
        Robot robot = robots.get(color);
        Cell[][] grid = map.getGrid();
        grid[robot.getY()][robot.getX()].removeRobot();
        robot.setX(x);
        robot.setY(y);
        grid[y][x].addRobot();
    }

    public GameMapper serializeMap() {
        List<List<CellMapper>> gridMapper = new ArrayList<>();
        for (int y = 0; y < map.getHeight(); y++) {
            List<CellMapper> row = new ArrayList<>();
            for (int x = 0; x < map.getWidth(); x++) {
                Cell cell = map.getGrid()[y][x];
                row.add(CellMapper.builder()
                        .t(cell.isTopWall())
                        .r(cell.isRightWall())
                        .b(cell.isBottomWall())
                        .l(cell.isLeftWall())
                        .v(cell.getValue())
                        .x(x)
                        .y(y)
                        .build());
            }
            gridMapper.add(row);
        }

        List<RobotMapper> robotMapper = new ArrayList<>();
        robots.forEach((color, robot) -> robotMapper.add(RobotMapper.builder()
                .c(color)
                .x(robot.getX())
                .y(robot.getY())
                .build()));

        return GameMapper.builder()
                .w(map.getWidth())
                .h(map.getHeight())
                .g(gridMapper)
                .r(robotMapper)
                .build();
    }

    public List<RobotMapper> serializeRobots() {
        List<RobotMapper> robotMapper = new ArrayList<>();
        robots.forEach((color, robot) -> robotMapper.add(RobotMapper.builder()
                .c(color)
                .x(robot.getX())
                .y(robot.getY())
                .build()));
        return robotMapper;
    }
}
