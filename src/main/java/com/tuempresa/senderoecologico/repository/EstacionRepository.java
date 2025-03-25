package com.tuempresa.senderoecologico.repository;

import com.tuempresa.senderoecologico.model.Estacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstacionRepository extends JpaRepository<Estacion, Long> {
    // Aquí puedes definir consultas personalizadas si es necesario
}
