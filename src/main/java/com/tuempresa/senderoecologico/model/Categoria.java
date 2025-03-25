package com.tuempresa.senderoecologico.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "categorias")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategoria;

    private String nombre;

    // Ejemplo: Relación con Estacion, Flora, Fauna
    // Si "Categoria" clasifica Estaciones, Flora y Fauna, podrías usar muchas relaciones ManyToMany
    // O definir 3 listas si la lógica lo requiere.

    public Categoria() {
    }

    public Categoria(String nombre) {
        this.nombre = nombre;
    }

    public Long getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Long idCategoria) {
        this.idCategoria = idCategoria;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
