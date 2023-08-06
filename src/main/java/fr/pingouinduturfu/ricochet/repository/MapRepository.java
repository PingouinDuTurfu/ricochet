package fr.pingouinduturfu.ricochet.repository;

import fr.pingouinduturfu.ricochet.persistence.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MapRepository extends JpaRepository<Map, String> {}