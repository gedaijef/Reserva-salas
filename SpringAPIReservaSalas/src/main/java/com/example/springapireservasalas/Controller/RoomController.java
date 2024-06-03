package com.example.springapireservasalas.Controller;

import com.example.springapireservasalas.Model.Room;
import com.example.springapireservasalas.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
