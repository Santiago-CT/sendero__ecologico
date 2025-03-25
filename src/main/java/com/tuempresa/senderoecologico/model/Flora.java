package com.tuempresa.senderoecologico.model;

import javax.persistence.*;

@Entity
@Table(name = "flora")
public class Flora {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idFlora;

    private String nombre;
    private String descripcion;

    // Relación con Estación
    @ManyToOne
    @JoinColumn(name = "idEstacion")
    private Estacion estacion;

    public Flora() {
    }

    public Flora(String nombre, String descripcion, Estacion estacion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estacion = estacion;
    }

    // Getters y Setters
    public Long getIdFlora() {
        return idFlora;
    }

    public void setIdFlora(Long idFlora) {
        this.idFlora = idFlora;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Estacion getEstacion() {
        return estacion;
    }

    public void setEstacion(Estacion estacion) {
        this.estacion = estacion;
    }
}
