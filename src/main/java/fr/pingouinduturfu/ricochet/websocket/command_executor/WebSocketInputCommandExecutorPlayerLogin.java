package fr.pingouinduturfu.ricochet.websocket.command_executor;

import fr.pingouinduturfu.ricochet.authentication.AuthenticationFacade;
import fr.pingouinduturfu.ricochet.exception.ExceptionFacade;
import fr.pingouinduturfu.ricochet.player.PlayerFacade;
import fr.pingouinduturfu.ricochet.websocket.model.input.ws.WebSocketInputCommandPlayerLogin;
import fr.pingouinduturfu.ricochet.websocket.model.input.WebSocketInputCommandType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

@Service
@Slf4j
@RequiredArgsConstructor
public class WebSocketInputCommandExecutorPlayerLogin implements WebSocketInputCommandExecutor<WebSocketInputCommandPlayerLogin> {

    private final AuthenticationFacade authenticationFacade;

    private final PlayerFacade playerFacade;

    private final ExceptionFacade exceptionFacade;

    @Override
    public void execute(WebSocketInputCommandPlayerLogin command, WebSocketSession session) {

        if (authenticationFacade.authenticate())
            playerFacade.spawnPlayer(session);
        else
            exceptionFacade.sendError(session, "authentication failed");
    }

    @Override
    public boolean find(String webSocketInputCommandType) {
        return webSocketInputCommandType.equals(WebSocketInputCommandType.PLAYER_LOGIN.name());
    }
}