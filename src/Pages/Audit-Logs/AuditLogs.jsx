import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../../Components/Header';
import { auditLogRows, columns } from './LogsData';

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');

  const rows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return auditLogRows.filter((row) => {
      const matchesQuery =
        query === '' ||
        row.action.toLowerCase().includes(query) ||
        row.targetUser.toLowerCase().includes(query) ||
        row.admin.toLowerCase().includes(query) ||
        row.details.toLowerCase().includes(query);
      const matchesAction = actionFilter === 'ALL' || row.action === actionFilter;
      return matchesQuery && matchesAction;
    });
  }, [actionFilter, searchQuery]);

  const resetFilters = () => {
    setSearchQuery('');
    setActionFilter('ALL');
  };

  const NoLogsMessage = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Typography variant="h6" color="text.secondary">
        There are no logs available.
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Stack spacing={2.5}>
        <Header title="Audit Logs" description="History of administrative actions captured locally for now." />

        <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, bgcolor: '#fff' }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }}>
            <TextField
              fullWidth
              placeholder="Search by action, target user, admin, or details"
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
              <InputLabel>Action</InputLabel>
              <Select
                value={actionFilter}
                onChange={(event) => setActionFilter(event.target.value)}
                label="Action"
                sx={{ borderRadius: '12px', bgcolor: '#fff', height: '50px' }}
              >
                <MenuItem value="ALL">All actions</MenuItem>
                <MenuItem value="Verified">Verified</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
                <MenuItem value="Suspended">Suspended</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<RefreshRoundedIcon />}
              onClick={resetFilters}
              sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, minWidth: 150 }}
            >
              Reset
            </Button>
          </Stack>
        </Paper>

        <Paper
          variant="outlined"
          sx={{
            height: '75vh',
            width: '100%',
            borderRadius: 3,
            overflow: 'hidden',
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
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            checkboxSelection
            slots={{
              noRowsOverlay: NoLogsMessage,
            }}
          />
        </Paper>
      </Stack>
    </Box>
  );
}
