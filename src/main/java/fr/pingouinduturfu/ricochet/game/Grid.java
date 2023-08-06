package fr.pingouinduturfu.ricochet.game;

public class Grid {

    private int width;
    private int height;

    private int[][] grid;

    public Grid(int width, int height) {
        this.width = width;
        this.height = height;
        this.grid = new int[width][height];
    }

    public int getWidth() {
        return this.width;
    }

    public int getHeight() {
        return this.height;
    }

    public int[][] getGrid() {
        return this.grid;
    }
}
