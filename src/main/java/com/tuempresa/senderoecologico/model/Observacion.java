package com.tuempresa.senderoecologico.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "observaciones")
public class Observacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idObservacion;

    private String descripcion;

    @Temporal(TemporalType.TIMESTAMP)
    private Date fecha;

    // Relación con Usuario
    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    // Relación con Estación
    @ManyToOne
    @JoinColumn(name = "idEstacion")
    private Estacion estacion;

    public Observacion() {
    }

    public Observacion(String descripcion, Date fecha, Usuario usuario, Estacion estacion) {
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.usuario = usuario;
        this.estacion = estacion;
    }

    // Getters y Setters
    public Long getIdObservacion() {
        return idObservacion;
    }

    public void setIdObservacion(Long idObservacion) {
        this.idObservacion = idObservacion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Estacion getEstacion() {
        return estacion;
    }

    public void setEstacion(Estacion estacion) {
        this.estacion = estacion;
    }
}
