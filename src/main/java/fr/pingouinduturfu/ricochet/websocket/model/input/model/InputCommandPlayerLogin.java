package fr.pingouinduturfu.ricochet.websocket.model.input.model;

import lombok.Data;

@Data
public class InputCommandPlayerLogin {

    private String username;
    private String password;
}