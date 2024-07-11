package com.example.springapireservasalas.Repository;

import com.example.springapireservasalas.Model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query(value = "WITH params AS ( " +
            "    SELECT " +
            "        CAST(:selected_date AS DATE) AS selected_date, " +
            "        CAST(:selected_start_time AS TIME) AS start_time, " +
            "        CAST(:selected_final_time AS TIME) AS final_time, " +
            "        :selected_min_capacity AS min_capacity, " +
            "        :selected_max_capacity AS max_capacity, " +
            "        :selected_recurring AS recurring, " +
            "        CAST(:final_date_recurring AS DATE) AS final_date_recurring " +
            ") " +
            "SELECT " +
            "    room.id, " +
            "    room.start_time_free, " +
            "    room.final_time_free, " +
            "    room.type, " +
            "    room.name, " +
            "    room.capacity, " +
            "    room.floor, " +
            "    room.has_tv " +
            "FROM " +
            "    Room room " +
            "CROSS JOIN " +
            "    params " +
            "WHERE " +
            "    room.type = :selected_type " +
            "    AND room.capacity >= params.min_capacity " +
            "    AND room.capacity <= params.max_capacity " +
            "    AND params.start_time BETWEEN room.start_time_free AND room.final_time_free " +
            "    AND params.final_time BETWEEN room.start_time_free AND room.final_time_free " +
            "    AND (" +
            "        params.recurring = FALSE " +
            "        AND room.id NOT IN ( " +
            "            SELECT reservation.room_id " +
            "            FROM Reservation reservation " +
            "            WHERE reservation.date = params.selected_date " +
            "              AND ((params.start_time, params.final_time) OVERLAPS (reservation.start_time, reservation.final_time)) " +
            "        ) " +
            "        OR " +
            "        params.recurring = TRUE " +
            "        AND room.id NOT IN ( " +
            "            SELECT reservation.room_id " +
            "            FROM Reservation reservation " +
            "            WHERE " +
            "                (reservation.date BETWEEN params.selected_date AND params.final_date_recurring) " +
            "                AND ((params.start_time, params.final_time) OVERLAPS (reservation.start_time, reservation.final_time)) " +
            "        )" +
            "    )", nativeQuery = true)
    List<Room> findRoomsByTypeAndDateAndStartTimeAndFinalTimeAndCapacity(
            @Param("selected_date") LocalDate selected_date,
            @Param("selected_start_time") LocalTime selected_start_time,
            @Param("selected_final_time") LocalTime selected_final_time,
            @Param("selected_min_capacity") Integer selected_min_capacity,
            @Param("selected_max_capacity") Integer selected_max_capacity,
            @Param("selected_recurring") boolean selected_recurring,
            @Param("final_date_recurring") LocalDate final_date_recurring,
            @Param("selected_type") String selected_type);
}