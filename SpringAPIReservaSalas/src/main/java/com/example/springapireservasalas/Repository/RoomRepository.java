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

    @Query(value = "WITH params AS (" +
            "    SELECT" +
            "        CAST(:selected_date AS DATE) AS selected_date," +
            "        CAST(:selected_start_time AS TIME) AS start_time," +
            "        CAST(:selected_final_time AS TIME) AS final_time," +
            "        :selected_capacity AS capacity," +
            "        :selected_has_tv AS has_tv" +
            ") " +
            "SELECT" +
            "    room.id," +
            "    room.name," +
            "    room.capacity," +
            "    room.floor," +
            "    room.has_tv," +
            "    room.start_time_free," +
            "    room.final_time_free, " +
            "    room.type " +
            "FROM" +
            "    Room room " +
            "CROSS JOIN" +
            "    params " +
            "WHERE" +
            "    room.type = :selected_type " +
            "AND room.capacity >= params.capacity " +
            "AND params.start_time >= room.start_time_free " +
            "AND params.final_time <= room.final_time_free " +
            "AND room.has_tv = params.has_tv " +
            "AND NOT EXISTS (" +
            "    SELECT 1 " +
            "    FROM Reservation reservation " +
            "    WHERE reservation.room_id = room.id " +
            "    AND reservation.date = params.selected_date " +
            "    AND (params.start_time, params.final_time) OVERLAPS (reservation.start_time, reservation.final_time)" +
            ")", nativeQuery = true)
    List<Room> findRoomsByCapacityAndStartTimeFreeAndFinalTimeFreeAndTypeAndHasTv(
            @Param("selected_date") LocalDate selected_date,
            @Param("selected_start_time") LocalTime selected_start_time,
            @Param("selected_final_time") LocalTime selected_final_time,
            @Param("selected_capacity") Integer selected_capacity,
            @Param("selected_type") Integer selected_type,
            @Param("selected_has_tv") Boolean selected_has_tv);
}
