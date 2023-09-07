package fr.pingouinduturfu.ricochet.player_interaction.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import fr.pingouinduturfu.ricochet.exception.MapManagerException;
import fr.pingouinduturfu.ricochet.game.Game;
import fr.pingouinduturfu.ricochet.game.manager.GameManager;
import fr.pingouinduturfu.ricochet.player_interaction.api.PICreateGame;
import fr.pingouinduturfu.ricochet.websocket.WebSocketSessionManager;
import fr.pingouinduturfu.ricochet.websocket.WebSocketSessionWrapper;
import fr.pingouinduturfu.ricochet.websocket.WebsocketMessageSender;
import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandCreateGame;
import fr.pingouinduturfu.ricochet.websocket.model.output.model.OutputCommandError;
import fr.pingouinduturfu.ricochet.websocket.model.output.model.OutputCommandUpdateGame;
import fr.pingouinduturfu.ricochet.websocket.model.output.ws.WebSocketOutputCommandError;
import fr.pingouinduturfu.ricochet.websocket.model.output.ws.WebSocketOutputCommandUpdateGame;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import static fr.pingouinduturfu.ricochet.websocket.model.output.WebSocketOutputCommandType.ERROR;
import static fr.pingouinduturfu.ricochet.websocket.model.output.WebSocketOutputCommandType.UPDATE_GAME;

@Service
@Slf4j
@RequiredArgsConstructor
public class PICreateGameImpl implements PICreateGame {

    private final WebsocketMessageSender websocketMessageSender;
    private final GameManager gameManager;

    public void createGame(WebSocketSession webSocketSession, InputCommandCreateGame inputCommandCreateGame) {
        Game game;
        try {
            game = gameManager.createGame(webSocketSession, inputCommandCreateGame.getMapName(), inputCommandCreateGame.getUsername());
        } catch (MapManagerException | JsonProcessingException e) {
            websocketMessageSender.send(webSocketSession, WebSocketOutputCommandError.builder()
                    .actionName(ERROR.name())
                    .data(OutputCommandError.builder()
                            .message(e.getMessage())
                            .build())
                    .build());
            return;
        }

        WebSocketOutputCommandUpdateGame webSocketOutputCommandUpdateGame = WebSocketOutputCommandUpdateGame.builder()
                .data(OutputCommandUpdateGame.builder()
                        .sessionId(webSocketSession.getId())
                        .gameId(game.getGameId())
                        .map(game.serializeMap())
                        .players(game.getPlayersList())
                        .build())
                .actionName(UPDATE_GAME.name())
                .build();
        websocketMessageSender.send(webSocketSession, webSocketOutputCommandUpdateGame);
    }
}
