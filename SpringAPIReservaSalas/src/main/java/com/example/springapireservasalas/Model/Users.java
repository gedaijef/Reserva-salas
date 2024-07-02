package com.example.springapireservasalas.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Data
@Getter
@Setter
@ToString
@Table(name = "users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Name cannot be null")
    private String name;

    @NotNull(message = "Email cannot be null")
    @Email
    private String email;

    @NotNull(message = "isInstituto cannot be null")
    @Column(name = "is_instituto")
    private boolean isInstituto;

    public Users(Long id, String name, String email, boolean isInstituto) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.isInstituto = isInstituto;
    }

    public Users() {
    }

}
