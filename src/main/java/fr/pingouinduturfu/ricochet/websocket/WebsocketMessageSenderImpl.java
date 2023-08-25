package fr.pingouinduturfu.ricochet.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

@Slf4j
@Service
@RequiredArgsConstructor
class WebsocketMessageSenderImpl implements WebsocketMessageSender {

    private final ObjectMapper objectMapper;

    @Override
    public void send(WebSocketSession session, Object message) {
        try {
            String jsonMessage = objectMapper.writeValueAsString(message);
            log.info("Send message {}", jsonMessage);
            session.sendMessage(new TextMessage(jsonMessage));
        } catch (IOException e) {
            log.error("Error occurs while sending message", e);
            throw new RuntimeException(e);
        }
    }
}