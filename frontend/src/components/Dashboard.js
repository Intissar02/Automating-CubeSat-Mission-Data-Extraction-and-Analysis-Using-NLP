import React, { useEffect, useState } from 'react';
import { fetchMissionDescription, fetchMissionsTechnology } from '../api';
import MissionChart from './MissionChart';
const Dashboard = () => {
    const [missions, setMissions] = useState([]);
    const [technology, setTechnology] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const missionData = await fetchMissionDescription();
            const techData = await fetchMissionsTechnology();
            setMissions(missionData);
            setTechnology(techData);
        };
        loadData();
    }, []);

    return (
        <div>
            <h1>Mission Dashboard</h1>
            <h2>Mission Descriptions</h2>
            <MissionChart missions={missions} />
            <ul>
                {missions.map(mission => (
                    <li key={mission.mission_id}>
                        {mission.mission_name} - {mission.status}
                    </li>
                ))}
            </ul>
            <h2>Mission Technology</h2>
            <ul>
                {technology.map(tech => (
                    <li key={tech.id}>
                        {tech.mission_name} - {tech.payload}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;