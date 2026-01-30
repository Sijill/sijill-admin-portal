import React from 'react';
import { Box, Paper, Typography, Chip, Button, Avatar, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FlagIcon from '@mui/icons-material/Flag';

export default function Queueitem({ id, name, role, date, icon, iconBg }) {
  const navigate = useNavigate();

  const getRoleColors = (role) => {
    switch (role?.toLowerCase()) {
      case 'patient': 
        return { bg: '#dbeafe', color: '#1e40af', border: '#93c5fd' };
      case 'healthcare provider': 
        return { bg: '#f3e8ff', color: '#6b21a8', border: '#d8b4fe' };
      case 'laboratory technician': 
        return { bg: '#fff7ed', color: '#9a3412', border: '#fed7aa' };
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
        '&:hover': { boxShadow: '0px 8px 24px rgba(0,0,0,0.06)' }
      }}
    >
      <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center' }}>
        {/* User Avatar */}
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 0.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.2rem' }}>
              {name}
            </Typography>
            <Chip
              label="Pending Verification"
              size="small"
              sx={{
                fontWeight: 700,
                borderRadius: '8px',
                fontSize: '0.75rem',
                bgcolor: '#fff3e0',
                color: '#e65100',
                border: '1px solid',
                borderColor: '#ffcc80'
              }}
            />
          </Box>

          {/* Details Section */}
          <Stack spacing={0.4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FlagIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2" sx={{ fontWeight: 800 }}>
                Role: <span style={{ fontWeight: 500 }}>{role}</span>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarTodayIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2" sx={{ fontWeight: 800 }}>
                Submitted on: <span style={{ fontWeight: 500 }}>{date}</span>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      {/* Action Button */}
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