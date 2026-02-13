import React from 'react';
import { Box, Typography, Paper, TextField, InputAdornment, Chip, Button, Avatar, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FlagIcon from '@mui/icons-material/Flag';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function SuspendedUsers() {
  const suspendedData = [
    {
      id: 1,
      name: "Robert Johnson",
      status: "Temporarily Suspended",
      role: "Patient",
      date: "January 18, 2026",
      reason: "Suspicious activity detected"
    },
    {
      id: 2,
      name: "Mark Williams",
      status: "Permanently Suspended",
      role: "Healthcare Provider",
      date: "January 18, 2026",
      reason: "License verification failed"
    }
  ];

  return (
    <Box sx={{ p: 4, bgcolor: "#fcfcfc", minHeight: "100vh" }}>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Avatar sx={{ bgcolor: '#edebeb00', width: 60, height: 60 }}>
                <i className="bi bi-person-x" style={{ color: '#0c0202', fontSize: '1.8rem' }}></i>
              </Avatar>
        <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'serif' }}>
          Suspended Users
        </Typography>
      </Box>

      
      <TextField
        fullWidth
        placeholder="Search Suspended Users"
        variant="outlined"
        sx={{
          mb: 4,
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            bgcolor: '#fff',
            height: '50px'
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#999' }} />
            </InputAdornment>
          ),
        }}
      />

      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {suspendedData.map((user) => (
          <Paper
            key={user.id}
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
              
              <Avatar sx={{ bgcolor: '#ffebee', width: 60, height: 60 }}>
                <i className="bi bi-person-x" style={{ color: '#ef5350', fontSize: '1.8rem' }}></i>
              </Avatar>

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 0.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.2rem' }}>
                    {user.name}
                  </Typography>
                  <Chip
                    label={user.status}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      bgcolor: user.status.includes('Temporarily') ? '#fff3e0' : '#ffebee',
                      color: user.status.includes('Temporarily') ? '#e65100' : '#c62828',
                      border: '1px solid',
                      borderColor: user.status.includes('Temporarily') ? '#ffcc80' : '#ffcdd2'
                    }}
                  />
                </Box>

                
                <Stack spacing={0.4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FlagIcon sx={{ fontSize: 18 }} />
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>
                      Role: <span style={{ fontWeight: 500 }}>{user.role}</span>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarTodayIcon sx={{ fontSize: 18 }} />
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>
                      Suspended on: <span style={{ fontWeight: 500 }}>{user.date}</span>
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    Reason: <span style={{ fontWeight: 500, color: '#555' }}>{user.reason}</span>
                  </Typography>
                </Stack>
              </Box>
            </Box>

            
            <Button
              variant="contained"
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
              Reactivate
            </Button>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}