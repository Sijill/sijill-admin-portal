import React from 'react';
import { Box, Paper, Typography, Button, Avatar, Stack, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FlagIcon from '@mui/icons-material/Flag';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

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
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: { xs: 'stretch', md: 'center' },
        justifyContent: 'space-between',
        gap: 2,
        transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: '0 auto 0 0',
          width: 4,
          background: roleStyle.color,
        },
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0px 10px 26px rgba(15, 23, 42, 0.08)',
          borderColor: '#cbd5e1',
        },
      }}
    >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5} alignItems={{ xs: 'flex-start', md: 'center' }} sx={{ minWidth: 0, flex: 1 }}>
        
        <Avatar sx={{ bgcolor: iconBg, width: 60, height: 60 }}>
          <i 
            className={icon} 
            style={{ 
              color: roleStyle.color, 
              fontSize: '1.8rem' 
            }}
          ></i>
        </Avatar>

        <Box sx={{ minWidth: 0 }}>
          
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ mb: 1 }}>
            <EmailIcon sx={{ fontSize: 20, color: '#546e7a' }} />
            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.05rem', wordBreak: 'break-word', minWidth: 0 }}>
              {email}
            </Typography>
          </Stack>

          
          <Stack spacing={0.4}>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              <FlagIcon sx={{ fontSize: 18, color: '#546e7a' }} />
              <Typography variant="body2" sx={{ fontWeight: 800, color: '#546e7a' }}>
                Role:
              </Typography>
              <Chip
                label={role}
                size="small"
                sx={{
                  fontWeight: 700,
                  bgcolor: roleStyle.bg,
                  color: roleStyle.color,
                  border: `1px solid ${roleStyle.border}`,
                }}
              />
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              <CalendarTodayIcon sx={{ fontSize: 18, color: '#546e7a' }} />
              <Typography variant="body2" sx={{ fontWeight: 800, color: '#546e7a' }}>
                Submitted:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {date}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>

      
      <Button
        onClick={() => navigate(`/patient-data/${id}`)}
        variant="contained"
        endIcon={<ArrowForwardRoundedIcon />}
        sx={{
          textTransform: 'none',
          borderRadius: '8px',
          px: 3,
          fontWeight: 700,
          fontSize: '0.95rem',
          bgcolor: '#2563eb',
          '&:hover': { bgcolor: '#1d4ed8' },
          boxShadow: 'none',
          alignSelf: { xs: 'stretch', md: 'center' },
          minWidth: { xs: '100%', md: 140 },
        }}
      >
        Review
      </Button>
    </Paper>
  );
}
