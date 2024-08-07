package com.example.springapireservasalas.Service;
import com.example.springapireservasalas.Model.Room;
import com.example.springapireservasalas.Repository.RoomRepository;
import com.example.springapireservasalas.dto.FiltroDTO;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RoomService {
    RoomRepository roomRepository;
    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<Room> filtrarSalas(
            FiltroDTO filtro) {

        return roomRepository.findRoomsByCapacityAndStartTimeFreeAndFinalTimeFreeAndTypeAndHasTv(
                filtro.getDate(),filtro.getStart_time(),filtro.getFinal_time(),filtro.getCapacity(),filtro.getType(), filtro.getHasTv()
               );
    }
}