// src/components/Pages/Auth.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const Auth = () => {
  const navigate = useNavigate();

  // Estado para controlar si el usuario está en modo "Registro" o "Login"
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Estados para datos de formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  // Maneja el cambio entre Registro y Login
  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    // Limpiar campos cuando se cambia de modo (opcional)
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPass('');
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegisterMode) {
        // Validaciones básicas
        if (password !== confirmPass) {
          alert('Las contraseñas no coinciden');
          return;
        }
        // Llamar al servicio de registro
        const userData = { name, email, password };
        await authService.register(userData);
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        setIsRegisterMode(false);
      } else {
        // Llamar al servicio de login
        const credentials = { email, password };
        const data = await authService.login(credentials);
        // Supongamos que guardamos un token o algo similar
        localStorage.setItem('token', data.token);
        alert('Inicio de sesión exitoso.');
        navigate('/'); // Redirigir a la página de inicio o estación
      }
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error en el proceso.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>{isRegisterMode ? 'Registro de Usuario' : 'Iniciar Sesión'}</h2>
      
      {/* Botón para cambiar de modo */}
      <button style={styles.toggleButton} onClick={toggleMode}>
        {isRegisterMode ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate'}
      </button>

      <form onSubmit={handleSubmit} style={styles.form}>
        {isRegisterMode && (
          <div style={styles.formGroup}>
            <label>Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div style={styles.formGroup}>
          <label>Correo:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {isRegisterMode && (
          <div style={styles.formGroup}>
            <label>Confirmar Contraseña:</label>
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />
          </div>
        )}

        <button style={styles.submitButton} type="submit">
          {isRegisterMode ? 'Registrarse' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
};

// Estilos en línea para ilustrar (puedes moverlos a un archivo CSS)
const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '20px'
  },
  toggleButton: {
    marginBottom: '20px',
    padding: '8px 12px',
    background: '#444',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  submitButton: {
    padding: '10px',
    background: '#333',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  }
};

export default Auth;
