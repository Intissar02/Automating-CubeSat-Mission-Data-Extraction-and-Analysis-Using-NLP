import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function DataQuery() {
  const [missions, setMissions] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/mission-description/')
      .then(response => response.json())
      .then(data => setMissions(data));

    fetch('http://127.0.0.1:8000/api/missions-technology/')
      .then(response => response.json())
      .then(data => setTechnology(data));
  }, []);

  const countryOptions = [...new Set(missions.map(m => m.country))]
    .filter(Boolean)
    .map(country => ({ label: country, value: country }));

  const componentOptions = ['OBC', 'COM', 'ADCS', 'EPS', 'ANTENNA'].map(comp => ({
    label: comp,
    value: comp
  }));

  return (
    <div className="header">
      <h1 className="header-title">Data Query</h1>
      
      {/* Filter Controls */}
      <div className="filter-controls">
        <Select
          options={countryOptions}
          value={selectedCountry ? { label: selectedCountry, value: selectedCountry } : null}
          onChange={option => setSelectedCountry(option ? option.value : '')}
          placeholder="Filter by Country..."
          isClearable
        />
        <Select
          options={componentOptions}
          value={selectedComponent ? { label: selectedComponent, value: selectedComponent } : null}
          onChange={option => setSelectedComponent(option ? option.value : '')}
          placeholder="Filter by Component..."
          isClearable
        />
        <button className="btn btn-outline" onClick={() => { setSelectedCountry(''); setSelectedComponent(''); }}>
          Reset Filters
        </button>
      </div>

      {/* Table to display the filtered results */}
      <div className="card mt-4">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Mission Name</th>
                <th>Country</th>
                <th>Component</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {missions.flatMap(mission =>
                technology
                  .filter(t => t.mission_name === mission.mission_name)
                  .flatMap(t =>
                    ['obc', 'com', 'adcs', 'eps', 'antenna'].map(comp => {
                      const value = t[comp];
                      if (
                        (selectedCountry && mission.country !== selectedCountry) ||
                        (selectedComponent && selectedComponent.toLowerCase() !== comp)
                      ) return null;

                      return (
                        <tr key={`${mission.id}-${comp}`}>
                          <td>{mission.mission_name}</td>
                          <td>{mission.country}</td>
                          <td>{comp.toUpperCase()}</td>
                          <td>{value}</td>
                        </tr>
                      );
                    })
                  )
              ).filter(Boolean).length === 0 ? (
                <tr><td colSpan="4" className="text-center">No data found.</td></tr>
              ) : (
                missions.flatMap(mission =>
                  technology
                    .filter(t => t.mission_name === mission.mission_name)
                    .flatMap(t =>
                      ['obc', 'com', 'adcs', 'eps', 'antenna'].map(comp => {
                        const value = t[comp];
                        if (
                          (selectedCountry && mission.country !== selectedCountry) ||
                          (selectedComponent && selectedComponent.toLowerCase() !== comp)
                        ) return null;

                        return (
                          <tr key={`${mission.id}-${comp}`}>
                            <td>{mission.mission_name}</td>
                            <td>{mission.country}</td>
                            <td>{comp.toUpperCase()}</td>
                            <td>{value}</td>
                          </tr>
                        );
                      })
                    )
                ).filter(Boolean)
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DataQuery;
