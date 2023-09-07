package fr.pingouinduturfu.ricochet.player_interaction.impl;

import fr.pingouinduturfu.ricochet.exception.GameManagerException;
import fr.pingouinduturfu.ricochet.game.Game;
import fr.pingouinduturfu.ricochet.game.manager.GameManager;
import fr.pingouinduturfu.ricochet.player_interaction.api.PIJoinGame;
import fr.pingouinduturfu.ricochet.websocket.WebsocketMessageSender;
import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandJoinGame;
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
class PIJoinGameImpl implements PIJoinGame {

    private final WebsocketMessageSender websocketMessageSender;
    private final GameManager gameManager;

    @Override
    public void joinGame(WebSocketSession webSocketSession, InputCommandJoinGame inputCommandJoinGame) {
        Game game;
        try {
            game = gameManager.joinGame(webSocketSession, inputCommandJoinGame.getGameId(), inputCommandJoinGame.getUsername());
        } catch (GameManagerException e) {
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