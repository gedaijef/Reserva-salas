package com.example.springapireservasalas.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    @NotNull(message = "Start time cannot be null")
    @Column(name = "start_time")
    private LocalTime startTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    @NotNull(message = "Final time cannot be null")
    @Column(name = "final_time")
    private LocalTime finalTime;

    @NotNull(message = "Title cannot be null")
    private String title;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    @NotNull(message = "Date cannot be null")
    private LocalDate date;

    @Column(name = "recurring")
    private boolean recurring;

    @Column(name = "final_date_recurring")
    private LocalDate final_date_recurring;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    public Reservation(Long id, LocalTime startTime, LocalTime finalTime, String title, LocalDate date, boolean recurring, LocalDate final_date_recurring, Room room, Users user) {
        this.id = id;
        this.startTime = startTime;
        this.finalTime = finalTime;
        this.title = title;
        this.date = date;
        this.recurring = recurring;
        this.final_date_recurring = final_date_recurring;
        this.room = room;
        this.user = user;
    }

    public Reservation() {}
}
