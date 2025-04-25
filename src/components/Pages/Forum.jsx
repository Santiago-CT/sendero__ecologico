import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Forum.css';
import CreateThread from './CreateThread.jsx';
import ForumThread from './ForumThread.jsx';
import ForumService from './forumServices.jsx';
import AuthService from './authServices.jsx'; // Asumiendo que tienes un servicio de autenticación

const Forum = () => {
  const [threads, setThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  // Obtener el usuario actual (si está autenticado)
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await AuthService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error al obtener usuario actual:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  // Cargar hilos del foro
  useEffect(() => {
    const fetchThreads = async () => {
      try {
        setIsLoading(true);
        const threadsData = await ForumService.getAllThreads();
        setThreads(threadsData);
        setError(null);
      } catch (err) {
        setError('Hubo un problema al cargar los hilos del foro. Por favor, intenta de nuevo más tarde.');
        console.error('Error al cargar hilos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThreads();
  }, []);

  const handleCreateThread = async (newThread) => {
    if (!currentUser) {
      // Redirigir al usuario a iniciar sesión si no está autenticado
      navigate('/login', { state: { from: '/foro' } });
      return;
    }

    try {
      setIsLoading(true);
      // Crear el hilo en la base de datos
      await ForumService.createThread(
        newThread.title,
        newThread.content,
        currentUser.id
      );
      
      // Recargar hilos para mostrar el recién creado
      const updatedThreads = await ForumService.getAllThreads();
      setThreads(updatedThreads);
      setShowCreateForm(false);
      setError(null);
    } catch (err) {
      setError('Hubo un problema al crear el hilo. Por favor, intenta de nuevo.');
      console.error('Error al crear hilo:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = async (threadId, replyContent) => {
    if (!currentUser) {
      // Redirigir al usuario a iniciar sesión si no está autenticado
      navigate('/login', { state: { from: '/foro' } });
      return;
    }

    try {
      setIsLoading(true);
      // Crear la respuesta en la base de datos
      await ForumService.createReply(
        threadId,
        replyContent,
        currentUser.id
      );
      
      // Recargar hilos para mostrar la respuesta recién creada
      const updatedThreads = await ForumService.getAllThreads();
      setThreads(updatedThreads);
      setError(null);
    } catch (err) {
      setError('Hubo un problema al publicar tu respuesta. Por favor, intenta de nuevo.');
      console.error('Error al crear respuesta:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="forumContainer">
      <section className="forumHeader">
        <div className="forumHeaderContent">
          <h1>Foro de Discusión</h1>
          <p>Comparte experiencias, formula preguntas y debate sobre la conservación del sendero ecológico</p>
        </div>
      </section>

      {error && (
        <div className="errorMessage">
          <p>{error}</p>
        </div>
      )}

      <section className="forumActions">
        <button 
          className="createThreadButton"
          onClick={() => {
            if (!currentUser) {
              navigate('/login', { state: { from: '/foro' } });
            } else {
              setShowCreateForm(!showCreateForm);
            }
          }}
        >
          {showCreateForm ? 'Cancelar' : 'Crear Nuevo Tema'}
        </button>
      </section>

      {showCreateForm && (
        <section className="createThreadSection">
          <CreateThread 
            onSubmit={handleCreateThread} 
            onCancel={() => setShowCreateForm(false)} 
            currentUser={currentUser}
          />
        </section>
      )}

      <section className="threadsContainer">
        {isLoading ? (
          <div className="loadingIndicator">
            <p>Cargando...</p>
          </div>
        ) : (
          threads.length > 0 ? (
            threads.map((thread) => (
              <ForumThread 
                key={thread.id} 
                thread={thread} 
                onReply={handleReply}
                currentUser={currentUser}
              />
            ))
          ) : (
            <div className="noThreads">
              <p>No hay temas de discusión todavía. ¡Sé el primero en crear uno!</p>
            </div>
          )
        )}
      </section>

      <section className="forumFooter">
        <div className="forumFooterContent">
          <p>Recuerda mantener un tono respetuoso en todas las discusiones.</p>
          <Link to="/" className="backToHomeLink">Volver a Inicio</Link>
        </div>
      </section>
    </main>
  );
};

export default Forum;