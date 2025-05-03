import React, { useState, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';

function MissionDescription() {
  const [missions, setMissions] = useState([]);
  const [sortedColumn, setSortedColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/mission-description/')
      .then(response => response.json())
      .then(data => setMissions(data));
  }, []);

  const handleSort = (column) => {
    const direction = sortedColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortedColumn(column);
    setSortDirection(direction);
  };

  const sortedMissions = [...missions].sort((a, b) => {
    if (!sortedColumn) return 0;
    return sortDirection === 'asc'
      ? a[sortedColumn] > b[sortedColumn] ? 1 : -1
      : a[sortedColumn] < b[sortedColumn] ? 1 : -1;
  });

  return (
    <div>
      <div className="header">
        <h1 className="header-title">Mission Description</h1>
        <div>
        </div>
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
                  <td>{new Date(m.launch_date).toLocaleDateString()}</td>
                  <td>{m.orbit_type}</td>
                  <td>{m.altitude}</td>
                  <td>{m.inclination}</td>
                  <td>{m.status}</td>
                  <td>{m.mission_objectives}</td>
                  <td>{m.launchers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MissionDescription;