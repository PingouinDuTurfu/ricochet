package fr.pingouinduturfu.ricochet.game.mapper;

import lombok.*;

@Builder
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class RobotMapper {
    private Integer x;
    private Integer y;
    private String c;
}
