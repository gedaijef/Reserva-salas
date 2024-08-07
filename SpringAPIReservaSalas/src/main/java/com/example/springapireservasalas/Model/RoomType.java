package com.example.springapireservasalas.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Data
@Getter
@Setter
@ToString
@Table(name = "room_type")
public class RoomType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    public RoomType(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public RoomType(){}
}
