import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MissionChart = ({ missions }) => {
    const data = {
        labels: missions.map(mission => mission.mission_name),
        datasets: [
            {
                label: 'Mission Status',
                data: missions.map(mission => (mission.status === 'Active' ? 1 : 0)),
                backgroundColor: 'rgba(192, 75, 130, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Mission Status',
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default MissionChart;