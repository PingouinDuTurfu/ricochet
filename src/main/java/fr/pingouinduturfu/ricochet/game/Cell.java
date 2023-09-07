package fr.pingouinduturfu.ricochet.game;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class Cell {
    private final boolean topWall;
    private final boolean rightWall;
    private final boolean bottomWall;
    private final boolean leftWall;
    private final String value;

    @Getter(AccessLevel.NONE)
    private boolean hasRobot = false;

    public void addRobot() {
        this.hasRobot = true;
    }

    public void removeRobot() {
        this.hasRobot = false;
    }

    public boolean hasRobot() {
        return this.hasRobot;
    }
}
