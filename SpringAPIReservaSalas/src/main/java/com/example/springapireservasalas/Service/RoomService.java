package com.example.springapireservasalas.Service;

import com.example.springapireservasalas.Model.Room;
import com.example.springapireservasalas.Repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {
    RoomRepository roomRepository;
    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<Room> selecionarTodos(){
        return roomRepository.findAll();
    }

    public Room adicionarReserva(Room room) {
        return roomRepository.save(room);
    }
}
