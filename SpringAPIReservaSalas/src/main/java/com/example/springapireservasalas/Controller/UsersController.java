package com.example.springapireservasalas.Controller;

import com.example.springapireservasalas.Model.Users;
import com.example.springapireservasalas.Service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class UsersController {
    @Autowired
    private UsersService userService;

    @GetMapping("/selecionarTodos")
    public List<Users> getAllReservations() {
        return userService.selecionarTodos();
    }
    @PostMapping("/adicionar")
    public ResponseEntity<Users> createUser(@RequestBody Users user) {
        Users userAdd = userService.adicionarReserva(user);
        return ResponseEntity.ok(userAdd);
    }
}
