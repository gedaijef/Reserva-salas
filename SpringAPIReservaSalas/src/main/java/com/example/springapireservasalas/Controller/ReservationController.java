package com.example.springapireservasalas.Controller;
import com.example.springapireservasalas.Model.Reservation;
import com.example.springapireservasalas.Service.ReservationService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping()
    public ResponseEntity<Object> createReservation(@RequestParam Long roomId, @Valid @RequestBody Reservation reservationDetails , BindingResult result) {
        List<String> errors;
        if (result.hasErrors()) {
            errors = result.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList();
            return ResponseEntity.badRequest().body("Erro na validação de dados: " + errors);
        }

        try {
            reservationService.createReservation(roomId, reservationDetails);
        }catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch(IllegalArgumentException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }

        return ResponseEntity.ok().body("Reserva criada!");
    }
}