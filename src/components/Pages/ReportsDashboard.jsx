// src/components/Pages/ReportsDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReportsDashboard.css';

const ReportsDashboard = () => {
  const [salesByRep, setSalesByRep] = useState([]);
  const [funnelData, setFunnelData] = useState([]);
  const [pipelineData, setPipelineData] = useState([]);
  const [selectedReport, setSelectedReport] = useState('default');

  // KPIs (estos podrían provenir de tu backend o calcularse a partir de los datos)
  const [kpiMonthlyGoal, setKpiMonthlyGoal] = useState(null);
  const [kpiConversion, setKpiConversion] = useState(null);
  const [kpiWonDealsValue, setKpiWonDealsValue] = useState(null);

  useEffect(() => {
    // Cargar ventas por representante
    axios.get('http://localhost:4000/api/reports/salesByRep')
      .then(response => setSalesByRep(response.data))
      .catch(error => console.error('Error al obtener salesByRep:', error));

    // Cargar datos del funnel
    axios.get('http://localhost:4000/api/reports/funnel')
      .then(response => setFunnelData(response.data))
      .catch(error => console.error('Error al obtener funnel:', error));

    // Cargar datos del pipeline
    axios.get('http://localhost:4000/api/reports/pipeline')
      .then(response => setPipelineData(response.data))
      .catch(error => console.error('Error al obtener pipeline:', error));

    // Opcional: cargar KPIs desde el backend
    axios.get('http://localhost:4000/api/reports/kpis')
      .then(response => {
        const { monthlyGoal, conversion, wonDealsValue } = response.data;
        setKpiMonthlyGoal(monthlyGoal);
        setKpiConversion(conversion);
        setKpiWonDealsValue(wonDealsValue);
      })
      .catch(error => console.error('Error al obtener KPIs:', error));
  }, []);

  const handleReportChange = (e) => {
    setSelectedReport(e.target.value);
    // Puedes disparar una nueva llamada a la API según el reporte seleccionado
  };

  const handleGenerateReport = () => {
    if (selectedReport === 'default') {
      alert('Selecciona un reporte');
      return;
    }
    // Lógica para generar o descargar el reporte
    alert(`Generando reporte: ${selectedReport}`);
  };

  return (
    <div className="reports-dashboard-container">
      <h2 className="reports-title">Generación de Reportes</h2>

      {/* KPIs */}
      <div className="kpi-cards">
        <div className="kpi-card">
          <h3>Monthly Goal</h3>
          <p>{kpiMonthlyGoal || 'Cargando...'}</p>
        </div>
        <div className="kpi-card">
          <h3>Conversion</h3>
          <p>{kpiConversion || 'Cargando...'}</p>
        </div>
        <div className="kpi-card">
          <h3>Value of Won Deals</h3>
          <p>{kpiWonDealsValue || 'Cargando...'}</p>
        </div>
      </div>

      {/* Gráficas */}
      <div className="charts-section">
        <div className="chart-box">
          <h4>Sales by Rep</h4>
          <div className="chart-placeholder">
            {/* Aquí integrarías la gráfica, por ejemplo con Chart.js */}
            (Gráfica de barras)
          </div>
        </div>
        <div className="chart-box">
          <h4>Funnel Chart</h4>
          <div className="chart-placeholder">
            (Gráfica de embudo)
          </div>
        </div>
      </div>

      {/* Pipeline y selección de reportes */}
      <div className="pipeline-section">
        <div className="pipeline-box">
          <h4>Sales Pipeline</h4>
          <div className="pipeline-placeholder">
            (Tabla de datos del pipeline)
          </div>
        </div>
        <div className="combo-box-section">
          <h4>Generación de reportes</h4>
          <select value={selectedReport} onChange={handleReportChange}>
            <option value="default">Selecciona un reporte</option>
            <option value="reportA">Reporte A</option>
            <option value="reportB">Reporte B</option>
          </select>
          <button className="combo-button" onClick={handleGenerateReport}>
            Generar
          </button>
        </div>
      </div>

      {/* Tabla de resultados */}
      <div className="data-table-section">
        <h4>Resultados del Reporte</h4>
        <table className="report-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Valor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pipelineData.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.valor}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsDashboard;
