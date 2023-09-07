package fr.pingouinduturfu.ricochet.game.manager;

import com.github.diogoduailibe.lzstring4j.LZString;
import fr.pingouinduturfu.ricochet.exception.MapManagerException;
import fr.pingouinduturfu.ricochet.persistence.MapPersistence;
import fr.pingouinduturfu.ricochet.repository.MapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MapManager {

    @Autowired
    MapRepository mapRepository;

    public void saveMap(String name, String mapData) throws MapManagerException {
        String compressMapData = LZString.compressToUTF16(mapData);
        if (mapRepository.findFirstByName(name) != null)
            throw new MapManagerException("Map already exist");
        mapRepository.save(new MapPersistence(name, compressMapData));
    }

    public String loadMap(String name) throws MapManagerException {
        MapPersistence map = mapRepository.findFirstByName(name);
        if (map == null)
            throw new MapManagerException("Map does not exist");
        return LZString.decompressFromUTF16(map.getData());
    }

    public List<String> getMapsNames() {
        return mapRepository.findAllNames();
    }
}
