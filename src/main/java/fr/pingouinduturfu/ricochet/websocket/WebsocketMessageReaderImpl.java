package fr.pingouinduturfu.ricochet.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fr.pingouinduturfu.ricochet.websocket.model.input.WebSocketInputCommand;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;

@Slf4j
@Service
@RequiredArgsConstructor
class WebsocketMessageReaderImpl implements WebsocketMessageReader {

    private final ObjectMapper objectMapper;

    @Override
    public WebSocketInputCommand<?> read(TextMessage message) {
        try {
            log.info("Received message {}", message.getPayload());
            return objectMapper.readValue(message.getPayload(), WebSocketInputCommand.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}