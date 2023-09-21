package fr.pingouinduturfu.ricochet.game.manager;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fr.pingouinduturfu.ricochet.exception.GameManagerException;
import fr.pingouinduturfu.ricochet.exception.MapManagerException;
import fr.pingouinduturfu.ricochet.game.*;
import fr.pingouinduturfu.ricochet.game.mapper.GameMapper;
import fr.pingouinduturfu.ricochet.game.mapper.RobotMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashMap;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class GameManager {

    private final MapManager mapManager;
    private final HashMap<String, Game> games = new HashMap<>();

    public Game createGame(WebSocketSession session, String mapName, String username) throws MapManagerException, JsonProcessingException {
        String gameId = RandomFourDigit();
        GameMapper dataMapper = new ObjectMapper().readValue(mapManager.loadMap(mapName), GameMapper.class);
        Map map = new Map(dataMapper);
        HashMap<String, Robot> robots = new HashMap<>();
        for (RobotMapper robot : dataMapper.getR())
            robots.put(robot.getC(), new Robot(robot.getX(), robot.getY(), robot.getC()));
        Game game = new Game(session, gameId, username, map, robots);
        games.put(gameId, game);
        return game;
    }

    public Game joinGame(WebSocketSession session, String gameId, String username) throws GameManagerException {
        if (!games.containsKey(gameId))
            throw new GameManagerException("EditGrid not found");

        Game game = games.get(gameId);
        game.addPlayer(session, username);
        return game;
    }

    public boolean isInGame(WebSocketSession session) {
        return games.values().stream()
                .anyMatch(game -> game.getPlayers().containsKey(session));
    }

    public void leaveGame(WebSocketSession session) throws GameManagerException {
        Game game = this.getGame(session);
        String gameId = games.entrySet().stream()
                .filter(entry -> entry.getValue().equals(game))
                .findFirst()
                .orElseThrow(() -> new GameManagerException("EditGrid not found"))
                .getKey();
        game.removePlayer(session);
        if (game.getPlayers().isEmpty())
            games.remove(gameId);
    }

    public Game getGame(String gameId) {
        return games.get(gameId);
    }

    public Game getGame(WebSocketSession session) throws GameManagerException {
        return games.values().stream()
                .filter(game -> game.getPlayers().containsKey(session))
                .findFirst()
                .orElseThrow(() -> new GameManagerException("EditGrid not found"));
    }

    public List<RobotMapper> move(WebSocketSession session, int x, int y, String color) throws GameManagerException {
        Game game = this.getGame(session);
        if (!isMoveValid(game, x, y, color))
            throw new GameManagerException("Invalid move");
        game.moveRobot(x, y, color);
        return game.serializeRobots();
    }

    private String RandomFourDigit () {
            Random random = new Random();
            int max = 9999;
            String randomNumber;
            do
                randomNumber = String.format("%04d", random.nextInt(max + 1));
            while (games.containsKey(randomNumber));
            return randomNumber;
    }

    private boolean isMoveValid(Game game, int x, int y, String color) {
        Map map = game.getMap();
        Cell[][] grid = map.getGrid();
        Robot oldRobot = game.getRobots().get(color);

        int xDiff = x - oldRobot.getX();
        int yDiff = y - oldRobot.getY();

        if (x >= map.getWidth()
                || y >= map.getHeight()
                || grid[x][y].getValue().equals(CellType.EMPTY.name())
                || xDiff == 0 && yDiff == 0
                || xDiff != 0 && yDiff != 0
        )
            return false;

        if(xDiff > 0) {
            if(!grid[y][x].isRightWall() && (x+1 > map.getWidth() || !grid[y][x+1].hasRobot()))
                return false;
            for(int i = oldRobot.getX(); i < x; i++) {
                if(grid[y][i].isRightWall())
                    return false;
            }
        } else if(xDiff < 0) {
            if(!grid[y][x].isLeftWall() && (x-1 < 0 || !grid[y][x-1].hasRobot()))
                return false;
            for(int i = x; i < oldRobot.getX(); i++) {
                if(grid[y][i].isRightWall())
                    return false;
            }
        }

        if(yDiff > 0) {
            if(!grid[y][x].isBottomWall() && (y+1 > map.getHeight() || !grid[y+1][x].hasRobot()))
                return false;
            for(int i = oldRobot.getY(); i < y; i++) {
                if(grid[i][x].isBottomWall())
                    return false;
            }
        } if(yDiff < 0) {
            if(!grid[y][x].isTopWall() && (y-1 < 0 || !grid[y-1][x].hasRobot()))
                return false;
            for(int i = y; i < oldRobot.getY(); i++) {
                if(grid[i][x].isBottomWall())
                    return false;
            }
        }
        return true;
    }
}
