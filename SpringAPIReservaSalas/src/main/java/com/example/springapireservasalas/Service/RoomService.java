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
            LocalDate date,
            LocalTime start_time,
            LocalTime final_time,
            Integer min_capacity,
            Integer max_capacity,
            boolean recurring,
            boolean recurring_day,
            boolean recurring_week,
            LocalDate final_date_recurring,
            Integer number_of_weeks,
            String type) {

        return roomRepository.findRoomsByCapacityAndStartTimeFreeAndFinalTimeFreeAndType(
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