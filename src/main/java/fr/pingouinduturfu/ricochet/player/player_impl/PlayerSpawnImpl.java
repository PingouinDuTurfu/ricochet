package fr.pingouinduturfu.ricochet.player.player_impl;

import fr.pingouinduturfu.ricochet.player.player_api.PlayerSpawn;
import fr.pingouinduturfu.ricochet.websocket.WebSocketSessionManager;
import fr.pingouinduturfu.ricochet.websocket.WebsocketMessageSender;
import fr.pingouinduturfu.ricochet.websocket.model.output.model.OutputCommandPlayerSpawn;
import fr.pingouinduturfu.ricochet.websocket.model.output.ws.WebSocketOutputCommandPlayerSpawn;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import static fr.pingouinduturfu.ricochet.websocket.model.output.WebSocketOutputCommandType.PLAYER_SPAWN;

@Service
@Slf4j
@RequiredArgsConstructor
class PlayerSpawnImpl implements PlayerSpawn {

    private final WebSocketSessionManager webSocketSessionManager;

    private final WebsocketMessageSender websocketMessageSender;

    @Override
    public void spawn(WebSocketSession webSocketSession) {
        log.info("spawn new user in all existing clients");
        webSocketSessionManager.getAllSessions()
                .forEach(sessionWrapper -> {
                            WebSocketOutputCommandPlayerSpawn spawnPlayerMessage = WebSocketOutputCommandPlayerSpawn.builder()
                                    .data(OutputCommandPlayerSpawn.builder()
                                            .sessionId(webSocketSession.getId())
                                            .positionX(235)
                                            .positionY(235)
                                            .build())
                                    .actionName(PLAYER_SPAWN.name())
                                    .build();
                            websocketMessageSender.send(sessionWrapper.getWebSocketSession(), spawnPlayerMessage);
                        }
                );

        log.info("spawn all existing users in new client");
        webSocketSessionManager.getAllSessions()
                .stream()
                .filter(sessionWrapper -> !sessionWrapper.getWebSocketSession().equals(webSocketSession))
                .forEach(sessionWrapper -> {
                            WebSocketOutputCommandPlayerSpawn spawnPlayerMessage = WebSocketOutputCommandPlayerSpawn.builder()
                                    .data(OutputCommandPlayerSpawn.builder()
                                            .sessionId(sessionWrapper.getWebSocketSession().getId())
                                            .positionX(sessionWrapper.getLastPositionX())
                                            .positionY(sessionWrapper.getLastPositionY())
                                            .build())
                                    .actionName(PLAYER_SPAWN.name())
                                    .build();
                            websocketMessageSender.send(webSocketSession, spawnPlayerMessage);
                        }
                );
    }
}