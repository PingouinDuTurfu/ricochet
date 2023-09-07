package fr.pingouinduturfu.ricochet.game;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@AllArgsConstructor
@ToString
public class Robot {
    private Integer x;
    private Integer y;
    private String color;
}
