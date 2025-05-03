import React, { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';

const purpleSelectTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#7e22ce',       // Dark purple for selected option
    primary25: '#a855f7',     // Light purple for option hover
    primary50: '#9333ea',     // Medium purple for option active
    neutral0: '#7e22ce',      // Dark purple background
    neutral5: '#2c2a3b',      // Slightly lighter purple
    neutral10: '#3a0ca3',     // Deep purple accent
    neutral20: '#a855f7',     // Border color
    neutral30: '#c084fc',     // Hover border
    neutral40: '#d8b4fe',     // Text color
    neutral50: '#e9d5ff',     // Placeholder
    neutral60: '#ffffff',     // Focused input text
    neutral70: '#ffffff',     // Hover text
    neutral80: '#ffffff',     // Single value text
    neutral90: '#ffffff',     // Multi-value label text
  },
});

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#1e1b2e',
    borderColor: '#a855f7',
    color: '#ffffff',
    minHeight: '40px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#7e22ce',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#ffffff',
  }),
  input: (provided) => ({
    ...provided,
    color: '#ffffff',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#1e1b2e',
    border: '1px solid #7e22ce',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? '#7e22ce' 
      : state.isFocused 
        ? '#9333ea' 
        : 'transparent',
    color: 'white',
    '&:active': {
      backgroundColor: '#c084fc',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#d8b4fe',
  }),
};

