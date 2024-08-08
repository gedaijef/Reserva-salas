package com.example.springapireservasalas.Service;

import com.example.springapireservasalas.Model.Reservation;
import com.example.springapireservasalas.Model.Room;
import com.example.springapireservasalas.Repository.ReservationRepository;
import com.example.springapireservasalas.Repository.RoomRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private RoomRepository roomRepository;

    public void createReservation(Long roomId, Reservation reservationDetails) {
        Optional<Room> room = roomRepository.findById(roomId);
        if (room.isPresent()) {
            reservationDetails.setRoom(room.get());
        } else {
            throw new EntityNotFoundException("Sala não existente");
        }
        reservationRepository.save(reservationDetails);
    }
}