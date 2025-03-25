package com.tuempresa.senderoecologico.service;

import com.tuempresa.senderoecologico.model.Estacion;
import com.tuempresa.senderoecologico.repository.EstacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EstacionService {

    @Autowired
    private EstacionRepository estacionRepository;

    public List<Estacion> obtenerTodasLasEstaciones() {
        return estacionRepository.findAll();
    }
}
