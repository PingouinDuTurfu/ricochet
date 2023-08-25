package fr.pingouinduturfu.ricochet.game;

public class Cell {
    private boolean topWall;
    private boolean rightWall;
    private boolean bottomWall;
    private boolean leftWall;

    private int value;
    private int robot = 0;

    public Cell(boolean topWall, boolean rightWall, boolean bottomWall, boolean leftWall, int value) {
        this.topWall = topWall;
        this.rightWall = rightWall;
        this.bottomWall = bottomWall;
        this.leftWall = leftWall;
        this.value = value;
    }

    public void setRobot(int robot) {
        this.robot = robot;
    }

    public int removeRobot() {
        int robot = this.robot;
        this.robot = 0;
        return robot;
    }

    public boolean t() {
        return this.topWall;
    }

    public boolean r() {
        return this.rightWall;
    }

    public boolean b() {
        return this.bottomWall;
    }

    public boolean l() {
        return this.leftWall;
    }

    public int v() {
        return this.value;
    }

    public int robot() {
        return this.robot;
    }
}
