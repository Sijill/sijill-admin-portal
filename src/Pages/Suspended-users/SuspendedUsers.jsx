import { useMemo, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  Grow,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FlagIcon from '@mui/icons-material/Flag';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

const initialSuspendedUsers = [
  {
    id: 1,
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    status: 'Temporarily Suspended',
    role: 'Patient',
    date: 'January 18, 2026',
    reason: 'Suspicious activity detected',
  },
  {
    id: 2,
    name: 'Mark Williams',
    email: 'mark.williams@example.com',
    status: 'Permanently Suspended',
    role: 'Healthcare Provider',
    date: 'January 18, 2026',
    reason: 'License verification failed',
  },
  {
    id: 3,
    name: 'Precision Diagnostics Lab',
    email: 'admin@precisionlab.com',
    status: 'Temporarily Suspended',
    role: 'Laboratory',
    date: 'January 16, 2026',
    reason: 'Missing renewal document',
  },
  {
    id: 4,
    name: 'Advanced Imaging Center',
    email: 'contact@advancedimaging.com',
    status: 'Temporarily Suspended',
    role: 'Imaging Center',
    date: 'January 14, 2026',
    reason: 'Repeated policy violations',
  },
];

const summaryCards = [
  {
    label: 'Active suspensions',
    value: 'Open cases in review',
    color: '#b42318',
    bg: '#fef3f2',
  },
  {
    label: 'Temporary',
    value: 'Eligible for reactivation',
    color: '#b45309',
    bg: '#fff7ed',
  },
  {
    label: 'Permanent',
    value: 'Requires manual review',
    color: '#7c2d12',
    bg: '#fef2f2',
  },
];

const statusStyles = {
  'Temporarily Suspended': { bg: '#fff7ed', text: '#c2410c', border: '#fdba74' },
  'Permanently Suspended': { bg: '#fee2e2', text: '#b91c1c', border: '#fca5a5' },
};

const roleStyles = {
  Patient: { bg: '#dbeafe', text: '#1d4ed8', border: '#93c5fd' },
  'Healthcare Provider': { bg: '#f3e8ff', text: '#7c3aed', border: '#d8b4fe' },
  Laboratory: { bg: '#fff7ed', text: '#d97706', border: '#fed7aa' },
  'Imaging Center': { bg: '#dcfce7', text: '#059669', border: '#bbf7d0' },
};

export default function SuspendedUsers() {
  const [users, setUsers] = useState(initialSuspendedUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return users.filter((user) => {
      const matchesQuery =
        query === '' ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.reason.toLowerCase().includes(query);

      const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter;
      const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;

      return matchesQuery && matchesStatus && matchesRole;
    });
  }, [searchQuery, statusFilter, roleFilter, users]);

  const stats = useMemo(() => {
    return users.reduce(
      (acc, user) => {
        acc.total += 1;
        if (user.status === 'Temporarily Suspended') acc.temporary += 1;
        if (user.status === 'Permanently Suspended') acc.permanent += 1;
        return acc;
      },
      { total: 0, temporary: 0, permanent: 0 }
    );
  }, [users]);

  const handleReactivate = (id) => {
    const removedUser = users.find((user) => user.id === id);
    setUsers((prev) => prev.filter((user) => user.id !== id));
    setSnackbarMessage(`${removedUser?.name || 'User'} has been reactivated locally.`);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setRoleFilter('ALL');
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Stack spacing={3}>
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, bgcolor: '#fff' }}>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2} alignItems={{ xs: 'flex-start', md: 'center' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: '#fef2f2', width: 56, height: 56 }}>
                <PersonRemoveIcon sx={{ color: '#dc2626' }} />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                  Suspended Users
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                  Track suspensions, review reasons, and reactivate accounts from one place.
                </Typography>
              </Box>
            </Stack>

            <Button
              variant="outlined"
              startIcon={<RefreshRoundedIcon />}
              onClick={resetFilters}
              sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
            >
              Reset filters
            </Button>
          </Stack>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {summaryCards.map((item) => (
              <Grid key={item.label} size={{ xs: 12, md: 4 }}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: item.bg, borderColor: 'transparent' }}>
                  <Typography variant="caption" sx={{ color: item.color, fontWeight: 800 }}>
                    {item.label}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5 }}>
                    {item.value}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, mt: 1, color: item.color }}>
                    {item.label === 'Active suspensions' ? stats.total : item.label === 'Temporary' ? stats.temporary : stats.permanent}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, bgcolor: '#fff' }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }}>
            <TextField
              fullWidth
              placeholder="Search suspended users"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#64748b' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  bgcolor: '#fff',
                  height: '50px',
                },
              }}
            />

            <FormControl sx={{ minWidth: { xs: '100%', md: 220 } }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                label="Status"
                sx={{ borderRadius: '12px', bgcolor: '#fff', height: '50px' }}
              >
                <MenuItem value="ALL">All statuses</MenuItem>
                <MenuItem value="Temporarily Suspended">Temporarily Suspended</MenuItem>
                <MenuItem value="Permanently Suspended">Permanently Suspended</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: { xs: '100%', md: 240 } }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value)}
                label="Role"
                sx={{ borderRadius: '12px', bgcolor: '#fff', height: '50px' }}
              >
                <MenuItem value="ALL">All roles</MenuItem>
                <MenuItem value="Patient">Patient</MenuItem>
                <MenuItem value="Healthcare Provider">Healthcare Provider</MenuItem>
                <MenuItem value="Laboratory">Laboratory</MenuItem>
                <MenuItem value="Imaging Center">Imaging Center</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Paper>

        <Stack spacing={2}>
          {filteredUsers.length === 0 ? (
            <Paper variant="outlined" sx={{ p: 6, textAlign: 'center', borderRadius: 3, bgcolor: '#fff' }}>
              <Typography variant="h6" color="text.secondary">
                No suspended users match the current filters.
              </Typography>
            </Paper>
          ) : (
            filteredUsers.map((user, index) => {
              const statusStyle = statusStyles[user.status];
              const roleStyle = roleStyles[user.role] || { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' };

              return (
                <Grow key={user.id} in timeout={120 + index * 60}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      gap: 2,
                      justifyContent: 'space-between',
                      alignItems: { xs: 'stretch', md: 'center' },
                      transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0px 10px 26px rgba(15, 23, 42, 0.08)',
                        borderColor: '#cbd5e1',
                      },
                    }}
                  >
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5} alignItems={{ xs: 'flex-start', md: 'center' }} sx={{ minWidth: 0, flex: 1 }}>
                      <Avatar sx={{ bgcolor: '#fee2e2', width: 60, height: 60 }}>
                        <AccountCircleIcon sx={{ color: '#dc2626' }} />
                      </Avatar>

                      <Box sx={{ minWidth: 0 }}>
                        <Stack direction="row" spacing={1.2} alignItems="center" flexWrap="wrap" sx={{ mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 800, wordBreak: 'break-word' }}>
                            {user.name}
                          </Typography>
                          <Chip
                            label={user.status}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              bgcolor: statusStyle.bg,
                              color: statusStyle.text,
                              border: `1px solid ${statusStyle.border}`,
                            }}
                          />
                        </Stack>

                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                          {user.email}
                        </Typography>

                        <Stack spacing={0.75}>
                          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                            <FlagIcon sx={{ fontSize: 18, color: '#64748b' }} />
                            <Typography variant="body2" sx={{ fontWeight: 800, color: '#64748b' }}>
                              Role:
                            </Typography>
                            <Chip
                              label={user.role}
                              size="small"
                              sx={{
                                fontWeight: 700,
                                bgcolor: roleStyle.bg,
                                color: roleStyle.text,
                                border: `1px solid ${roleStyle.border}`,
                              }}
                            />
                          </Stack>

                          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                            <CalendarTodayIcon sx={{ fontSize: 18, color: '#64748b' }} />
                            <Typography variant="body2" sx={{ fontWeight: 800, color: '#64748b' }}>
                              Suspended on:
                            </Typography>
                            <Typography variant="body2">{user.date}</Typography>
                          </Stack>

                          <Typography variant="body2" sx={{ fontWeight: 800, color: '#64748b' }}>
                            Reason:{' '}
                            <Box component="span" sx={{ fontWeight: 500, color: '#334155' }}>
                              {user.reason}
                            </Box>
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>

                    <Button
                      variant="contained"
                      onClick={() => handleReactivate(user.id)}
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        px: 3,
                        fontWeight: 700,
                        bgcolor: '#2563eb',
                        '&:hover': { bgcolor: '#1d4ed8' },
                        boxShadow: 'none',
                        alignSelf: { xs: 'stretch', md: 'center' },
                        minWidth: { xs: '100%', md: 150 },
                      }}
                    >
                      Reactivate
                    </Button>
                  </Paper>
                </Grow>
              );
            })
          )}
        </Stack>
      </Stack>

      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={2500}
        onClose={() => setSnackbarMessage('')}
        message={snackbarMessage}
      />
    </Box>
  );
}
