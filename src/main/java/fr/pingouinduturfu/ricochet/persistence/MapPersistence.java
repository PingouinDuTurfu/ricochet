package fr.pingouinduturfu.ricochet.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Maps")
public class MapPersistence {
    @Id
    private String name;

    @NonNull
    @Column(length = 5000)
    private String data;
}
