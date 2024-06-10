package com.example.springapireservasalas.Repository;

import com.example.springapireservasalas.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {
}
