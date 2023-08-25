package fr.pingouinduturfu.ricochet.repository;

import fr.pingouinduturfu.ricochet.persistence.GamePersistence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GameRepository extends JpaRepository<GamePersistence, UUID> {}
