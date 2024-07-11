package com.example.springapireservasalas.Service;

import com.example.springapireservasalas.Model.Room;
import com.example.springapireservasalas.Repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
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

    public List<Room> filtrarSalasPorTipoDataHorarioCapacidade(
            LocalDate selected_date,
            LocalTime selected_start_time,
            LocalTime selected_final_time,
            Integer selected_min_capacity,
            Integer selected_max_capacity,
            boolean selected_recurring,
            LocalDate final_date_recurring,
            String selected_type) {

        return roomRepository.findRoomsByTypeAndDateAndStartTimeAndFinalTimeAndCapacity(
                selected_date,
                selected_start_time,
                selected_final_time,
                selected_min_capacity,
                selected_max_capacity,
                selected_recurring,
                final_date_recurring,
                selected_type);
    }
}