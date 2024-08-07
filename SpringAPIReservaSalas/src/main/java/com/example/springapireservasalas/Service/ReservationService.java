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

    public List<Reservation> selecionarTodos() {
        return reservationRepository.findAll();
    }

    // metodo para a criação de reservas e adicionar logica de verificação de data, se esta dentro de 30 dias baseado na data atual
//    public List<Reservation> createManyReservations(List<Reservation> reservations) {
//        List<Reservation> savedReservations = new ArrayList<>();
//
//        for (Reservation reservation : reservations) {
//            long existingReservationsCount = reservationRepository.countByPersonName(reservation.getPersonName());
//
//            if (reservation.getDate().isBefore(LocalDate.now().plusDays(30))
//                    && reservation.getPersonName().codePointCount(0, reservation.getPersonName().length()) >= 5
//                    && existingReservationsCount < 5) {
//                reservationRepository.save(reservation);
//                savedReservations.add(reservation);
//            }
//        }
//
//        return savedReservations;
//    }


    public Reservation createReservation(Long roomId, Reservation reservationDetails) {
        Optional<Room> room = roomRepository.findById(roomId);
        if (room.isPresent()) {
            reservationDetails.setRoom(room.get());
        } else {
            throw new EntityNotFoundException("Sala não existente");
        }
        return reservationRepository.save(reservationDetails);
    }
}