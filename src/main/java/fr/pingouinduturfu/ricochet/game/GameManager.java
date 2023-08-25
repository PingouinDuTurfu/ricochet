package fr.pingouinduturfu.ricochet.game;

import fr.pingouinduturfu.ricochet.exception.GameManagerException;
import fr.pingouinduturfu.ricochet.websocket.WebSocketSessionWrapper;
import fr.pingouinduturfu.ricochet.websocket.WebsocketMessageSender;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class GameManager {

    private final WebsocketMessageSender websocketMessageSender;

    @Getter
    private final HashMap<Integer, Game> games = new HashMap<>();

    public void createGame(WebSocketSessionWrapper session, String username) {
        System.out.printf("create game for player %s with session %s\n", username, session);
        int gameId = RandomFourDigitInteger();
        games.put(gameId, new Game(session, username));
    }

    public Game joinGame(WebSocketSessionWrapper session, Integer gameId, String username) {
        if (!games.containsKey(gameId))
            websocketMessageSender.send(session.getWebSocketSession(), "This game does not exist");

        System.out.printf("join game %d for player %s with session %s\n", gameId, username, session);

        Game game = games.get(gameId);
        try {
            game.addPlayer(session, username);
        } catch (GameManagerException e) {
            websocketMessageSender.send(session.getWebSocketSession(), e.getMessage());
            return null;
        }
        return game;
    }

    public void leaveGame(Integer gameId, WebSocketSessionWrapper session) {
        if (!games.containsKey(gameId))
            websocketMessageSender.send(session.getWebSocketSession(), "You are not in a game");

        Game game = games.get(gameId);

        System.out.printf("leave game %d for player %s with session %s\n", gameId, game.getPlayers().get(session), session);

        try {
            game.removePlayer(session);
        } catch (GameManagerException e) {
            websocketMessageSender.send(session.getWebSocketSession(), e.getMessage());
            return;
        }

        if (game.getPlayers().isEmpty())
            games.remove(gameId);
    }

    public Game getGame(Integer gameId) {
        return games.get(gameId);
    }

    private int RandomFourDigitInteger () {
            Random random = new Random();
            int max = 9999;
            int randomNumber;
            do
                randomNumber = Integer.parseInt(String.format("%04d", random.nextInt(max + 1)));
            while (games.containsKey(randomNumber));
            System.out.printf("random number %d\n", randomNumber);
            return randomNumber;
    }
}
