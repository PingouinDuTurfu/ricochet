package fr.pingouinduturfu.ricochet.websocket.model.input.model;

import lombok.Data;

@Data
public class InputCommandMove {

    private int x;
    private int y;
    private String c;
}