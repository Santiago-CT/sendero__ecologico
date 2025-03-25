// src/components/Pages/ReportsDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReportsDashboard.css';

function ReportsDashboard() {
  // Ejemplo de estados para distintas métricas o datos
  const [chartData, setChartData] = useState([]);
  const [funnelData, setFunnelData] = useState([]);
  const [pipelineData, setPipelineData] = useState([]);
  const [selectedReport, setSelectedReport] = useState('default');

  // KPIs de ejemplo
  const [kpiMonthlyGoal, setKpiMonthlyGoal] = useState('6.2M');
  const [kpiConversion, setKpiConversion] = useState('27%');
  const [kpiWonDealsValue, setKpiWonDealsValue] = useState('8,100');

  useEffect(() => {
    // Llamadas a la API para cargar datos
    // Ajusta las URLs a tu backend real
    axios.get('http://localhost:4000/api/reports/salesByRep')
      .then(response => {
        setChartData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener salesByRep:', error);
      });

    axios.get('http://localhost:4000/api/reports/funnel')
      .then(response => {
        setFunnelData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener funnel:', error);
      });

    axios.get('http://localhost:4000/api/reports/pipeline')
      .then(response => {
        setPipelineData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener pipeline:', error);
      });

    // Podrías setear KPIs desde la API también
    // e.g. setKpiMonthlyGoal(...) etc.
  }, []);

  // Maneja el cambio del combo de reportes
  const handleReportChange = (e) => {
    setSelectedReport(e.target.value);
    // Podrías disparar otra llamada a la API según el reporte
  };

  const handleGenerateReport = () => {
    // Lógica para generar o descargar el reporte seleccionado
    if (selectedReport === 'default') {
      alert('Selecciona un reporte');
      return;
    }
    alert(`Generando reporte: ${selectedReport}`);
  };

  return (
    <div className="reports-dashboard-container">
      <h2 className="reports-title">Generación de Reportes</h2>

      {/* Sección de KPIs */}
      <div className="kpi-cards">
        <div className="kpi-card">
          <h3>Monthly Goal</h3>
          <p>{kpiMonthlyGoal}</p>
        </div>
        <div className="kpi-card">
          <h3>Conversion</h3>
          <p>{kpiConversion}</p>
        </div>
        <div className="kpi-card">
          <h3>Value of Won Deals</h3>
          <p>{kpiWonDealsValue}</p>
        </div>
      </div>

      {/* Sección de Gráficas (Placeholder) */}
      <div className="charts-section">
        <div className="chart-box">
          <h4>Sales by Rep</h4>
          <div className="chart-placeholder">
            (Bar Chart Placeholder)
          </div>
        </div>
        <div className="chart-box">
          <h4>Funnel Chart</h4>
          <div className="chart-placeholder">
            (Funnel Chart Placeholder)
          </div>
          <p>Conversion: {kpiConversion}</p>
        </div>
      </div>

      {/* Pipeline y combo de reportes */}
      <div className="pipeline-section">
        <div className="pipeline-box">
          <h4>Sales Pipeline</h4>
          <div className="pipeline-placeholder">
            (Pipeline Data Table)
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

      {/* Ejemplo de tabla de resultados */}
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
            <tr>
              <td>18</td>
              <td>John Doe</td>
              <td>4.2</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>56</td>
              <td>Alvin Kamora</td>
              <td>7.8</td>
              <td>Inactive</td>
            </tr>
            <tr>
              <td>99</td>
              <td>Malcom Brown</td>
              <td>4.5</td>
              <td>Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportsDashboard;
