package fr.pingouinduturfu.ricochet.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Maps")
public class Map {
    @Id
    private String name;

    @NonNull
    @Column(columnDefinition = "JSON")
    private String data;
}
