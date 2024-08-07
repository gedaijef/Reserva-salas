package com.example.springapireservasalas.Controller;
import com.example.springapireservasalas.Model.Reservation;
import com.example.springapireservasalas.Service.ReservationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.websocket.server.PathParam;
import org.hibernate.mapping.Any;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping()
    public List<Reservation> selecionarTodos() {
        return reservationService.selecionarTodos();
    }


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
        }
        return ResponseEntity.ok().body("Reserva criada!");
    }

    //criar rota que recebe varias reservas, reservas max: 5dias, validar se esta dentro de 30 dias

//    @PostMapping()
//    @Operation(summary = "Insere as reservas", description = "Insere as reservas na lista")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "Reservas inseridas com sucesso",
//                    content = @Content(mediaType = "application/json",
//                            schema = @Schema(implementation = Reservation.class))),
//            @ApiResponse(responseCode = "204", description = "Não foi possível adicionar a reserva", content = @Content)
//    })
//    public ResponseEntity<List<Reservation>> createManyReservations(@RequestBody List<Reservation> reservations) {
//        List<Reservation> savedReservations = reservationService.createManyReservations(reservations);
//
//        if (savedReservations.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(savedReservations);
//        } else {
//            return ResponseEntity.status(HttpStatus.CREATED).body(savedReservations);
//        }
//    }
}