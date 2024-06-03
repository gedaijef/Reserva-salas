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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isInstituto() {
        return isInstituto;
    }

    public void setInstituto(boolean instituto) {
        isInstituto = instituto;
    }
}
