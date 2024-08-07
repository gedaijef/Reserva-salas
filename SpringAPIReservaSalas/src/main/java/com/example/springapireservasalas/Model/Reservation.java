package com.example.springapireservasalas.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@Getter
@Setter
@ToString
@Table(name = "reservation")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    @Schema(description = "Horário de Início", example = "10:00:00")
    @NotNull(message = "Start time cannot be null")
    @Column(name = "start_time")
    private LocalTime startTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    @Schema(description = "Horário de Fim", example = "11:00:00")
    @NotNull(message = "Final time cannot be null")
    @Column(name = "final_time")
    private LocalTime finalTime;

    @Schema(description = "Tiúlo da Reserva", example = "Reunião Instituto J&F")
    @NotNull(message = "Title cannot be null")
    private String title;

    @Schema(description = "Data da Reserva", example = "2022-01-01")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @NotNull(message = "Date cannot be null")
    private LocalDate date;

    @Schema(description = "Nome do Responsável", example = "Marcelo")
    @NotNull(message = "person name cannot be null")
    @Column(name = "person_name")
    private String personName;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    public Reservation(
            Long id,
            LocalTime startTime,
            LocalTime finalTime,
            String title,
            LocalDate date,
            String personName,
            Room room) {

        this.id = id;
        this.startTime = startTime;
        this.finalTime = finalTime;
        this.title = title;
        this.date = date;
        this.personName = personName;
        this.room = room;
    }
    public Reservation() {}
}
