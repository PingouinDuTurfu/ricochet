package fr.pingouinduturfu.ricochet.websocket.command_executor;

import fr.pingouinduturfu.ricochet.player.PlayerFacade;
import fr.pingouinduturfu.ricochet.websocket.model.input.WebSocketInputCommandType;
import fr.pingouinduturfu.ricochet.websocket.model.input.ws.WebSocketInputCommandPlayerJoinGame;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

@Service
@Slf4j
@RequiredArgsConstructor
public class WebSocketInputCommandExecutorPlayerJoinGame implements WebSocketInputCommandExecutor<WebSocketInputCommandPlayerJoinGame> {

    private final PlayerFacade playerMoveFacade;
    @Override
    public void execute(WebSocketInputCommandPlayerJoinGame command, WebSocketSession session) {
        playerMoveFacade.joinGame(session, command.getData());
    }

    @Override
    public boolean find(String webSocketInputCommandType) {
        return webSocketInputCommandType.equals(WebSocketInputCommandType.PLAYER_JOIN_GAME.name());
    }
}