package fr.pingouinduturfu.ricochet.player;

import fr.pingouinduturfu.ricochet.player.player_api.PlayerCreateGame;
import fr.pingouinduturfu.ricochet.player.player_api.PlayerJoinGame;
import fr.pingouinduturfu.ricochet.player.player_api.PlayerMove;
import fr.pingouinduturfu.ricochet.player.player_api.PlayerSpawn;
import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandPlayerCreateGame;
import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandPlayerJoinGame;
import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandPlayerMove;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

@Service
@Slf4j
@RequiredArgsConstructor
public class PlayerFacade {

    private final PlayerMove playerMoveService;

    private final PlayerSpawn playerSpawnService;

    private final PlayerCreateGame playerCreateGameService;

    private final PlayerJoinGame playerJoinGameService;

    public void movePlayer(WebSocketSession webSocketSession, InputCommandPlayerMove playerMove) {
        playerMoveService.move(webSocketSession, playerMove);
    }
    public void spawnPlayer(WebSocketSession webSocketSession) {
        playerSpawnService.spawn(webSocketSession);
    }

    public void createGame(WebSocketSession webSocketSession, InputCommandPlayerCreateGame playerCreateGame) {
        playerCreateGameService.createGame(webSocketSession, playerCreateGame);
    }

    public void joinGame(WebSocketSession webSocketSession, InputCommandPlayerJoinGame playerJoinGame) {
        playerJoinGameService.joinGame(webSocketSession, playerJoinGame);
    }
}