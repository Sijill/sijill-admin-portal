import React from 'react';
import { Box, Typography, Paper, Grid, Divider, Button, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function PatientForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock document data as seen in the images
  const documents = [
    { label: "National ID (Front)" },
    { label: "National ID (Back)" },
    { label: "Live Selfie with ID" }
  ];

  return (
    <Box sx={{ p: 4, bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      {/* 1. Back Button */}
      <Button
        onClick={() => navigate(-1)}
        startIcon={<ArrowBackIcon />}
        sx={{ 
          textTransform: 'none', color: "#546e7a", mb: 2, fontWeight: 700,
          '&:hover': { bgcolor: 'transparent', color: '#1e3a8a' }
        }}
      >
        Back To Queue
      </Button>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: '16px', border: '1px solid #e0e0e0' }}>
        {/* 2. Header */}
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, fontFamily: 'serif' }}>
          Patient Registration Form
        </Typography>

        {/* 3. Personal Information */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>First Name</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Sarah</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>Middle Name</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Sarah</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>Surname</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Johnson</Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>Gender</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Female</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>Date Of Birth</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>May 15, 1990</Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>National ID</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>N123456789</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>Phone Number</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>+1 (555) 123-4567</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>Email</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>sarah.johnson@email.com</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* 4. Emergency Contact Section */}
        <Typography sx={{ fontWeight: 800, mb: 3, fontSize: '1.1rem' }}>Emergency Contact</Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>Name</Typography>
            <Typography sx={{ fontWeight: 700 }}>John Johnson</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>Phone Number</Typography>
            <Typography sx={{ fontWeight: 700 }}>+1 (555) 987-6543</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>Relation</Typography>
            <Typography sx={{ fontWeight: 700 }}>Parent</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* 5. Uploaded Documents Section */}
        <Typography sx={{ fontWeight: 800, mb: 3, fontSize: '1.1rem' }}>Uploaded Documents</Typography>
        <Stack spacing={2} sx={{ mb: 6 }}>
          {documents.map((doc, index) => (
            <Paper 
              key={index} 
              variant="outlined" 
              sx={{ 
                p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderRadius: '12px', bgcolor: '#fcfcfc' 
              }}
            >
              <Typography sx={{ fontWeight: 700 }}>{doc.label}</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  variant="contained" 
                  size="small" 
                  startIcon={<VisibilityIcon />}
                  sx={{ borderRadius: '8px', bgcolor: '#2563eb', textTransform: 'none' }}
                >
                  View
                </Button>
                <Button 
                  variant="contained" 
                  size="small" 
                  startIcon={<FileDownloadIcon />}
                  sx={{ borderRadius: '8px', bgcolor: '#475569', textTransform: 'none', '&:hover': { bgcolor: '#1e293b' } }}
                >
                  Download
                </Button>
              </Box>
            </Paper>
          ))}
        </Stack>

        {/* 6. Action Footer Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
          <Button
            variant="contained"
            startIcon={<HighlightOffIcon />}
            sx={{ 
              bgcolor: '#ff0000', px: 4, py: 1.5, borderRadius: '12px', 
              fontWeight: 700, textTransform: 'none', fontSize: '1rem',
              '&:hover': { bgcolor: '#d32f2f' }
            }}
          >
            Reject Application
          </Button>
          <Button
            variant="contained"
            startIcon={<CheckCircleOutlineIcon />}
            sx={{ 
              bgcolor: '#00c853', px: 4, py: 1.5, borderRadius: '12px', 
              fontWeight: 700, textTransform: 'none', fontSize: '1rem',
              '&:hover': { bgcolor: '#00a844' }
            }}
          >
            Verify Application
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}