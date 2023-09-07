package fr.pingouinduturfu.ricochet.game.mapper;

import lombok.*;

@Builder
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CellMapper {
    private int x;
    private int y;
    private String v;
    private boolean t;
    private boolean b;
    private boolean l;
    private boolean r;
}
