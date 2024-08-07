package com.example.springapireservasalas.Repository;

import com.example.springapireservasalas.Model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findByName(String name);

    // Filtrar por has_tv e pela capacidade, trazer salas maior & igual a capacidade recebida
    @Query(value = "SELECT r.id, r.name, r.floor, r.capacity, r.has_tv, r.type, r.start_time_free, r.final_time_free, r.room_type_id " +
            "FROM Room r " +
            "JOIN room_type rt ON r.room_type_id = rt.id " +
            "WHERE r.capacity >= :filter_capacity " +
            "AND r.type = :filter_type " +
            "AND r.has_tv = :filter_has_tv " +
            "AND NOT EXISTS (" +
            "    SELECT 1 " +
            "    FROM Reservation res " +
            "    WHERE res.room_id = r.id " +
            "    AND res.date = :filter_date " +
            "    AND (res.start_time < :filter_final_time AND res.final_time > :filter_start_time)" +
            ")", nativeQuery = true)
    List<Room> findRoomsByCapacityAndStartTimeFreeAndFinalTimeFreeAndTypeAndHasTv(
            @Param("filter_date") LocalDate selected_date,
            @Param("filter_start_time") LocalTime selected_start_time,
            @Param("filter_final_time") LocalTime selected_final_time,
            @Param("filter_capacity") Integer selected_capacity,
            @Param("filter_type") Integer selected_type,
            @Param("filter_has_tv") Boolean selected_has_tv);

}
