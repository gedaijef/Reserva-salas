package com.example.springapireservasalas.Repository;

import com.example.springapireservasalas.Model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    long countByPersonName(String personName);
}
