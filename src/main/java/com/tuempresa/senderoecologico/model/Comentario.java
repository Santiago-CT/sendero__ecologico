package com.tuempresa.senderoecologico.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "comentarios")
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idComentario;

    private String contenido;
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

    public Comentario() {
    }

    public Comentario(String contenido, Date fecha, Usuario usuario, Estacion estacion) {
        this.contenido = contenido;
        this.fecha = fecha;
        this.usuario = usuario;
        this.estacion = estacion;
    }

    // Getters y Setters
    public Long getIdComentario() {
        return idComentario;
    }

    public void setIdComentario(Long idComentario) {
        this.idComentario = idComentario;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
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
