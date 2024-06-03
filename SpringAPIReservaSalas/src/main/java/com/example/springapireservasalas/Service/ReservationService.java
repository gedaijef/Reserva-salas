package com.example.springapireservasalas.Service;

import com.example.springapireservasalas.Model.Reservation;
import com.example.springapireservasalas.Repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> selecionarTodos() {
        return reservationRepository.findAll();
    }

    public Reservation adicionarReserva(Reservation reservation) {
        return reservationRepository.save(reservation);
    }
}