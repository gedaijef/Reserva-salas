package com.example.springapireservasalas.Controller;
import com.example.springapireservasalas.Model.Reservation;
import com.example.springapireservasalas.Service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/selecionarTodos")
    public List<Reservation> selecionarTodos() {
        return reservationService.selecionarTodos();
    }

    @PostMapping("/criar")
    public ResponseEntity<Reservation> createReservation(@RequestParam String roomName, @RequestBody Reservation reservationDetails) {
        Reservation newReservation = reservationService.createReservation(roomName, reservationDetails);
        return ResponseEntity.ok(newReservation);
    }
}
