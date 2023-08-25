package fr.pingouinduturfu.ricochet.player.player_impl;

import fr.pingouinduturfu.ricochet.player.player_api.PlayerMove;
import fr.pingouinduturfu.ricochet.websocket.WebSocketSessionManager;
import fr.pingouinduturfu.ricochet.websocket.WebSocketSessionWrapper;
import fr.pingouinduturfu.ricochet.websocket.WebsocketMessageSender;
import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandPlayerMove;
import fr.pingouinduturfu.ricochet.websocket.model.output.model.OutputCommandPlayerMove;
import fr.pingouinduturfu.ricochet.websocket.model.output.ws.WebSocketOutputCommandPlayerMove;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import static fr.pingouinduturfu.ricochet.websocket.model.output.WebSocketOutputCommandType.PLAYER_MOVE;

@Service
@Slf4j
@RequiredArgsConstructor
class PlayerMoveImpl implements PlayerMove {

    private final WebSocketSessionManager webSocketSessionManager;

    private final WebsocketMessageSender websocketMessageSender;

    @Override
    public void move(WebSocketSession webSocketSession, InputCommandPlayerMove playerMove) {
        System.out.println("Imagine t'arrives ici");
        System.out.println(playerMove);

        WebSocketSessionWrapper session = webSocketSessionManager.getSession(webSocketSession);
        if(playerMove.getDirection().equals("X")){
            session.setLastPositionX(session.getLastPositionX()+playerMove.getDistance());
        }
        if(playerMove.getDirection().equals("Y")){
            session.setLastPositionY(session.getLastPositionY()+playerMove.getDistance());
        }

        webSocketSessionManager.getAllSessions().forEach(sessionWrapper -> {
            WebSocketOutputCommandPlayerMove outputPlayerMove = WebSocketOutputCommandPlayerMove.builder()
                    .actionName(PLAYER_MOVE.name())
                    .data(OutputCommandPlayerMove.builder()
                            .direction(playerMove.getDirection())
                            .distance(playerMove.getDistance())
                            .sessionId(webSocketSession.getId())
                            .build())
                    .build();
            websocketMessageSender.send(sessionWrapper.getWebSocketSession(), outputPlayerMove);
        });
    }
}