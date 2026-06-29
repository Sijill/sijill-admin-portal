import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
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
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import BlockIcon from '@mui/icons-material/Block';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import Header from '../../Components/Header';
import { useAuth } from '../../Context/useAuth';
import {
  getUsersRequest,
  getUsersMetaRequest,
  suspendUserRequest,
} from '../../services/admin.api';

const roleLabels = {
  ADMIN: 'Admin',
  PATIENT: 'Patient',
  HEALTHCARE_PROVIDER: 'Healthcare Provider',
  LAB: 'Laboratory',
  IMAGING_CENTER: 'Imaging Center',
};

const roleStyles = {
  ADMIN: { bg: '#f5f3ff', text: '#6d28d9', border: '#c4b5fd' },
  PATIENT: { bg: '#eff6ff', text: '#1d4ed8', border: '#93c5fd' },
  HEALTHCARE_PROVIDER: { bg: '#f3e8ff', text: '#7c3aed', border: '#d8b4fe' },
  LAB: { bg: '#fff7ed', text: '#d97706', border: '#fed7aa' },
  IMAGING_CENTER: { bg: '#ecfdf5', text: '#047857', border: '#a7f3d0' },
};

const statusStyles = {
  ACTIVE: { bg: '#ecfdf5', text: '#047857', border: '#a7f3d0' },
  SUSPENDED: { bg: '#fff7ed', text: '#c2410c', border: '#fdba74' },
  PENDING: { bg: '#eff6ff', text: '#1d4ed8', border: '#93c5fd' },
};

const summaryCards = [
  {
    label: 'Total users',
    icon: PeopleAltIcon,
    color: '#2563eb',
    bg: '#eff6ff',
  },
  {
    label: 'Active users',
    icon: CheckCircleOutlineIcon,
    color: '#047857',
    bg: '#ecfdf5',
  },
  {
    label: 'Suspended users',
    icon: BlockIcon,
    color: '#c2410c',
    bg: '#fff7ed',
  },
  {
    label: 'Admins',
    icon: AdminPanelSettingsIcon,
    color: '#6d28d9',
    bg: '#f5f3ff',
  },
];

const statusMap = {
  VERIFIED: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  PENDING: 'PENDING',
  REJECTED: 'PENDING',
  DEACTIVATED: 'SUSPENDED',
};

const columns = [
  {
    field: 'name',
    headerName: 'User',
    flex: 1.2,
    minWidth: 220,
    renderCell: ({ row }) => (
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontWeight: 800, wordBreak: 'break-word' }}>{row.name || row.email}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          {row.email}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 0.9,
    minWidth: 170,
    renderCell: ({ value }) => {
      const style = roleStyles[value] || roleStyles.PATIENT;
      return (
        <Chip
          label={roleLabels[value] || value}
          size="small"
          sx={{
            fontWeight: 700,
            bgcolor: style.bg,
            color: style.text,
            border: `1px solid ${style.border}`,
          }}
        />
      );
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.8,
    minWidth: 140,
    renderCell: ({ value, row }) => {
      const displayStatus = statusMap[value] || value;
      const style = statusStyles[displayStatus] || statusStyles.ACTIVE;
      return (
        <Stack spacing={0.25}>
          <Chip
            label={displayStatus}
            size="small"
            sx={{
              fontWeight: 700,
              bgcolor: style.bg,
              color: style.text,
              border: `1px solid ${style.border}`,
            }}
          />
          {row.suspension_reason ? (
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {row.suspension_reason}
            </Typography>
          ) : null}
        </Stack>
      );
    },
  },
  {
    field: 'joined_at',
    headerName: 'Joined',
    flex: 0.8,
    minWidth: 130,
    valueGetter: (value) =>
      value
        ? new Date(value).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : '-',
  },
  {
    field: 'last_active',
    headerName: 'Last active',
    flex: 0.8,
    minWidth: 130,
    valueGetter: (value) =>
      value
        ? new Date(value).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : '-',
  },
];

function SummaryCard({ label, value, icon, color, bg }) {
  const Icon = icon;
  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: bg, borderColor: 'transparent' }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box sx={{ width: 42, height: 42, borderRadius: '50%', bgcolor: '#fff', display: 'grid', placeItems: 'center', color }}>
          <Icon fontSize="small" />
        </Box>
        <Box>
          <Typography variant="caption" sx={{ color, fontWeight: 800 }}>
            {label}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
            {value}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

