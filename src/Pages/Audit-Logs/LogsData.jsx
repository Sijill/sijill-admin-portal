import { Box, Chip, Typography } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export const auditLogRows = [
  {
    id: 1,
    action: 'Verified',
    targetUser: 'John Doe',
    admin: 'Mohamed Ibrahim',
    timestamp: 'June 24, 2026 10:12 AM',
    details: 'Approved patient registration after document review.',
  },
  {
    id: 2,
    action: 'Rejected',
    targetUser: 'Sarah Johnson',
    admin: 'Mohamed Ibrahim',
    timestamp: 'June 24, 2026 11:05 AM',
    details: 'Rejected healthcare provider application because license scan was incomplete.',
  },
  {
    id: 3,
    action: 'Suspended',
    targetUser: 'Precision Diagnostics Lab',
    admin: 'Amina Khaled',
    timestamp: 'June 23, 2026 03:45 PM',
    details: 'Temporarily suspended after failed renewal validation.',
  },
  {
    id: 4,
    action: 'Verified',
    targetUser: 'Advanced Imaging Center',
    admin: 'Mohamed Ibrahim',
    timestamp: 'June 23, 2026 04:10 PM',
    details: 'Approved imaging center after accreditation was confirmed.',
  },
  {
    id: 5,
    action: 'Suspended',
    targetUser: 'Mark Williams',
    admin: 'Amina Khaled',
    timestamp: 'June 22, 2026 09:20 AM',
    details: 'Permanent suspension after repeated verification mismatches.',
  },
];

export const columns = [
  {
    field: 'action',
    headerName: 'Action',
    flex: 0.8,
    renderCell: ({ value }) => {
      const statusMap = {
        Verified: { bg: '#e8f5e9', text: '#2e7d32', border: '#a5d6a7' },
        Rejected: { bg: '#ffebee', text: '#c62828', border: '#ef9a9a' },
        Suspended: { bg: '#fff3e0', text: '#e65100', border: '#ffcc80' },
      };
      const style = statusMap[value] || statusMap.Verified;
      return (
        <Chip
          label={value}
          size="small"
          sx={{
            fontWeight: 700,
            borderRadius: '6px',
            bgcolor: style.bg,
            color: style.text,
            border: `1px solid ${style.border}`,
            fontSize: '0.75rem',
          }}
        />
      );
    },
  },
  {
    field: 'targetUser',
    headerName: 'Target User',
    flex: 1.2,
    renderCell: ({ value }) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <PersonOutlineIcon sx={{ fontSize: 20 }} />
        <Typography sx={{ fontWeight: 800, fontSize: '0.9rem' }}>{value}</Typography>
      </Box>
    ),
  },
  {
    field: 'admin',
    headerName: 'Admin',
    flex: 1,
    renderCell: ({ value }) => (
      <Typography sx={{ fontWeight: 800, fontSize: '0.9rem' }}>{value}</Typography>
    ),
  },
  {
    field: 'timestamp',
    headerName: 'Timestamp',
    flex: 1.5,
    renderCell: ({ value }) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CalendarTodayIcon sx={{ fontSize: 18 }} />
        <Typography sx={{ fontSize: '0.85rem' }}>{value}</Typography>
      </Box>
    ),
  },
  {
    field: 'details',
    headerName: 'Details',
    flex: 2,
    renderCell: ({ value }) => (
      <Typography variant="body2" sx={{ color: '#444' }}>
        {value}
      </Typography>
    ),
  },
];
