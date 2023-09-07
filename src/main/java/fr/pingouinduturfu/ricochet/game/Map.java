package fr.pingouinduturfu.ricochet.game;

import fr.pingouinduturfu.ricochet.game.mapper.CellMapper;
import fr.pingouinduturfu.ricochet.game.mapper.GameMapper;
import lombok.Getter;

import java.util.List;

@Getter
public class Map {

    private final int width;
    private final int height;
    private final Cell[][] grid;

    public Map(GameMapper mapData) {
        this.width = mapData.getW();
        this.height = mapData.getH();
        this.grid = new Cell[this.height][this.width];

        for (int y = 0; y < this.height; y++) {
            List<CellMapper> row = mapData.getG().get(y);
            for (int x = 0; x < this.width; x++) {
                CellMapper cellMapper = row.get(x);
                this.grid[y][x] = new Cell(cellMapper.isT(), cellMapper.isR(), cellMapper.isB(), cellMapper.isL(), cellMapper.getV());
            }
        }
    }
}
