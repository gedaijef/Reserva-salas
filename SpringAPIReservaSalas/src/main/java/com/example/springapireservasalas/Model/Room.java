package com.example.springapireservasalas.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

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

    @NotNull(message = "Type cannot be null")
    private String type;

    public Room(Long id, String name, Integer floor, Integer capacity, boolean hasTv, String type) {
        this.id = id;
        this.name = name;
        this.floor = floor;
        this.capacity = capacity;
        this.hasTv = hasTv;
        this.type = type;
    }

    public Room() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getFloor() {
        return floor;
    }

    public void setFloor(Integer floor) {
        this.floor = floor;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public boolean isHasTv() {
        return hasTv;
    }

    public void setHasTv(boolean hasTv) {
        this.hasTv = hasTv;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
