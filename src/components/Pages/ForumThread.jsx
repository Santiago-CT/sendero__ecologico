import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForumThread = ({ thread, onReply, currentUser }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    
    // Validar si el usuario está autenticado
    if (!currentUser) {
      navigate('/login', { state: { from: '/foro' } });
      return;
    }
    
    // Validar longitud del mensaje
    if (replyContent.trim().length === 0) {
      setError('El mensaje no puede estar vacío.');
      return;
    }
    
    if (replyContent.length > 500) {
      setError('Tu mensaje excede el límite de caracteres. Reduce tu texto e inténtalo de nuevo.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      // Enviar respuesta a la base de datos
      await onReply(thread.id, replyContent);
      
      // Resetear estado
      setReplyContent('');
      setIsReplying(false);
      setError('');
    } catch (err) {
      setError('Hubo un problema al publicar tu respuesta. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelReply = () => {
    setReplyContent('');
    setIsReplying(false);
    setError('');
  };

  return (
    <div className="threadCard">
      <div className="threadHeader">
        <h2 className="threadTitle">{thread.title}</h2>
        <div className="threadMeta">
          <span>Por: {thread.author}</span>
          <span>Fecha: {thread.date}</span>
        </div>
      </div>
      
      <div className="threadContent">
        <p>{thread.content}</p>
      </div>
      
      <div className="threadReplies">
        {thread.replies && thread.replies.length > 0 && (
          <>
            <h3 className="replyHeader">Respuestas ({thread.replies.length})</h3>
            {thread.replies.map((reply) => (
              <div key={reply.id} className="replyItem">
                <div className="replyMeta">
                  <span>Por: {reply.author}</span>
                  <span>Fecha: {reply.date}</span>
                </div>
                <div className="replyContent">
                  <p>{reply.content}</p>
                </div>
              </div>
            ))}
          </>
        )}
        
        {!isReplying ? (
          <div className="replyActions" style={{ padding: '15px 20px' }}>
            <button 
              className="submitReplyButton"
              onClick={() => {
                if (!currentUser) {
                  navigate('/login', { state: { from: '/foro' } });
                } else {
                  setIsReplying(true);
                }
              }}
            >
              Responder
            </button>
          </div>
        ) : (
          <div className="replyForm">
            <form onSubmit={handleReplySubmit}>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Escribe tu respuesta aquí (máximo 500 caracteres)"
                maxLength="500"
                disabled={isSubmitting}
              />
              
              <div className={`characterCounter ${replyContent.length > 500 ? 'error' : ''}`}>
                {replyContent.length}/500 caracteres
              </div>
              
              {error && <div className="formError">{error}</div>}
              
              <div className="replyFormActions">
                <button 
                  type="button" 
                  className="cancelReplyButton"
                  onClick={cancelReply}
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="submitReplyButton"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Publicando...' : 'Publicar Respuesta'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumThread;