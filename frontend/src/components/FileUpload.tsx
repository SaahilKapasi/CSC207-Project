import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { AiOutlineUpload } from 'react-icons/ai';

interface FileUploadProps {
    handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ handleFileUpload }) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
            {/* Upload Icon */}
            <AiOutlineUpload size={80} color="#28a745" />
            {/* Hidden file input */}
            <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} id="upload-button" />
            {/* Upload Button */}
            <label htmlFor="upload-button">
                <Button variant="contained" color="success" component="span">
                    Please upload your files
                </Button>
            </label>
            {/* Instruction Text */}
            <Typography variant="body1" mt={2}>
                Supported formats: CSV, JSON
            </Typography>
        </Box>
    );
};

export default FileUpload;