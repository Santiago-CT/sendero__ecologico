import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FAQPage.css';

const FAQPage = () => {
  // Estado para manejar las FAQs y su carga
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOffline, setIsOffline] = useState(false);
  
  // Estado para controlar qué pregunta está activa en el acordeón
  const [activeQuestion, setActiveQuestion] = useState(null);

  // Simulación de carga de datos FAQ
  useEffect(() => {
    const fetchFAQs = async () => {
      setIsLoading(true);
      try {
        // Comprobar si hay conexión
        if (!navigator.onLine) {
          setIsOffline(true);
          // Intentar recuperar de caché local
          const cachedFaqs = localStorage.getItem('cachedFaqs');
          if (cachedFaqs) {
            setFaqs(JSON.parse(cachedFaqs));
          } else {
            throw new Error("Sin conexión y sin datos en caché");
          }
        } else {
          // En un caso real, aquí se haría fetch a una API
          // Simulamos una carga de datos con un timeout
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Datos simulados de FAQ
          const faqData = [
            {
              category: "Horarios y Visitas",
              questions: [
                {
                  id: 1,
                  question: "¿Cuál es el horario de apertura del sendero?",
                  answer: "El sendero está abierto todos los días de 8:00 AM a 5:00 PM. Los últimos ingresos se permiten hasta las 3:30 PM para asegurar que todos los visitantes puedan completar el recorrido."
                },
                {
                  id: 2,
                  question: "¿Se necesita reservación para visitar?",
                  answer: "No es obligatoria la reservación para grupos pequeños (menos de 5 personas), pero para grupos más grandes se recomienda hacer una reserva con al menos 2 días de anticipación."
                }
              ]
            },
            {
              category: "Flora y Fauna",
              questions: [
                {
                  id: 3,
                  question: "¿Qué especies de plantas puedo encontrar en el sendero?",
                  answer: "El sendero alberga más de 150 especies de plantas nativas, incluyendo varios tipos de bambú, helechos, orquídeas y árboles autóctonos de la región."
                },
                {
                  id: 4,
                  question: "¿Es posible ver animales durante el recorrido?",
                  answer: "Sí, el sendero es hogar de diversas especies animales como aves, pequeños mamíferos y reptiles. La rata del bambú se puede observar frecuentemente alrededor de la Estación 5."
                }
              ]
            },
            {
              category: "Equipamiento y Preparación",
              questions: [
                {
                  id: 5,
                  question: "¿Qué debo llevar para visitar el sendero?",
                  answer: "Recomendamos calzado cómodo para caminar, protector solar, repelente de insectos, agua suficiente y una cámara para capturar la experiencia. También es aconsejable llevar impermeable en temporada de lluvias."
                },
                {
                  id: 6,
                  question: "¿Hay baños disponibles en el recorrido?",
                  answer: "Sí, hay instalaciones sanitarias disponibles al inicio del sendero y cerca de la Estación 5. Todas cuentan con agua potable y están acondicionadas para personas con movilidad reducida."
                }
              ]
            }
          ];
          
          setFaqs(faqData);
          
          // Guardar en caché local para uso offline
          localStorage.setItem('cachedFaqs', JSON.stringify(faqData));
        }
      } catch (err) {
        setError(err.message || "No se pudo cargar las Preguntas Frecuentes. Por favor inténtalo más tarde");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFAQs();
    
    // Detectar cambios en la conexión
    const handleOnlineStatus = () => setIsOffline(!navigator.onLine);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);
  
  // Función para manejar el clic en las preguntas
  const toggleQuestion = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="faqPageContainer">
      <header className="faqHeader">
        <Link to="/" className="backLink">← Volver al inicio</Link>
        <h1 className="faqPageTitle">Preguntas Frecuentes</h1>
      </header>

      <main className="faqPageMain">
        {isLoading ? (
          <div className="loadingContainer">
            <p>Cargando preguntas frecuentes...</p>
          </div>
        ) : error ? (
          <div className="errorContainer">
            <p>{error}</p>
          </div>
        ) : (
          <>
            {isOffline && (
              <div className="offlineAlert">
                <p>Contenido en modo offline</p>
              </div>
            )}
            
            <div className="faqContainer">
              {faqs.map((category) => (
                <div key={category.category} className="faqCategory">
                  <h2 className="categoryTitle">{category.category}</h2>
                  
                  <div className="faqQuestions">
                    {category.questions.map((item) => (
                      <div key={item.id} className="faqItem">
                        <div 
                          className={`faqQuestion ${activeQuestion === item.id ? 'active' : ''}`}
                          onClick={() => toggleQuestion(item.id)}
                        >
                          <h3>{item.question}</h3>
                          <span className="faqToggle">{activeQuestion === item.id ? '−' : '+'}</span>
                        </div>
                        
                        {activeQuestion === item.id && (
                          <div className="faqAnswer">
                            <p>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="faqFooter">
        <p>© 2025 Universidad de los Llanos – Campus Barcelona</p>
        <p>
          <Link to="/admin">Admin</Link> |
          <Link to="/privacy">Política de Privacidad</Link> |
          <Link to="/terms">Términos y Condiciones</Link> |
          <Link to="/accessibility">Accesibilidad</Link>
        </p>
      </footer>
    </div>
  );
};

export default FAQPage;