function DataQuery() {
  const [missions, setMissions] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedFrequencyBand, setSelectedFrequencyBand] = useState('');
  const [selectedAntenna, setSelectedAntenna] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    Promise.all([
      fetch('http://127.0.0.1:8000/api/mission-description/').then(res => res.json()),
      fetch('http://127.0.0.1:8000/api/missions-technology/').then(res => res.json())
    ])
    .then(([missionsData, technologyData]) => {
      setMissions(missionsData);
      setTechnology(technologyData);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setError('Failed to load mission data. Please try again later.');
      setLoading(false);
    });
  }, []);

  // Filter options
  const countryOptions = useMemo(() => {
    return [...new Set(missions.map(m => m.country))]
      .filter(Boolean)
      .map(country => ({ label: country, value: country }));
  }, [missions]);

  const statusOptions = useMemo(() => {
    return ['Active', 'Inactive', 'Mission concluded', 'Alive', 'Operational', 're-entered', 'Failed', 'Deseased'].map(status => ({
      label: status,
      value: status
    }));
  }, []);

  const frequencyBandOptions = useMemo(() => {
    return [...new Set(technology.map(t => t.frequency_band))]
      .filter(Boolean)
      .map(fb => ({ label: fb, value: fb }));
  }, [technology]);

  const antennaOptions = useMemo(() => {
    return [...new Set(technology.map(t => t.antenna))]
      .filter(Boolean)
      .map(antenna => ({ label: antenna, value: antenna }));
  }, [technology]);

  const componentOptions = useMemo(() => {
    return ['OBC', 'COM', 'ADCS', 'EPS', 'ANTENNA'].map(comp => ({
      label: comp,
      value: comp.toLowerCase()
    }));
  }, []);

  const filteredMissions = useMemo(() => {
    return missions.flatMap(mission =>
      technology
        .filter(t => t.mission_name === mission.mission_name)
        .filter(t => 
          (!selectedFrequencyBand || t.frequency_band === selectedFrequencyBand) &&
          (!selectedAntenna || t.antenna === selectedAntenna) &&
          (!selectedComponent ||
            (selectedComponent === 'obc' && t.obc) ||
            (selectedComponent === 'com' && t.com) ||
            (selectedComponent === 'adcs' && t.adcs) ||
            (selectedComponent === 'eps' && t.eps) ||
            (selectedComponent === 'antenna' && t.antenna)
          )
        )
        .filter(t => 
          (!selectedCountry || mission.country === selectedCountry) &&
          (!selectedStatus || mission.status === selectedStatus)
        )
        .map(t => ({
          mission_name: mission.mission_name,
          country: mission.country,
          status: mission.status,
          frequency_band: t.frequency_band,
          antenna: t.antenna,
          components: ['obc', 'com', 'adcs', 'eps', 'antenna']
            .filter(comp => !selectedComponent || comp === selectedComponent)
            .map(comp => ({
              component: comp.toUpperCase(),
              value: t[comp]
            }))
        }))
    ).filter(mission => mission.components.length > 0);
  }, [missions, technology, selectedCountry, selectedStatus,
    selectedFrequencyBand, selectedAntenna, selectedComponent]);

  const resetFilters = () => {
    setSelectedCountry('');
    setSelectedStatus('');
    setSelectedFrequencyBand('');
    setSelectedAntenna('');
    setSelectedComponent('');
  };

  return (
    <div style={{ 
      backgroundColor: '#1e1b2e', 
      color: 'white', 
      padding: '20px', 
      borderRadius: '8px',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        color: 'white', 
        marginBottom: '25px',
        fontSize: '24px',
        fontWeight: '600'
      }}>
        Mission Data Query
      </h1>

      {error && (
        <div style={{
          backgroundColor: '#f3e8ff',
          color: '#7e22ce',
          padding: '15px',
          borderRadius: '4px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{error}</span>
          <button 
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#7e22ce',
              color: 'white',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginLeft: '10px'
            }}
          >
            Retry
          </button>
        </div>
      )}

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        gap: '15px',
        marginBottom: '25px',
        padding: '15px',
        backgroundColor: '#2c2a3b',
        borderRadius: '6px'
      }}>
        {/* Country Filter */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <div style={{ 
            display: 'block', 
            marginBottom: '5px', 
            color: 'white',
            fontWeight: '500'
          }}>
            Country
          </div>
          <Select
            options={countryOptions}
            value={selectedCountry ? { label: selectedCountry, value: selectedCountry } : null}
            onChange={option => setSelectedCountry(option ? option.value : '')}
            placeholder="Select country..."
            isClearable
            theme={purpleSelectTheme}
            styles={customSelectStyles}
          />
        </div>

        {/* Status Filter */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <div style={{ 
            display: 'block', 
            marginBottom: '5px', 
            color: 'white',
            fontWeight: '500'
          }}>
            Status
          </div>
          <Select
            options={statusOptions}
            value={selectedStatus ? { label: selectedStatus, value: selectedStatus } : null}
            onChange={option => setSelectedStatus(option ? option.value : '')}
            placeholder="Select status..."
            isClearable
            theme={purpleSelectTheme}
            styles={customSelectStyles}
          />
        </div>

        {/* Frequency Band Filter */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <div style={{ 
            display: 'block', 
            marginBottom: '5px', 
            color: 'white',
            fontWeight: '500'
          }}>
            Frequency Band
          </div>
          <Select
            options={frequencyBandOptions}
            value={selectedFrequencyBand ? { label: selectedFrequencyBand, value: selectedFrequencyBand } : null}
            onChange={option => setSelectedFrequencyBand(option ? option.value : '')}
            placeholder="Select band..."
            isClearable
            theme={purpleSelectTheme}
            styles={customSelectStyles}
          />
        </div>

        {/* Antenna Filter */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <div style={{ 
            display: 'block', 
            marginBottom: '5px', 
            color: 'white',
            fontWeight: '500'
          }}>
            Antenna
          </div>
          <Select
            options={antennaOptions}
            value={selectedAntenna ? { label: selectedAntenna, value: selectedAntenna } : null}
            onChange={option => setSelectedAntenna(option ? option.value : '')}
            placeholder="Select antenna..."
            isClearable
            theme={purpleSelectTheme}
            styles={customSelectStyles}
          />
        </div>

        {/* Component Filter */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <div style={{ 
            display: 'block', 
            marginBottom: '5px', 
            color: 'white',
            fontWeight: '500'
          }}>
            Component
          </div>
          <Select
            options={componentOptions}
            value={selectedComponent ? {
              label: selectedComponent.toUpperCase(),
              value: selectedComponent
            } : null}
            onChange={option => setSelectedComponent(option ? option.value : '')}
            placeholder="Select component..."
            isClearable
            theme={purpleSelectTheme}
            styles={customSelectStyles}
          />
        </div>

        <div style={{ 
          flex: '0 0 auto', 
          alignSelf: 'flex-end',
          marginBottom: '5px'
        }}>
          <button
            onClick={resetFilters}
            style={{
              backgroundColor: '#e9d5ff',
              color: '#1e1b2e',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              height: '40px',
              whiteSpace: 'nowrap'
            }}
          >
            Reset All Filters
          </button>
        </div>
      </div>

      {loading && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          color: 'white'
        }}>
          <div style={{
            border: '4px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            borderTop: '4px solid #a855f7',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite',
            marginBottom: '10px'
          }}></div>
          <p>Loading mission data...</p>
        </div>
      )}

      <div style={{ 
        backgroundColor: '#2c2a3b',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%',
            borderCollapse: 'collapse',
            color: 'white'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#3a0ca3' }}>
                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Mission Name</th>
                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Country</th>
                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Frequency Band</th>
                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Antenna</th>
                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Component</th>
                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {filteredMissions.length === 0 && !loading ? (
                <tr>
                  <td colSpan="7" style={{ 
                    padding: '20px', 
                    textAlign: 'center',
                    backgroundColor: '#2c2a3b'
                  }}>
                    No missions match your filters.
                  </td>
                </tr>
              ) : (
                filteredMissions.map((mission, index) => (
                  <React.Fragment key={index}>
                    {mission.components.map((comp, idx) => (
                      <tr 
                        key={`${index}-${idx}`}
                        style={{ 
                          backgroundColor: idx % 2 ? '#2c2a3b' : '#3a0ca3',
                          borderBottom: '1px solid #a855f7'
                        }}
                      >
                        {idx === 0 && (
                          <>
                            <td 
                              rowSpan={mission.components.length}
                              style={{ padding: '12px 15px', verticalAlign: 'top' }}
                            >
                              {mission.mission_name}
                            </td>
                            <td 
                              rowSpan={mission.components.length}
                              style={{ padding: '12px 15px', verticalAlign: 'top' }}
                            >
                              {mission.country}
                            </td>
                            <td 
                              rowSpan={mission.components.length}
                              style={{ padding: '12px 15px', verticalAlign: 'top' }}
                            >
                              {mission.status}
                            </td>
                            <td 
                              rowSpan={mission.components.length}
                              style={{ padding: '12px 15px', verticalAlign: 'top' }}
                            >
                              {mission.frequency_band}
                            </td>
                            <td 
                              rowSpan={mission.components.length}
                              style={{ padding: '12px 15px', verticalAlign: 'top' }}
                            >
                              {mission.antenna}
                            </td>
                          </>
                        )}
                        <td style={{ padding: '12px 15px' }}>{comp.component}</td>
                        <td style={{ padding: '12px 15px' }}>{comp.value || 'N/A'}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default DataQuery;