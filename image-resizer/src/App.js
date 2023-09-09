import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, ThemeProvider, createTheme, Box, Paper } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00796b',
        },
        secondary: {
            main: '#ffb74d',
        },
    },
});

function App() {
    const [file, setFile] = useState(null);
    const [targetSize, setTargetSize] = useState(2);
    const [size, setSize] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSizeChange = (e) => {
        setTargetSize(e.target.value);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('targetSize', targetSize);

        try {
            const response = await axios.post('http://localhost:5000/process-image', formData);
            setSize(response.data.size);
        } catch (error) {
            console.error("Error processing image:", error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component={Paper} style={{ padding: '2rem', marginTop: '2rem' }}>
                <Typography variant="h4" gutterBottom>图片体积调整</Typography>
                <Typography variant="h5" gutterBottom>Image Size Adjuster</Typography>

                <Box component="div" mt={2}>
                    <TextField
                        type="file"
                        variant="outlined"
                        fullWidth
                        onChange={handleFileChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>
                <Box component="div" mt={2}>
                    <TextField
                        type="number"
                        value={targetSize}
                        onChange={handleSizeChange}
                        placeholder="Size you want (in MB)"
                        variant="outlined"
                        fullWidth
                    />
                </Box>
                <Box component="div" mt={2}>
                    <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
                        Process Image
                    </Button>
                </Box>

                {size &&
                    <Typography variant="h6" style={{ marginTop: '1rem' }}>
                        现在是: {size.toFixed(2)}MB
                    </Typography>
                }
            </Container>
        </ThemeProvider>
    );
}

export default App;
