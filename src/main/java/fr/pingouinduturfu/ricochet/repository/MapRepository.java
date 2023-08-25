package fr.pingouinduturfu.ricochet.repository;

import fr.pingouinduturfu.ricochet.persistence.MapPersistence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface MapRepository extends JpaRepository<MapPersistence, String> {
    MapPersistence findFirstByName(String name);

    @Query("SELECT m.name FROM Maps m")
    ArrayList<String> findAllNames();
}