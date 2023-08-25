package fr.pingouinduturfu.ricochet.player.player_impl;

import fr.pingouinduturfu.ricochet.game.GameManager;
import fr.pingouinduturfu.ricochet.player.player_api.PlayerJoinGame;
import fr.pingouinduturfu.ricochet.websocket.WebSocketSessionManager;
import fr.pingouinduturfu.ricochet.websocket.WebSocketSessionWrapper;
import fr.pingouinduturfu.ricochet.websocket.WebsocketMessageSender;
import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandPlayerCreateGame;
import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandPlayerJoinGame;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

@Service
@Slf4j
@RequiredArgsConstructor
class PlayerJoinGameImpl implements PlayerJoinGame {

    private final WebSocketSessionManager webSocketSessionManager;

    private final WebsocketMessageSender websocketMessageSender;

    private final GameManager gameManager;

    @Override
    public void joinGame(WebSocketSession webSocketSession, InputCommandPlayerJoinGame playerJoinGame) {
        WebSocketSessionWrapper session = webSocketSessionManager.getSession(webSocketSession);
        gameManager.joinGame(session, playerJoinGame.getGameId(), playerJoinGame.getUsername());
    }
}