package fr.pingouinduturfu.ricochet.websocket.command_executor;

import fr.pingouinduturfu.ricochet.player.PlayerFacade;
import fr.pingouinduturfu.ricochet.websocket.model.input.ws.WebSocketInputCommandPlayerMove;
import fr.pingouinduturfu.ricochet.websocket.model.input.WebSocketInputCommandType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

@Service
@Slf4j
@RequiredArgsConstructor
public class WebSocketInputCommandExecutorPlayerMove implements WebSocketInputCommandExecutor<WebSocketInputCommandPlayerMove> {

    private final PlayerFacade playerMoveFacade;
    @Override
    public void execute(WebSocketInputCommandPlayerMove command, WebSocketSession session) {
        playerMoveFacade.movePlayer(session, command.getData());
    }

    @Override
    public boolean find(String webSocketInputCommandType) {
        return webSocketInputCommandType.equals(WebSocketInputCommandType.PLAYER_MOVE.name());
    }
}