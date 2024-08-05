package com.example.springapireservasalas.Service;

import com.example.springapireservasalas.Model.Reservation;
import com.example.springapireservasalas.Model.Room;
import com.example.springapireservasalas.Repository.ReservationRepository;
import com.example.springapireservasalas.Repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private RoomRepository roomRepository;

    public List<Reservation> selecionarTodos() {
        return reservationRepository.findAll();
    }

    public Reservation createReservation(String roomName, Reservation reservationDetails) {
        Optional<Room> room = roomRepository.findByName(roomName);
        if (room.isPresent()) {
            reservationDetails.setRoom(room.get());
            return reservationRepository.save(reservationDetails);
        } else {
            throw new RuntimeException("Room not found");
        }
    }
}