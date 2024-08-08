package com.example.springapireservasalas.Controller;

import com.example.springapireservasalas.Model.Room;
import com.example.springapireservasalas.Service.RoomService;
import com.example.springapireservasalas.dto.FiltroDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/room")
public class RoomController {

    @Autowired
    RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    //receber a capacidade
    @PostMapping()
    public Object filtrarSalasPorTipoDataHorarioCapacidade(
            @Valid @RequestBody FiltroDTO filtro,
            BindingResult result) {

        if(result.hasErrors()){
            List<String> errors = result.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList();
            return ResponseEntity.badRequest().body("Erro na validação de dados: "+errors);
        }

        return roomService.filtrarSalas(filtro);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException manve) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError error : manve.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }
        return errors;
    }
}