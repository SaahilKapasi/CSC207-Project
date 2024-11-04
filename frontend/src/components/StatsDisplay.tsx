import React from 'react';
import { Paper, Typography } from '@mui/material';

const StatsDisplay: React.FC = () => {
    return (
        <Paper elevation={3} sx={{ padding: '1rem' }}>
            <Typography variant="h6">Stats for &lt;File 1.0&gt;</Typography>

            {/* Example stats */}
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                <li>Population: race</li>
                <li>GAP: 53%</li>
                <li>Mean: 23%</li>
                {/* Add more stats as needed */}
            </ul>
        </Paper>
    );
};

export default StatsDisplay;