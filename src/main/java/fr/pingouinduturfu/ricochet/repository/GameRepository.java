package fr.pingouinduturfu.ricochet.repository;

import fr.pingouinduturfu.ricochet.persistence.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GameRepository extends JpaRepository<Game, UUID> {}
