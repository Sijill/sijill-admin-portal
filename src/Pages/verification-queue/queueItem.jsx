import React from 'react';
import { Box, Paper, Typography, Button, Avatar, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FlagIcon from '@mui/icons-material/Flag';
import EmailIcon from '@mui/icons-material/Email';

export default function Queueitem({ id, email, role, date, icon, iconBg }) {
  const navigate = useNavigate();

  const getRoleColors = (role) => {
    switch (role?.toLowerCase()) {
      case 'patient': 
        return { bg: '#dbeafe', color: '#1e40af', border: '#93c5fd' };
      case 'healthcare provider': 
        return { bg: '#f3e8ff', color: '#6b21a8', border: '#d8b4fe' };
      case 'laboratory': 
        return { bg: '#fff7ed', color: '#9a3412', border: '#fed7aa' };
      case 'imaging center':
        return { bg: '#dcfce7', color: '#166534', border: '#bbf7d0' };
      default: 
        return { bg: '#f3f4f6', color: '#374151', border: '#d1d5db' };
    }
  };

  const roleStyle = getRoleColors(role);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '20px',
        border: '2px solid #eee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: '0.2s',
        '&:hover': { 
          boxShadow: '0px 8px 24px rgba(0,0,0,0.06)',
          borderColor: '#d0d0d0'
        }
      }}
    >
      <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center' }}>
        
        <Avatar sx={{ bgcolor: iconBg, width: 60, height: 60 }}>
          <i 
            className={icon} 
            style={{ 
              color: roleStyle.color, 
              fontSize: '1.8rem' 
            }}
          ></i>
        </Avatar>

        <Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <EmailIcon sx={{ fontSize: 20, color: '#546e7a' }} />
            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem' }}>
              {email}
            </Typography>
          </Box>

          
          <Stack spacing={0.4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FlagIcon sx={{ fontSize: 18, color: '#546e7a' }} />
              <Typography variant="body2" sx={{ fontWeight: 800, color: '#546e7a' }}>
                Role: <span style={{ fontWeight: 500, color: roleStyle.color }}>{role}</span>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarTodayIcon sx={{ fontSize: 18, color: '#546e7a' }} />
              <Typography variant="body2" sx={{ fontWeight: 800, color: '#546e7a' }}>
                Submitted: <span style={{ fontWeight: 500 }}>{date}</span>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      
      <Button
        onClick={() => navigate(`/patient-data/${id}`)}
        variant="contained"
        endIcon={<i className="bi bi-arrow-right"></i>}
        sx={{
          textTransform: 'none',
          borderRadius: '8px',
          px: 3,
          fontWeight: 700,
          fontSize: '0.95rem',
          bgcolor: '#2563eb',
          '&:hover': { bgcolor: '#1d4ed8' },
          boxShadow: 'none'
        }}
      >
        Review
      </Button>
    </Paper>
  );
}