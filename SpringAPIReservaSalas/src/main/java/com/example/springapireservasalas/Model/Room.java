package com.example.springapireservasalas.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalTime;

@Entity
@Data
@Getter
@Setter
@ToString
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Name cannot be null")
    private String name;

    @NotNull(message = "Floor cannot be null")
    @Min(value = 0, message = "Floor cannot be less than 0")
    @Max(value = 7, message = "Floor cannot be greater than 7")
    private Integer floor;

    @NotNull(message = "Capacity cannot be null")
    @Min(value = 0, message = "Capacity cannot be less than 0")
    private Integer capacity;

    @NotNull(message = "Has tv cannot be null")
    @Column(name = "has_tv")
    private boolean hasTv;

    @NotNull(message = "Room type cannot be null")
    @Column(name = "type")
    private Integer type;

    @NotNull(message = "Horario Inicio Vago from cannot be null")
    @Column(name = "start_time_free")
    private LocalTime start_time_free;

    @NotNull(message = "Horario Fim Vago to cannot be null")
    @Column(name = "final_time_free")
    private LocalTime final_time_free;

    public Room(Long id, String name, Integer floor, Integer capacity, boolean hasTv, Integer type, LocalTime start_time_free, LocalTime final_time_free) {
        this.id = id;
        this.name = name;
        this.floor = floor;
        this.capacity = capacity;
        this.hasTv = hasTv;
        this.type = type;
        this.start_time_free = start_time_free;
        this.final_time_free = final_time_free;
    }

    public Room() {

    }
}
