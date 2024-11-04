import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import cashAppLogo from '/cash_app.svg'; // Adjust path if necessary

const Header: React.FC = () => {
    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
                <img src={cashAppLogo} alt="Cash App logo" style={{ height: '40px', marginRight: '10px' }} />
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    Cash App
                </Typography>
                <Typography variant="h6">Bias Visualizer</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;