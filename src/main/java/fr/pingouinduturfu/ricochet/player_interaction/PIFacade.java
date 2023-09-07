package fr.pingouinduturfu.ricochet.player_interaction;

import fr.pingouinduturfu.ricochet.player_interaction.api.PICreateGame;
import fr.pingouinduturfu.ricochet.player_interaction.api.PIJoinGame;
import fr.pingouinduturfu.ricochet.player_interaction.api.PIMove;
import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandCreateGame;
import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandJoinGame;
import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandMove;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

@Service
@Slf4j
@RequiredArgsConstructor
public class PIFacade {

    private final PIMove playerInteractionMoveService;

    private final PICreateGame playerInteractionCreateGameService;

    private final PIJoinGame playerInteractionJoinGameService;

    public void movePlayer(WebSocketSession webSocketSession, InputCommandMove playerMove) {
        playerInteractionMoveService.move(webSocketSession, playerMove);
    }

    public void createGame(WebSocketSession webSocketSession, InputCommandCreateGame playerCreateGame) {
        playerInteractionCreateGameService.createGame(webSocketSession, playerCreateGame);
    }

    public void joinGame(WebSocketSession webSocketSession, InputCommandJoinGame playerJoinGame) {
        playerInteractionJoinGameService.joinGame(webSocketSession, playerJoinGame);
    }
}