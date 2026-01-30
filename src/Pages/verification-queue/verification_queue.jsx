import React from 'react';
import { Box, Typography, Avatar, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Queueitem from './queueItem';

export default function VerificationQueue() {
  const pendingData = [
    { id: "1", name: "Sarah Johnson", role: "Patient", date: "January 19, 2026", icon: "bi bi-person", iconBg: "#dbeafe" },
    { id: "2", name: "Dr. Micheal chen", role: "Healthcare Provider", date: "January 19, 2026", icon: "bi bi-heart-pulse-fill", iconBg: "#f3e8ff" },
    { id: "3", name: "Mostafa Samy", role: "Laboratory Technician", date: "January 19, 2026", icon: "bi bi-flask", iconBg: "#fff7ed" },
  ];

  return (
    <Box sx={{ p: 4, bgcolor: "#fcfcfc", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Avatar sx={{ bgcolor: '#dbeafe', width: 60, height: 60 }}>
          <i className="bi bi-shield-check" style={{ color: '#2563eb', fontSize: '1.8rem' }}></i>
        </Avatar>
        <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'serif' }}>
          Verification Queue
        </Typography>
      </Box>

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search Verification Queue"
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

      {/* Queue List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {pendingData.map((item) => (
          <Queueitem
            key={item.id}
            id={item.id}
            name={item.name}
            role={item.role}
            date={item.date}
            icon={item.icon}
            iconBg={item.iconBg}
          />
        ))}
      </Box>
    </Box>
  );
}