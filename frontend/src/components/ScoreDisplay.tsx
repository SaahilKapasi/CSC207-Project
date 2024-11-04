import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface ScoreDisplayProps {
    score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
    return (
        <Paper elevation={3} sx={{ padding: '1rem', marginBottom: '1rem' }}>
            <Typography variant="h6">Score:</Typography>
            <Box display="flex" alignItems="center">
                <Typography variant="h2" color="green">
                    {score.toFixed(1)}
                </Typography>
            </Box>

            {/* ChatGPT Response */}
            {score > 0 ? (
                <>
                    <Typography variant="subtitle1">ChatGPT:</Typography>
                    <Typography variant="body2">
                        It seems like you have a few false positive rates that show an increasing trend...
                    </Typography>
                </>
            ) : (
                <>
                    ..............
                    ..............
                    ..............
                </>
            )}
        </Paper>
    );
};

export default ScoreDisplay;