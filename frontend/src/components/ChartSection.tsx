import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Chart } from 'react-chartjs-2'; // Use Chart.js for graph rendering

const ChartSection: React.FC = () => {
    return (
        <Paper elevation={3} sx={{ padding: '1rem' }}>
            <Typography variant="h6">&lt;File 1.0&gt;</Typography>

            {/* Example chart */}
            <Chart
                type="bar"
                data={{
                    labels: ['White', 'Black', 'Hispanic', 'Asian', 'Indigenous'],
                    datasets: [
                        {
                            label: 'FPR vs Race',
                            data: [7, 6, 5, 4, 3], // Example data for FPR
                            backgroundColor: '#007bff',
                        },
                    ],
                }}
                options={{
                    scales: {
                        x: { title: { display: true, text: 'Race' } },
                        y: { title: { display: true, text: 'False Positive Rate (FPR)' } },
                    },
                }}
            />
        </Paper>
    );
};

export default ChartSection;