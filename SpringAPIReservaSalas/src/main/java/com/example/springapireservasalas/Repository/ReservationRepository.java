package com.example.springapireservasalas.Repository;

import com.example.springapireservasalas.Model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByStartTimeAfterAndFinalTimeBefore(LocalDateTime startTime, LocalDateTime finalTime);
}
