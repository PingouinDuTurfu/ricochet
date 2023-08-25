package fr.pingouinduturfu.ricochet.player.player_impl;

import fr.pingouinduturfu.ricochet.game.GameManager;
import fr.pingouinduturfu.ricochet.player.player_api.PlayerCreateGame;
import fr.pingouinduturfu.ricochet.websocket.WebSocketSessionManager;
import fr.pingouinduturfu.ricochet.websocket.WebSocketSessionWrapper;
import fr.pingouinduturfu.ricochet.websocket.WebsocketMessageSender;
import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandPlayerCreateGame;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

@Service
@Slf4j
@RequiredArgsConstructor
public class PlayerCreateGameImpl implements PlayerCreateGame {

    private final WebSocketSessionManager webSocketSessionManager;

    private final WebsocketMessageSender websocketMessageSender;

    private final GameManager gameManager;

    public void createGame(WebSocketSession webSocketSession, InputCommandPlayerCreateGame playerCreateGame) {
        WebSocketSessionWrapper session = webSocketSessionManager.getSession(webSocketSession);
        gameManager.createGame(session, playerCreateGame.getUsername());
    }
}
