package fr.pingouinduturfu.ricochet.websocket.model.input.model;

import lombok.Data;

@Data
public class InputCommandPlayerMove {

    private String direction;
    private double distance;
}