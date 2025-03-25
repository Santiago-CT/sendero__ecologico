package com.tuempresa.senderoecologico.model;

import javax.persistence.*;

@Entity
@Table(name = "archivos_multimedia")
public class ArchivoMultimedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idArchivo;

    private String ruta;
    private String tipo;
    private String descripcion;

    // Relación opcional: si se adjunta a Observacion, Comentario, etc.
    // Podrías usar ManyToOne o una tabla intermedia. Ejemplo:
    @ManyToOne
    @JoinColumn(name = "idObservacion", nullable = true)
    private Observacion observacion;

    public ArchivoMultimedia() {
    }

    public ArchivoMultimedia(String ruta, String tipo, String descripcion) {
        this.ruta = ruta;
        this.tipo = tipo;
        this.descripcion = descripcion;
    }

    public Long getIdArchivo() {
        return idArchivo;
    }

    public void setIdArchivo(Long idArchivo) {
        this.idArchivo = idArchivo;
    }

    public String getRuta() {
        return ruta;
    }

    public void setRuta(String ruta) {
        this.ruta = ruta;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Observacion getObservacion() {
        return observacion;
    }

    public void setObservacion(Observacion observacion) {
        this.observacion = observacion;
    }
}
