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

    @NotNull(message = "Horario Inicio Vago from cannot be null")
    @Column(name = "start_time_free")
    private LocalTime startTimeFree;

    @NotNull(message = "Horario Fim Vago to cannot be null")
    @Column(name = "final_time_free")
    private LocalTime finalTimeFree;

    @ManyToOne
    @JoinColumn(name = "room_type_id")
    private RoomType roomType;

    public Room(Long id, String name, Integer floor, Integer capacity, boolean hasTv, RoomType roomType, LocalTime startTimeFree, LocalTime finalTimeFree) {
        this.id = id;
        this.name = name;
        this.floor = floor;
        this.capacity = capacity;
        this.hasTv = hasTv;
        this.roomType = roomType;
        this.startTimeFree = startTimeFree;
        this.finalTimeFree = finalTimeFree;
    }

    public Room() {

    }
}
