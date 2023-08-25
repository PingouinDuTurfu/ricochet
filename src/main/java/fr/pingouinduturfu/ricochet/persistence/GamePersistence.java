package fr.pingouinduturfu.ricochet.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.NonNull;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity(name = "Games")
public class GamePersistence {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(updatable = false, nullable = false, columnDefinition = "VARCHAR(36)")
//    @Type(type = "uuid-char")
    private UUID id;

    @NonNull
    @Column(length = 5000)
    private String data;
}
