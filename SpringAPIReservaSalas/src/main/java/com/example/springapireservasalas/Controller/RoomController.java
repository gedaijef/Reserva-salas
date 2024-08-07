package com.example.springapireservasalas.Controller;

import com.example.springapireservasalas.Model.Room;
import com.example.springapireservasalas.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;

@RestController
@RequestMapping("/room")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class RoomController {

    @Autowired
    RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping("/filtrarSalas")
    public List<Room> filtrarSalasPorTipoDataHorarioCapacidade(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime start_time,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime final_time,
            @RequestParam Integer min_capacity,
            @RequestParam Integer max_capacity,
            @RequestParam boolean recurring,
            @RequestParam boolean recurring_day,
            @RequestParam boolean recurring_week,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate final_date_recurring,
            @RequestParam(required = false) Integer number_of_weeks,
            @RequestParam String type) {

        return roomService.filtrarSalasPorTipoDataHorarioCapacidade(
                date,
                start_time,
                final_time,
                min_capacity,
                max_capacity,
                recurring,
                recurring_day,
                recurring_week,
                final_date_recurring,
                number_of_weeks,
                type);
    }
}