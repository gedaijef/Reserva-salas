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

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @NotNull(message = "Date cannot be null")
    private LocalDate date;

    @Column(name = "recurring")
    @NotNull(message = "Recurring cannot be null")
    private boolean recurring;

    @Column(name = "recurring_day")
    @NotNull(message = "Recurring day cannot be null")
    private boolean recurring_day;

    @Column(name = "recurring_week")
    @NotNull(message = "Recurring week cannot be null")
    private boolean recurring_week;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "final_date_recurring")
    private LocalDate final_date_recurring;

    @Column(name = "number_of_weeks")
    private Integer number_of_weeks;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    public Reservation(
            Long id,
            LocalTime startTime,
            LocalTime finalTime,
            String title,
            LocalDate date,
            boolean recurring,
            boolean recurring_day,
            boolean recurring_week,
            LocalDate final_date_recurring,
            Integer number_of_weeks,
            Room room) {

        this.id = id;
        this.startTime = startTime;
        this.finalTime = finalTime;
        this.title = title;
        this.date = date;
        this.recurring = recurring;
        this.recurring_day = recurring_day;
        this.recurring_week = recurring_week;
        this.final_date_recurring = final_date_recurring;
        this.number_of_weeks = number_of_weeks;
        this.room = room;
    }
    public Reservation() {}
}