export default function Users() {
  const { auth } = useAuth();
  const isAdmin = auth?.role === 'ADMIN';

  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({ totalUsers: 0, suspendedUsers: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [suspendTarget, setSuspendTarget] = useState(null);
  const [suspensionReason, setSuspensionReason] = useState('');
  const [suspending, setSuspending] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        limit: 100,
        ...(roleFilter !== 'ALL' && { role: roleFilter }),
        ...(statusFilter !== 'ALL' && { status: statusFilter }),
      };

      const [usersData, metaData] = await Promise.all([
        getUsersRequest(params),
        getUsersMetaRequest(),
      ]);

      setUsers(usersData.data || []);
      setMeta(metaData);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [roleFilter, statusFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return users;
    return users.filter((user) => {
      const displayRole = roleLabels[user.role] || user.role;
      return (
        (user.name || '').toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        displayRole.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, users]);

  const stats = useMemo(() => {
    let active = 0;
    let admins = 0;
    users.forEach((user) => {
      if (user.role === 'ADMIN') admins++;
      if (user.status === 'VERIFIED') active++;
    });
    return {
      total: meta.totalUsers,
      active,
      suspended: meta.suspendedUsers,
      admins,
    };
  }, [users, meta]);

  const handleReset = () => {
    setSearchQuery('');
    setRoleFilter('ALL');
    setStatusFilter('ALL');
  };

  const handleSuspendClick = (user) => {
    setSuspendTarget(user);
    setSuspensionReason('');
  };

  const handleConfirmSuspend = async () => {
    if (!suspendTarget) return;
    const reason = suspensionReason.trim();
    if (reason.length < 10) {
      setSnackbarMessage('Enter a suspension reason with at least 10 characters.');
      return;
    }
    try {
      setSuspending(true);
      await suspendUserRequest(suspendTarget.id, { reason });
      setSnackbarMessage(`${suspendTarget.name} has been suspended.`);
      setSuspendTarget(null);
      fetchUsers();
    } catch (err) {
      setSnackbarMessage(
        err.response?.data?.message || 'Failed to suspend user'
      );
    } finally {
      setSuspending(false);
    }
  };

  const renderActions = (params) => {
    const row = params.row;
    const isCurrentAdmin = auth?.email && row.email === auth.email;

    return (
      <Stack direction="row" spacing={1} sx={{ py: 1 }} flexWrap="wrap">
        <Button
          size="small"
          variant="outlined"
          startIcon={<BlockIcon />}
          disabled={
            !isAdmin || isCurrentAdmin || row.status === 'SUSPENDED'
          }
          onClick={() => handleSuspendClick(row)}
          sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2 }}
        >
          Suspend
        </Button>
      </Stack>
    );
  };

  if (!isAdmin) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          This page is restricted to admin users.
        </Alert>
      </Box>
    );
  }

  const actionColumns = [
    ...columns,
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1.2,
      minWidth: 240,
      sortable: false,
      filterable: false,
      renderCell: renderActions,
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Stack spacing={3}>
        <Header
          title="All Users"
          description="Admin directory for browsing every account, filtering by role or status, and managing user accounts."
        />

        <Grid container spacing={2}>
          {summaryCards.map((card) => (
            <Grid key={card.label} size={{ xs: 12, sm: 6, lg: 3 }}>
              <SummaryCard
                label={card.label}
                value={
                  card.label === 'Total users'
                    ? stats.total
                    : card.label === 'Active users'
                      ? stats.active
                      : card.label === 'Suspended users'
                        ? stats.suspended
                        : stats.admins
                }
                icon={card.icon}
                color={card.color}
                bg={card.bg}
              />
            </Grid>
          ))}
        </Grid>

        <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, bgcolor: '#fff', borderColor: '#dbe5f0' }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }}>
            <TextField
              fullWidth
              placeholder="Search by name, email, or role"
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
              <InputLabel>Role</InputLabel>
              <Select
                value={roleFilter}
                label="Role"
                onChange={(event) => setRoleFilter(event.target.value)}
                sx={{ borderRadius: '12px', bgcolor: '#fff', height: '50px' }}
              >
                <MenuItem value="ALL">All roles</MenuItem>
                <MenuItem value="ADMIN">Admins</MenuItem>
                <MenuItem value="PATIENT">Patients</MenuItem>
                <MenuItem value="HEALTHCARE_PROVIDER">Healthcare Providers</MenuItem>
                <MenuItem value="LAB">Laboratories</MenuItem>
                <MenuItem value="IMAGING_CENTER">Imaging Centers</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: { xs: '100%', md: 220 } }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(event) => setStatusFilter(event.target.value)}
                sx={{ borderRadius: '12px', bgcolor: '#fff', height: '50px' }}
              >
                <MenuItem value="ALL">All statuses</MenuItem>
                <MenuItem value="VERIFIED">Active</MenuItem>
                <MenuItem value="SUSPENDED">Suspended</MenuItem>
                <MenuItem value="PENDING">Pending</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<ReplayIcon />}
              onClick={handleReset}
              sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2, minWidth: 140 }}
            >
              Reset
            </Button>
          </Stack>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Paper
          variant="outlined"
          sx={{
            height: '70vh',
            width: '100%',
            borderRadius: 3,
            overflow: 'hidden',
            bgcolor: '#fff',
            borderColor: '#dbe5f0',
            '& .MuiDataGrid-root': { border: 'none' },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f8fafc',
              borderBottom: 'none',
              fontWeight: 800,
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f0f0f0',
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f8fafc',
            },
          }}
        >
          {loading && users.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
              rows={filteredUsers}
              columns={actionColumns}
              disableRowSelectionOnClick
              checkboxSelection
            />
          )}
        </Paper>
      </Stack>

      <Dialog
        open={Boolean(suspendTarget)}
        onClose={() => setSuspendTarget(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 800 }}>Suspend user</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {suspendTarget?.name} will be suspended. This action can be
              reversed later by reactivating the account.
            </Typography>
            <TextField
              label="Reason"
              placeholder="Write a clear suspension reason (min 10 characters)"
              multiline
              minRows={4}
              value={suspensionReason}
              onChange={(event) => setSuspensionReason(event.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button
            onClick={() => setSuspendTarget(null)}
            disabled={suspending}
            sx={{ textTransform: 'none', fontWeight: 700 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmSuspend}
            disabled={suspending || suspensionReason.trim().length < 10}
            startIcon={
              suspending ? (
                <CircularProgress size={16} sx={{ color: '#fff' }} />
              ) : (
                <BlockIcon />
              )
            }
            sx={{
              textTransform: 'none',
              fontWeight: 800,
              borderRadius: 2,
              bgcolor: '#2563eb',
              '&:hover': { bgcolor: '#1d4ed8' },
              boxShadow: 'none',
            }}
          >
            {suspending ? 'Suspending...' : 'Confirm suspend'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={2600}
        onClose={() => setSnackbarMessage('')}
        message={snackbarMessage}
      />
    </Box>
  );
}
