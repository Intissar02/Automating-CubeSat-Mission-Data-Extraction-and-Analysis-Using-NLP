import React, { useState, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';

function MissionsTechnology() {
  const [technology, setTechnology] = useState([]);

  // Define the priority frequency bands
  const priorityBands = ['UHF', 'VHF', 'S-Band', 'L-Band', '2.4 GHz', '400.0375 MHz'];

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/missions-technology/')
      .then(response => response.json())
      .then(data => {
        // Sort the data: priority bands first, then the rest
        const sortedData = data.sort((a, b) => {
          const aPriority = priorityBands.includes(a.frequency_band);
          const bPriority = priorityBands.includes(b.frequency_band);

          // If both or neither are priority bands, sort alphabetically
          if (aPriority === bPriority) {
            if (a.frequency_band < b.frequency_band) return -1;
            if (a.frequency_band > b.frequency_band) return 1;
            return 0;
          }

          // If one is a priority band, it should come first
          return aPriority ? -1 : 1;
        });
        setTechnology(sortedData);
      });
  }, []);

  return (
    <div>
      <div className="header">
        <h1 className="header-title">Missions Technology</h1>
        <div>

        </div>
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
  );
}

export default MissionsTechnology;
