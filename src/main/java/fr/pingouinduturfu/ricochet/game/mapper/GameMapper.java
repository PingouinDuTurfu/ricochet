package fr.pingouinduturfu.ricochet.game.mapper;

import lombok.*;

import java.util.List;

@Builder
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class GameMapper {
    private int w;
    private int h;
    private List<List<CellMapper>> g;
    private List<RobotMapper> r;
}