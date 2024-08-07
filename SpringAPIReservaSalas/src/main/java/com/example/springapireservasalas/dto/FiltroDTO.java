package com.example.springapireservasalas.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;

public class FiltroDTO {
    @NotNull(message = "Informe a data da reserva")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate date;

    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    @NotNull(message = "Informe o horário de inicio da reserva")
    private LocalTime start_time;

    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    @NotNull(message = "Informe o horário de fim da reserva")
    private LocalTime final_time;

    @NotNull(message = "Informe a capacidade da sala")
    @Max(value = 25, message = "A capacidade máxima é 25 pessoas")
    private Integer capacity;

    @NotNull(message = "Selecione o tipo da sala")
    private Integer type;

    @NotNull(message = "Selecione se a sala tem tv")
    private boolean hasTv;

    public FiltroDTO(LocalDate date, LocalTime start_time, LocalTime final_time, Integer capacity, Integer type, boolean hasTv) {
        this.date = date;
        this.start_time = start_time;
        this.final_time = final_time;
        this.capacity = capacity;
        this.type = type;
        this.hasTv = hasTv;
    }

    public LocalDate getDate() {
        return date;
    }
    public LocalTime getStart_time() {
        return start_time;
    }
    public LocalTime getFinal_time() {
        return final_time;
    }
    public Integer getCapacity() {
        return capacity;
    }
    public Integer getType() {
        return type;
    }
    public boolean getHasTv() {
        return hasTv;
    }
}
