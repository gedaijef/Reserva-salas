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

    @GetMapping("/selecionarTodos")
    public List<Room> getAllRooms() {
        return roomService.selecionarTodos();
    }

    @PostMapping("/adicionar")
    public Room createRoom(@RequestBody Room room) {
        return roomService.adicionarReserva(room);
    }

    @GetMapping("/filtrarSalas")
    public List<Room> filtrarSalasPorTipoDataHorarioCapacidade(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate selected_date,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime selected_start_time,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime selected_final_time,
            @RequestParam Integer selected_min_capacity,
            @RequestParam Integer selected_max_capacity,
            @RequestParam boolean selected_recurring,
            @RequestParam String selected_type) {

        return roomService.filtrarSalasPorTipoDataHorarioCapacidade(
                selected_date,
                selected_start_time,
                selected_final_time,
                selected_min_capacity,
                selected_max_capacity,
                selected_recurring,
                selected_type);
    }
}