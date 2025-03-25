import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Comments.css';

const Comments = () => {
  // Simulación de estado de autenticación
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Estado para la lista de comentarios
  const [comments, setComments] = useState([]);

  // Estado para el contenido del nuevo comentario
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Llamada a endpoint para obtener comentarios
    axios.get('http://localhost:4000/api/comments')
      .then(response => {
        setComments(response.data); // Ajusta según tu JSON real
      })
      .catch(error => {
        console.error('Error al obtener comentarios:', error);
      });

    // Chequear si el usuario está logueado (puedes usar localStorage o un context)
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Llamada POST para guardar el nuevo comentario
    axios.post('http://localhost:4000/api/comments', {
      contenido: newComment
    })
      .then(response => {
        setComments([...comments, response.data]);
        setNewComment('');
      })
      .catch(error => {
        console.error('Error al publicar comentario:', error);
      });
  };

  return (
    <div className="comments-container">
      <div className="comments-main">
        <h2 className="comments-title">Comentarios</h2>

        {isLoggedIn ? (
          <form onSubmit={handleSubmit} className="comment-form">
            <textarea
              className="comment-textarea"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe tu comentario..."
              required
            />
            <button type="submit" className="comment-button">
              Publicar
            </button>
          </form>
        ) : (
          <div className="login-warning">
            <p>
              Necesitas <a href="/login">iniciar sesión</a> para comentar.
            </p>
          </div>
        )}

        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.idComentario} className="comment-item">
              <div className="comment-avatar">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Avatar Usuario"
                  className="avatar-img"
                />
              </div>
              <div className="comment-content-wrapper">
                <div className="comment-header">
                  <span className="comment-username">
                    {comment.usuario?.nombre || 'Usuario Anónimo'}
                  </span>
                  <span className="comment-date">
                    {comment.fecha ? new Date(comment.fecha).toLocaleString() : ''}
                  </span>
                </div>
                <p className="comment-text">{comment.contenido}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar enfocado en la sección de comentarios */}
      <aside className="comments-sidebar">
        <h3 className="sidebar-title">Comentarios Destacados</h3>
        <ul className="sidebar-list">
          <li>Últimos Comentarios</li>
          <li>Comentarios Populares</li>
          <li>Temas Recurrentes</li>
        </ul>

        <h3 className="sidebar-title">Tendencias en Comentarios</h3>
        <ul className="sidebar-list">
          <li>Feedback positivo</li>
          <li>Feedback constructivo</li>
          <li>Más comentados</li>
        </ul>
      </aside>
    </div>
  );
};

export default Comments;
