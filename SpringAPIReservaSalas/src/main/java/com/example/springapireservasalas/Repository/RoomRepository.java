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

//    @Query(value = "WITH params AS ( " +
//            "    SELECT " +
//            "        CAST(:selected_date AS DATE) AS selected_date, " +
//            "        CAST(:selected_start_time AS TIME) AS start_time, " +
//            "        CAST(:selected_final_time AS TIME) AS final_time, " +
//            "        :selected_min_capacity AS min_capacity, " +
//            "        :selected_max_capacity AS max_capacity, " +
//            "        :selected_recurring AS recurring, " +
//            "        :selected_recurring_day AS recurring_day, " +
//            "        :selected_recurring_week AS recurring_week, " +
//            "        CAST(:final_date_recurring AS DATE) AS final_date_recurring, " +
//            "        :selected_number_of_weeks AS number_of_weeks " +
//            ") " +
//            "SELECT " +
//            "    room.id, " +
//            "    room.start_time_free, " +
//            "    room.final_time_free, " +
//            "    room.type, " +
//            "    room.name, " +
//            "    room.capacity, " +
//            "    room.floor, " +
//            "    room.has_tv " +
//            "FROM " +
//            "    Room room " +
//            "CROSS JOIN " +
//            "    params " +
//            "WHERE " +
//            "    room.type = :selected_type " +
//            "    AND room.capacity >= params.min_capacity " +
//            "    AND room.capacity <= params.max_capacity " +
//            "    AND params.start_time BETWEEN room.start_time_free AND room.final_time_free " +
//            "    AND params.final_time BETWEEN room.start_time_free AND room.final_time_free " +
//            "    AND (" +
//            "        params.recurring = FALSE " +
//            "        AND room.id NOT IN ( " +
//            "            SELECT reservation.room_id " +
//            "            FROM Reservation reservation " +
//            "            WHERE reservation.date = params.selected_date " +
//            "              AND ((params.start_time, params.final_time) OVERLAPS (reservation.start_time, reservation.final_time)) " +
//            "        ) " +
//            "        OR " +
//            "        params.recurring = TRUE " +
//            "        AND room.id NOT IN ( " +
//            "            SELECT reservation.room_id " +
//            "            FROM Reservation reservation " +
//            "            WHERE " +
//            "                (reservation.date BETWEEN params.selected_date AND COALESCE(params.final_date_recurring, params.selected_date)) " +
//            "                AND ((params.start_time, params.final_time) OVERLAPS (reservation.start_time, reservation.final_time)) " +
//            "        )" +
//            "    )", nativeQuery = true)
//    List<Room> findRoomsByTypeAndDateAndStartTimeAndFinalTimeAndCapacity(
//            @Param("selected_date") LocalDate selected_date,
//            @Param("selected_start_time") LocalTime selected_start_time,
//            @Param("selected_final_time") LocalTime selected_final_time,
//            @Param("selected_min_capacity") Integer selected_min_capacity,
//            @Param("selected_max_capacity") Integer selected_max_capacity,
//            @Param("selected_recurring") boolean selected_recurring,
//            @Param("selected_recurring_day") boolean selected_recurring_day,
//            @Param("selected_recurring_week") boolean selected_recurring_week,
//            @Param("final_date_recurring") LocalDate final_date_recurring,
//            @Param("selected_number_of_weeks") Integer selected_number_of_weeks,
//            @Param("selected_type") String selected_type);

    @Query(value = "WITH params AS (" +
            "    SELECT" +
            "        CAST(:selected_date AS DATE) AS selected_date," +
            "        CAST(:selected_start_time AS TIME) AS start_time," +
            "        CAST(:selected_final_time AS TIME) AS final_time," +
            "        :selected_min_capacity AS min_capacity," +
            "        :selected_max_capacity AS max_capacity," +
            "        :selected_recurring AS recurring," +
            "        :selected_recurring_day AS recurring_day," +
            "        :selected_recurring_week AS recurring_week," +
            "        CAST(:final_date_recurring AS DATE) AS final_date_recurring," +
            "        :selected_number_of_weeks AS number_of_weeks," +
            "        :selected_type AS selected_type" +
            ")" +
            "SELECT" +
            "    room.id," +
            "    room.name," +
            "    room.capacity," +
            "    room.floor," +
            "    room.has_tv, " +
            "    room.type," +
            "    room.start_time_free," +
            "    room.final_time_free " +
            "FROM" +
            "    Room room " +
            "CROSS JOIN" +
            "    params " +
            "WHERE " +
            "    room.type = 'Sala de Reunião'" +
            "    AND room.capacity BETWEEN params.min_capacity AND params.max_capacity" +
            "    AND params.start_time >= room.start_time_free" +
            "    AND params.final_time <= room.final_time_free" +
            "    AND NOT EXISTS (" +
            "        SELECT 1" +
            "        FROM Reservation reservation" +
            "        WHERE reservation.room_id = room.id" +
            "        AND (" +
            "            (reservation.date = params.selected_date)" +
            "            OR (" +
            "                reservation.recurring = TRUE" +
            "                AND reservation.recurring_day = TRUE" +
            "                AND params.recurring_day = TRUE" +
            "                AND params.selected_date <= reservation.final_date_recurring" +
            "                AND reservation.date <= params.final_date_recurring" +
            "            )" +
            "            OR (" +
            "                reservation.recurring = TRUE" +
            "                AND reservation.recurring_week = TRUE" +
            "                AND params.recurring_week = TRUE" +
            "                AND params.selected_date <= reservation.date + (reservation.number_of_weeks * 7)" +
            "                AND reservation.date <= params.selected_date + (params.number_of_weeks * 7)" +
            "            )" +
            "        )" +
            "        AND (params.start_time, params.final_time) OVERLAPS (reservation.start_time, reservation.final_time)" +
            "    )", nativeQuery = true)
    List<Room> findRoomsByCapacityAndStartTimeFreeAndFinalTimeFreeAndType(
            @Param("selected_date") LocalDate selected_date,
            @Param("selected_start_time") LocalTime selected_start_time,
            @Param("selected_final_time") LocalTime selected_final_time,
            @Param("selected_min_capacity") Integer selected_min_capacity,
            @Param("selected_max_capacity") Integer selected_max_capacity,
            @Param("selected_recurring") boolean selected_recurring,
            @Param("selected_recurring_day") boolean selected_recurring_day,
            @Param("selected_recurring_week") boolean selected_recurring_week,
            @Param("final_date_recurring") LocalDate final_date_recurring,
            @Param("selected_number_of_weeks") Integer selected_number_of_weeks,
            @Param("selected_type") String selected_type);
}
