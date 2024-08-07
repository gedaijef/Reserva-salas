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
}
