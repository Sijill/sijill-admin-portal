import { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
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
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BlockIcon from '@mui/icons-material/Block';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import Header from '../../Components/Header';
import { useAuth } from '../../Context/useAuth';

const initialUsers = [
  {
    id: 'u-001',
    name: 'Mohamed Ibrahim',
    email: 'mohamed.ibrahim@adminportal.local',
    role: 'ADMIN',
    accountStatus: 'ACTIVE',
    joinedAt: 'June 25, 2025',
    lastActive: '2 min ago',
    suspensionReason: '',
  },
  {
    id: 'u-002',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'PATIENT',
    accountStatus: 'ACTIVE',
    joinedAt: 'January 15, 2026',
    lastActive: '8 min ago',
    suspensionReason: '',
  },
  {
    id: 'u-003',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'HEALTHCARE_PROVIDER',
    accountStatus: 'ACTIVE',
    joinedAt: 'January 12, 2026',
    lastActive: '15 min ago',
    suspensionReason: '',
  },
  {
    id: 'u-004',
    name: 'Precision Diagnostics Lab',
    email: 'admin@precisionlab.com',
    role: 'LAB',
    accountStatus: 'SUSPENDED',
    suspensionType: 'PERMANENT',
    joinedAt: 'January 10, 2026',
    lastActive: '1 hour ago',
    suspensionReason: 'Pending accreditation renewal review',
  },
  {
    id: 'u-005',
    name: 'Advanced Imaging Center',
    email: 'contact@advancedimaging.com',
    role: 'IMAGING_CENTER',
    accountStatus: 'ACTIVE',
    joinedAt: 'January 08, 2026',
    lastActive: '3 hours ago',
    suspensionReason: '',
  },
  {
    id: 'u-006',
    name: 'Amina Khaled',
    email: 'amina.khaled@example.com',
    role: 'PATIENT',
    accountStatus: 'SUSPENDED',
    suspensionType: 'TEMPORARY',
    joinedAt: 'December 22, 2025',
    lastActive: '2 days ago',
    suspensionReason: 'Repeated document upload failures',
  },
  {
    id: 'u-007',
    name: 'Dr. Robert Chen',
    email: 'robert.chen@example.com',
    role: 'HEALTHCARE_PROVIDER',
    accountStatus: 'ACTIVE',
    joinedAt: 'December 18, 2025',
    lastActive: '5 hours ago',
    suspensionReason: '',
  },
  {
    id: 'u-008',
    name: 'Dr. Maria Garcia',
    email: 'maria.garcia@example.com',
    role: 'IMAGING_CENTER',
    accountStatus: 'PENDING',
    joinedAt: 'December 15, 2025',
    lastActive: '1 day ago',
    suspensionReason: '',
  },
];

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

const columns = [
  {
    field: 'name',
    headerName: 'User',
    flex: 1.2,
    minWidth: 220,
    renderCell: ({ row }) => (
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontWeight: 800, wordBreak: 'break-word' }}>{row.name}</Typography>
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
    field: 'accountStatus',
    headerName: 'Status',
    flex: 0.8,
    minWidth: 140,
    renderCell: ({ value, row }) => {
      const style = statusStyles[value] || statusStyles.ACTIVE;
      return (
        <Stack spacing={0.25}>
          <Chip
            label={value}
            size="small"
            sx={{
              fontWeight: 700,
              bgcolor: style.bg,
              color: style.text,
              border: `1px solid ${style.border}`,
            }}
          />
          {row.suspensionReason ? (
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {row.suspensionReason}
            </Typography>
          ) : null}
        </Stack>
      );
    },
  },
  {
    field: 'joinedAt',
    headerName: 'Joined',
    flex: 0.8,
    minWidth: 130,
  },
  {
    field: 'lastActive',
    headerName: 'Last active',
    flex: 0.8,
    minWidth: 130,
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

  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [suspendTarget, setSuspendTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [suspensionMode, setSuspensionMode] = useState('TEMPORARY');
  const [suspensionReason, setSuspensionReason] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return users.filter((user) => {
      const matchesQuery =
        query === '' ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        (roleLabels[user.role] || user.role).toLowerCase().includes(query);

      const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'ALL' || user.accountStatus === statusFilter;

      return matchesQuery && matchesRole && matchesStatus;
    });
  }, [roleFilter, searchQuery, statusFilter, users]);

  const stats = useMemo(() => {
    return users.reduce(
      (acc, user) => {
        acc.total += 1;
        if (user.accountStatus === 'ACTIVE') acc.active += 1;
        if (user.accountStatus === 'SUSPENDED') acc.suspended += 1;
        if (user.role === 'ADMIN') acc.admins += 1;
        return acc;
      },
      { total: 0, active: 0, suspended: 0, admins: 0 }
    );
  }, [users]);

  const handleReset = () => {
    setSearchQuery('');
    setRoleFilter('ALL');
    setStatusFilter('ALL');
  };

  const handleSuspendClick = (user) => {
    setSuspendTarget(user);
    setSuspensionMode(user.suspensionType || 'TEMPORARY');
    setSuspensionReason(user.suspensionReason || '');
  };

  const handleDeleteClick = (user) => {
    setDeleteTarget(user);
  };

  const handleConfirmSuspend = () => {
    if (!suspendTarget) {
      return;
    }

    const reason = suspensionReason.trim();
    if (reason.length < 10) {
      setSnackbarMessage('Enter a suspension reason with at least 10 characters.');
      return;
    }

    setUsers((prev) =>
      prev.map((user) =>
        user.id === suspendTarget.id
          ? {
              ...user,
              accountStatus: 'SUSPENDED',
              suspensionType: suspensionMode,
              suspensionReason: reason,
            }
          : user
      )
    );

    setSnackbarMessage(`${suspendTarget.name} updated locally.`);
    setSuspendTarget(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) {
      return;
    }

    setUsers((prev) => prev.filter((user) => user.id !== deleteTarget.id));
    setSnackbarMessage(`${deleteTarget.name} removed from the local directory.`);
    setDeleteTarget(null);
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
          disabled={!isAdmin || isCurrentAdmin || row.accountStatus === 'SUSPENDED'}
          onClick={() => handleSuspendClick(row)}
          sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2 }}
        >
          Suspend
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          startIcon={<DeleteForeverIcon />}
          disabled={!isAdmin || isCurrentAdmin}
          onClick={() => handleDeleteClick(row)}
          sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2 }}
        >
          Delete
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
          description="Admin directory for browsing every account, filtering by role or status, and taking suspend or delete actions."
        />

        <Grid container spacing={2}>
          {summaryCards.map((card) => (
            <Grid key={card.label} size={{ xs: 12, sm: 6, lg: 3 }}>
              <SummaryCard
                label={card.label}
                value={card.label === 'Total users' ? stats.total : card.label === 'Active users' ? stats.active : card.label === 'Suspended users' ? stats.suspended : stats.admins}
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
                <MenuItem value="ACTIVE">Active</MenuItem>
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
          <DataGrid
            rows={filteredUsers}
            columns={actionColumns}
            disableRowSelectionOnClick
            checkboxSelection
          />
        </Paper>
      </Stack>

      <Dialog open={Boolean(suspendTarget)} onClose={() => setSuspendTarget(null)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 800 }}>Suspend user</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Alert severity="warning" icon={<ReportProblemOutlinedIcon />}>
              Suspension is applied locally for now. This is ready to connect to backend actions later.
            </Alert>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {suspendTarget?.name} will be updated as soon as you confirm the action.
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Suspension mode</InputLabel>
              <Select
                value={suspensionMode}
                label="Suspension mode"
                onChange={(event) => setSuspensionMode(event.target.value)}
              >
                <MenuItem value="TEMPORARY">Temporary suspension</MenuItem>
                <MenuItem value="PERMANENT">Permanent suspension</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Reason"
              placeholder="Write a clear suspension reason"
              multiline
              minRows={4}
              value={suspensionReason}
              onChange={(event) => setSuspensionReason(event.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setSuspendTarget(null)} sx={{ textTransform: 'none', fontWeight: 700 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmSuspend}
            startIcon={<BlockIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 800,
              borderRadius: 2,
              bgcolor: '#2563eb',
              '&:hover': { bgcolor: '#1d4ed8' },
              boxShadow: 'none',
            }}
          >
            Confirm suspend
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 800 }}>Delete user</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Alert severity="error" icon={<DeleteForeverIcon />}>
              This removes the user from the local list immediately.
            </Alert>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {deleteTarget?.name} ({deleteTarget?.email}) will be deleted from the system view.
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setDeleteTarget(null)} sx={{ textTransform: 'none', fontWeight: 700 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            startIcon={<DeleteForeverIcon />}
            sx={{ textTransform: 'none', fontWeight: 800, borderRadius: 2, boxShadow: 'none' }}
          >
            Delete user
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
