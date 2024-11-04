import React, { useState } from 'react';
import { Container, Grid, Button, Select, MenuItem } from '@mui/material';
import Papa from 'papaparse';
import axios from 'axios';
import Header from './components/Header'; // Header Component
import FileUpload from './components/FileUpload'; // File Upload Component
import ScoreDisplay from './components/ScoreDisplay'; // Score Display Component
import ChartSection from './components/ChartSection'; // Chart Section Component
import StatsDisplay from './components/StatsDisplay'; // Stats Display Component

const App: React.FC = () => {
    const [screen, setScreen] = useState<'landing' | 'upload' | 'graph'>('landing'); // State to track current screen
    const [score, setScore] = useState(0.0); // State to track score
    const [dataset, setDataset] = useState<any[]>([]); // State to store uploaded data
    const [xAxis, setXAxis] = useState('Race'); // Default X-axis parameter
    const [yAxis, setYAxis] = useState('FPR'); // Default Y-axis parameter
    const [aiResponse, setAiResponse] = useState(''); // State for AI response

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            Papa.parse(file, {
                header: true,
                complete: (result) => {
                    setDataset(result.data); // Store parsed dataset
                    setScreen('graph'); // Transition to graph screen after upload
                    setScore(7.8); // Example score after file upload

                    // Fetch insights from Hugging Face based on uploaded data
                    fetchAiInsights(result.data);
                },
            });
        }
    };

    const fetchAiInsights = async (data: any[]) => {
        try {
            const response = await axios.post(
                'https://api-inference.huggingface.co/models/gpt2',
                { inputs: `Analyze this dataset:\n${JSON.stringify(data)}\nProvide insights.` },
                {
                    headers: {
                        Authorization: `Bearer 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`, // Your Hugging Face API token
                    },
                });
            setAiResponse(response.data[0].generated_text.trim());
        } catch (error) {
            console.error('Error fetching AI response:', error);
        }
    };

    const handleXAxisChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setXAxis(event.target.value as string);
    };

    const handleYAxisChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setYAxis(event.target.value as string);
    };

    return (
        <Container maxWidth="lg">
            <Header />
            <Grid container spacing={3}>
                {screen === 'landing' ? (
                    // Landing Page
                    <Grid item xs={12} textAlign="center">
                        <h1>Welcome to Bias Visualizer</h1>
                        <p>Analyze your data for bias using our visualizer tool.</p>
                        <Button variant="contained" color="primary" onClick={() => setScreen('upload')}>
                            Get Started
                        </Button>
                    </Grid>
                ) : screen === 'upload' ? (
                    <>
                        {/* File Upload Screen */}
                        <Grid item xs={12} md={8}>
                            <FileUpload handleFileUpload={handleFileUpload} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ScoreDisplay score={score} />
                            <StatsDisplay />
                        </Grid>
                    </>
                ) : (
                    <>
                        {/* Graph Display Screen */}
                        <Grid item xs={12} md={8}>
                            <ChartSection dataset={dataset} xAxis={xAxis} yAxis={yAxis} />
                            {/* Toggle for X and Y axes */}
                            <div style={{ marginTop: '20px' }}>
                                <Select value={xAxis} onChange={handleXAxisChange}>
                                    <MenuItem value="Race">Race</MenuItem>
                                    <MenuItem value="Age">Age</MenuItem>
                                    {/* Add more options as needed */}
                                </Select>
                                <Select value={yAxis} onChange={handleYAxisChange}>
                                    <MenuItem value="FPR">False Positive Rate</MenuItem>
                                    <MenuItem value="TPR">True Positive Rate</MenuItem>
                                    {/* Add more options as needed */}
                                </Select>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ScoreDisplay score={score} />
                            {/* AI Response */}
                            {aiResponse && (
                                <>
                                    <h3>AI Insights:</h3>
                                    <p>{aiResponse}</p>
                                </>
                            )}
                            <StatsDisplay />
                        </Grid>
                    </>
                )}
            </Grid>
        </Container>
    );
};

export default App;