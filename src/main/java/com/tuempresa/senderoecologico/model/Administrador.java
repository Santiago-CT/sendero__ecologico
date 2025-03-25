package com.tuempresa.senderoecologico.model;

import javax.persistence.*;

@Entity
@Table(name = "administradores")
public class Administrador extends Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAdministrador;

    // Métodos y atributos específicos de Administrador
    private String gestionarEstaciones;   // Ejemplo, en tu diagrama hay "gestionarEstaciones()"
    private String moderarComentarios;    // "moderarComentarios()"
    private String generarReportes;       // "generarReportes()"

    public Administrador() {
        super();
    }

    // Getters y Setters
    public Long getIdAdministrador() {
        return idAdministrador;
    }

    public void setIdAdministrador(Long idAdministrador) {
        this.idAdministrador = idAdministrador;
    }

    public String getGestionarEstaciones() {
        return gestionarEstaciones;
    }

    public void setGestionarEstaciones(String gestionarEstaciones) {
        this.gestionarEstaciones = gestionarEstaciones;
    }

    public String getModerarComentarios() {
        return moderarComentarios;
    }

    public void setModerarComentarios(String moderarComentarios) {
        this.moderarComentarios = moderarComentarios;
    }

    public String getGenerarReportes() {
        return generarReportes;
    }

    public void setGenerarReportes(String generarReportes) {
        this.generarReportes = generarReportes;
    }
}
