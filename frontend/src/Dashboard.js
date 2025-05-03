import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown, FiCpu, FiHome, FiSettings, FiInfo, FiDatabase } from 'react-icons/fi';
import Select from 'react-select';
import ContactTab from './features/ContactTab'; // ✅ FIXED: corrected component name
import About from './features/About'; 
import DataQuery from './features/DataQuery'; // NEW: Import the DataQuery component

function Dashboard() {
  const [missions, setMissions] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('');
  const [sortedColumn, setSortedColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showGraphs, setShowGraphs] = useState(false);
  const [activeGraph, setActiveGraph] = useState(null);
  const [expandedGraph, setExpandedGraph] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/mission-description/')
      .then(response => response.json())
      .then(data => setMissions(data));

    fetch('http://127.0.0.1:8000/api/missions-technology/')
      .then(response => response.json())
      .then(data => setTechnology(data));
  }, []);

  const handleSort = (column) => {
    const direction = sortedColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortedColumn(column);
    setSortDirection(direction);
  };

  const getStatusBadge = status => {
    switch ((status || '').toLowerCase()) {
      case 'active': return <span className="status-badge status-active">Active</span>;
      case 'planned': return <span className="status-badge status-planned">Planned</span>;
      case 'completed': return <span className="status-badge status-inactive">Completed</span>;
      default: return <span className="status-badge status-inactive">Unknown</span>;
    }
  };

  const sortedMissions = [...missions].sort((a, b) => {
    if (!sortedColumn) return 0;
    return sortDirection === 'asc'
      ? a[sortedColumn] > b[sortedColumn] ? 1 : -1
      : a[sortedColumn] < b[sortedColumn] ? 1 : -1;
  });

  const countryOptions = [...new Set(missions.map(m => m.country))]
    .filter(Boolean)
    .map(country => ({ label: country, value: country }));

  const componentOptions = ['OBC', 'COM', 'ADCS', 'EPS', 'ANTENNA'].map(comp => ({
    label: comp,
    value: comp
  }));

  const handleShowGraphs = () => {
    setShowGraphs(!showGraphs);
    setActiveGraph(null); // Reset active graph when toggling visibility
  };

  const handleGraphClick = (graphNumber) => {
    setActiveGraph(activeGraph === graphNumber ? null : graphNumber);
  };

  return (
    <div className="dashboard-container">
      <button 
        className="mobile-menu-btn"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        style={{ display: window.innerWidth < 768 ? 'flex' : 'none' }}
      >
        {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      <div className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">🛰️</div>
          <h2 className="sidebar-title">CubeSat Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/home" className={`sidebar-item ${window.location.pathname === '/home' ? 'active' : ''}`}>
            <FiHome />
            <span>Dashboard</span>
          </Link>
          <Link to="/mission" className={`sidebar-item ${window.location.pathname === '/mission' ? 'active' : ''}`}>
            <FiInfo />
            <span>Mission Description</span>
          </Link>
          <Link to="/technology" className={`sidebar-item ${window.location.pathname === '/technology' ? 'active' : ''}`}>
            <FiCpu />
            <span>Missions Technology</span>
          </Link>
          <Link to="/data" className={`sidebar-item ${window.location.pathname === '/data' ? 'active' : ''}`}>
            <FiDatabase />
            <span>Mission Data</span>
          </Link>
          <Link to="/contact" className={`sidebar-item ${window.location.pathname === '/contact' ? 'active' : ''}`}>
            <FiSettings />
            <span>Contact Us</span>
          </Link>
          <Link to="/about" className={`sidebar-item ${window.location.pathname === '/about' ? 'active' : ''}`}>
            <FiInfo />
            <span>About</span>
          </Link>
        </nav>
      </div>

      <div className="main-content">
        <Routes>
          <Route path="/home" element={
            <>
              <div className="welcome-card" onClick={handleShowGraphs}>
                <h1 className="welcome-title">Welcome to CubeSat Missions Dashboard</h1>
                <p className="welcome-text">
                  This platform is your centralized database for CubeSat missions — crafted for researchers, professionals,
                  and astronomy enthusiasts. Explore detailed mission descriptions, cutting-edge technology data, and
                  component breakdowns all in one place.
                </p>
                <p className="welcome-highlight">🔭 Empowering space exploration through accessible data.</p>
              </div>

              {showGraphs && (
                <div className="graphs-vertical-container">
                  {[2, 3, 4].map((graphNumber) => (
                    <div 
                      key={`graph-${graphNumber}`}
                      className={`graph-container ${expandedGraph === graphNumber ? 'expanded' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedGraph(expandedGraph === graphNumber ? null : graphNumber);
                      }}
                    >
                      <img 
                        src={require(`./graphh${graphNumber}.png`)} 
                        alt={`Graph ${graphNumber}`} 
                        className="graph-image"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {expandedGraph && (
                <div 
                  className="graph-overlay"
                  onClick={() => setExpandedGraph(null)}
                />
              )}
            </>
          } />
          
          <Route path="/mission" element={
            <div>
              <div className="header">
                <h1 className="header-title">Mission Description</h1>
              </div>
              <div className="card">
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        {['Mission Name', 'Country', 'Organization', 'Type', 'Launch Date', 'Orbit Type', 'Altitude', 'Inclination', 'Status', 'Mission Objectives', 'Launchers'].map((col, index) => (
                          <th key={index} onClick={() => handleSort(col.toLowerCase().replace(' ', '_'))}>
                            {col} {sortedColumn === col.toLowerCase().replace(' ', '_') ? (sortDirection === 'asc' ? '↑' : '↓') : null}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sortedMissions.map(m => (
                        <tr key={m.id}>
                          <td>{m.mission_name}</td>
                          <td>{m.country}</td>
                          <td>{m.organization}</td>
                          <td>{m.type}</td>
                          <td>{m.launch_date}</td>
                          <td>{m.orbit_type}</td>
                          <td>{m.altitude}</td>
                          <td>{m.inclination}</td>
                          <td>{getStatusBadge(m.status)}</td>
                          <td>{m.mission_objectives}</td>
                          <td>{m.launchers}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          } />
          <Route path="/technology" element={
            <div>
              <div className="header">
                <h1 className="header-title">Missions Technology</h1>
              </div>
              <div className="card">
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Mission Name</th>
                        <th>Payload</th>
                        <th>Frequency Band</th>
                        <th>Data Rate</th>
                        <th>Communication Protocol</th>
                        <th>Modulation</th>
                        <th>OBC</th>
                        <th>COM</th>
                        <th>ADCS</th>
                        <th>EPS</th>
                        <th>Antenna</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {technology.map(tech => (
                        <tr key={tech.id}>
                          <td>{tech.mission_name}</td>
                          <td>{tech.payload}</td>
                          <td>{tech.frequency_band}</td>
                          <td>{tech.data_rate}</td>
                          <td>{tech.communication_protocol}</td>
                          <td>{tech.modulation}</td>
                          <td>{tech.obc}</td>
                          <td>{tech.com}</td>
                          <td>{tech.adcs}</td>
                          <td>{tech.eps}</td>
                          <td>{tech.antenna}</td>
                          <td>{tech.created_at}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          } />
          <Route path="/data" element={<DataQuery />} />
          <Route path="/contact" element={<ContactTab />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
