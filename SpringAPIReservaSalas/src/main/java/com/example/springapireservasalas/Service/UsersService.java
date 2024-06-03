package com.example.springapireservasalas.Service;

import com.example.springapireservasalas.Model.Users;
import com.example.springapireservasalas.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;

    public List<Users> selecionarTodos() {
        return usersRepository.findAll();
    }

    public Users adicionarReserva(Users user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        return usersRepository.save(user);
    }
}
