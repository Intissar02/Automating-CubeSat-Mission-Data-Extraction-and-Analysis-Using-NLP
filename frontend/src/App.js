import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [missions, setMissions] = useState([]);
    const [technology, setTechnology] = useState([]);
    const [isMissionExpanded, setIsMissionExpanded] = useState(false);
    const [isTechnologyExpanded, setIsTechnologyExpanded] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(250); // State to control sidebar width

    useEffect(() => {
        // Fetching MissionDescription data
        fetch('http://127.0.0.1:8000/api/mission-description/')
            .then(response => response.json())
            .then(data => setMissions(data));

        // Fetch MissionsTechnology data
        fetch('http://127.0.0.1:8000/api/missions-technology/')
            .then(response => response.json())
            .then(data => setTechnology(data));
    }, []);

    const handleMouseMove = (event) => {
        const newWidth = event.clientX;
        if (newWidth > 150 && newWidth < 500) {
            setSidebarWidth(newWidth); // Restrict the width between 150px and 500px
        }
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = (event) => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className="dashboard-container">
            <div
                className="sidebar"
                style={{ width: sidebarWidth }}
            >
                <h2 className="sidebar-title">CubeSat Missions Dashboard</h2>
                <ul>
                    <li
                        className="sidebar-item"
                        onClick={() => setIsMissionExpanded(!isMissionExpanded)}
                    >
                        Mission Description
                    </li>
                    <li
                        className="sidebar-item"
                        onClick={() => setIsTechnologyExpanded(!isTechnologyExpanded)}
                    >
                        Missions Technology
                    </li>
                </ul>
                <div
                    className="resize-handle"
                    onMouseDown={handleMouseDown}
                ></div>
            </div>

            <div className="main-content" style={{ marginLeft: sidebarWidth }}>
                <div className="section">
                    <h1 className="header" onClick={() => setIsMissionExpanded(!isMissionExpanded)}>
                        Mission description
                    </h1>
                    {isMissionExpanded && (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Mission Name</th>
                                    <th>Country</th>
                                    <th>Organization</th>
                                    <th>Type</th>
                                    <th>Launch Date</th>
                                    <th>Orbit Type</th>
                                    <th>Altitude</th>
                                    <th>Inclination</th>
                                    <th>Status</th>
                                    <th>Mission Objectives</th>
                                    <th>Launchers</th>
                                </tr>
                            </thead>
                            <tbody>
                                {missions.map(mission => (
                                    <tr key={mission.id}>
                                        <td>{mission.id}</td>
                                        <td>{mission.mission_name}</td>
                                        <td>{mission.country}</td>
                                        <td>{mission.organization}</td>
                                        <td>{mission.type}</td>
                                        <td>{new Date(mission.launch_date).toLocaleDateString()}</td>
                                        <td>{mission.orbit_type}</td>
                                        <td>{mission.altitude || 'N/A'}</td>
                                        <td>{mission.inclination || 'N/A'}</td>
                                        <td>{mission.status}</td>
                                        <td>{mission.mission_objectives || 'N/A'}</td>
                                        <td>{mission.launchers || 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="section">
                    <h1 className="header" onClick={() => setIsTechnologyExpanded(!isTechnologyExpanded)}>
                        Missions Technology
                    </h1>
                    {isTechnologyExpanded && (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Mission Name</th>
                                    <th>Payload</th>
                                    <th>Frequency Band</th>
                                    <th>Data Rate</th>
                                    <th>Communication Protocol</th>
                                    <th>Modulation</th>
                                    <th>OBC</th>
                                    <th>Com</th>
                                    <th>ADCS</th>
                                    <th>EPS</th>
                                    <th>Antenna</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {technology.map(tech => (
                                    <tr key={tech.id}>
                                        <td>{tech.id}</td>
                                        <td>{tech.mission_name}</td>
                                        <td>{tech.payload || 'N/A'}</td>
                                        <td>{tech.frequency_band || 'N/A'}</td>
                                        <td>{tech.data_rate || 'N/A'}</td>
                                        <td>{tech.communication_protocol || 'N/A'}</td>
                                        <td>{tech.modulation || 'N/A'}</td>
                                        <td>{tech.obc || 'N/A'}</td>
                                        <td>{tech.com || 'N/A'}</td>
                                        <td>{tech.adcs !== null ? tech.adcs : 'N/A'}</td>
                                        <td>{tech.eps !== null ? tech.eps : 'N/A'}</td>
                                        <td>{tech.antenna || 'N/A'}</td>
                                        <td>{new Date(tech.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
