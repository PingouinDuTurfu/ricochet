package fr.pingouinduturfu.ricochet.player.player_api;

import org.springframework.web.socket.WebSocketSession;

public interface PlayerSpawn {
    void spawn(WebSocketSession webSocketSession);
}