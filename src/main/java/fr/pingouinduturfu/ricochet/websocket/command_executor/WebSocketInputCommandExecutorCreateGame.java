package fr.pingouinduturfu.ricochet.websocket.command_executor;

import fr.pingouinduturfu.ricochet.player_interaction.PIFacade;
import fr.pingouinduturfu.ricochet.websocket.model.input.WebSocketInputCommandType;
import fr.pingouinduturfu.ricochet.websocket.model.input.ws.WebSocketInputCommandCreateGame;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

@Service
@Slf4j
@RequiredArgsConstructor
public class WebSocketInputCommandExecutorCreateGame implements WebSocketInputCommandExecutor<WebSocketInputCommandCreateGame>{

    private final PIFacade playerMoveFacade;

    @Override
    public void execute(WebSocketInputCommandCreateGame command, WebSocketSession session) {
        playerMoveFacade.createGame(session, command.getData());
    }

    @Override
    public boolean find(String webSocketInputCommandType) {
        return webSocketInputCommandType.equals(WebSocketInputCommandType.CREATE_GAME.name());
    }
}
