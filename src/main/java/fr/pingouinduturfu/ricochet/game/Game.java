package fr.pingouinduturfu.ricochet.game;

import fr.pingouinduturfu.ricochet.exception.GameManagerException;
import fr.pingouinduturfu.ricochet.websocket.WebSocketSessionWrapper;
import lombok.Getter;
import lombok.ToString;

import java.util.HashMap;

@Getter
@ToString
public class Game {
    private int width;
    private int height;
    private Cell[][] grid;

    private final HashMap<WebSocketSessionWrapper, String> players = new HashMap<>();

    public Game(WebSocketSessionWrapper session, String username) {
        players.put(session, username);
    }

    public void addPlayer(WebSocketSessionWrapper session, String username) throws GameManagerException {
        if(players.containsKey(session))
            throw new GameManagerException("You are already in this game");
        players.put(session, username);
    }

    public void removePlayer(WebSocketSessionWrapper session) throws GameManagerException {
        if(!players.containsKey(session))
            throw new GameManagerException("You are not in this game");
        players.remove(session);
    }
}
