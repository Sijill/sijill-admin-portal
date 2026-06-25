import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  TextField, 
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  CircularProgress,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import Queueitem from './queueItem';
import { getVerificationQueueRequest } from '../../services/admin.api';


export default function VerificationQueue() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const fetchVerificationQueue = async (reset = false) => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        limit: 20,
        ...(roleFilter !== 'ALL' && { role: roleFilter }),
        ...(cursor && !reset && { cursor })
      };

      const response = await getVerificationQueueRequest(params);
      const { data, pagination } = response;

      if (reset) {
        setPendingUsers(data);
      } else {
        setPendingUsers(prev => [...prev, ...data]);
      }

      setCursor(pagination.nextCursor);
      setHasMore(pagination.hasMore);
    } catch (err) {
      console.error('Error fetching verification queue:', err);
      setError(err.response?.data?.message || 'Failed to load verification queue');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchVerificationQueue(true);
  }, [roleFilter]);
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(pendingUsers);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = pendingUsers.filter(user => 
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, pendingUsers]);
  const handleReload = () => {
    setCursor(null);
    fetchVerificationQueue(true);
  };
  const getRoleDisplay = (role) => {
    const roleMap = {
      'PATIENT': 'Patient',
      'HEALTHCARE_PROVIDER': 'Healthcare Provider',
      'LAB': 'Laboratory',
      'IMAGING_CENTER': 'Imaging Center'
    };
    return roleMap[role] || role;
  };
  const getRoleIcon = (role) => {
    const iconMap = {
      'PATIENT': { icon: 'bi bi-person', bg: '#dbeafe' },
      'HEALTHCARE_PROVIDER': { icon: 'bi bi-heart-pulse-fill', bg: '#f3e8ff' },
      'LAB': { icon: 'bi bi-flask', bg: '#fff7ed' },
      'IMAGING_CENTER': { icon: 'bi bi-camera', bg: '#dcfce7' }
    };
    return iconMap[role] || { icon: 'bi bi-person', bg: '#f3f4f6' };
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#fcfcfc", minHeight: "100vh" }}>
      
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ bgcolor: '#dbeafe', width: 60, height: 60 }}>
            <i className="bi bi-shield-check" style={{ color: '#2563eb', fontSize: '1.8rem' }}></i>
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'serif' }}>
            Verification Queue
          </Typography>
        </Box>

        
        <IconButton 
          onClick={handleReload}
          disabled={loading}
          sx={{ 
            bgcolor: '#2563eb', 
            color: 'white',
            '&:hover': { bgcolor: '#1d4ed8' },
            '&:disabled': { bgcolor: '#e0e0e0' }
          }}
        >
          <RefreshIcon />
        </IconButton>
      </Box>

      
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        
        <TextField
          fullWidth
          placeholder="Search by email or role..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            flex: 1,
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

        
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel>Filter by Role</InputLabel>
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            label="Filter by Role"
            sx={{
              borderRadius: '12px',
              bgcolor: '#fff',
              height: '50px'
            }}
          >
            <MenuItem value="ALL">All Roles</MenuItem>
            <MenuItem value="PATIENT">Patient</MenuItem>
            <MenuItem value="HEALTHCARE_PROVIDER">Healthcare Provider</MenuItem>
            <MenuItem value="LAB">Laboratory</MenuItem>
            <MenuItem value="IMAGING_CENTER">Imaging Center</MenuItem>
          </Select>
        </FormControl>
      </Box>

      
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
          {error}
        </Alert>
      )}

      
      {loading && pendingUsers.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {filteredUsers.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="textSecondary">
                  {searchQuery ? 'No users found matching your search' : 'No pending verifications'}
                </Typography>
              </Box>
            ) : (
              filteredUsers.map((user) => {
                const roleIcon = getRoleIcon(user.role);
                return (
                  <Queueitem
                    key={user.id}
                    id={user.id}
                    email={user.email}
                    role={getRoleDisplay(user.role)}
                    date={new Date(user.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    icon={roleIcon.icon}
                    iconBg={roleIcon.bg}
                  />
                );
              })
            )}
          </Box>

          
          {hasMore && !searchQuery && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <button
                onClick={() => fetchVerificationQueue(false)}
                disabled={loading}
                style={{
                  padding: '12px 32px',
                  borderRadius: '12px',
                  border: '2px solid #2563eb',
                  background: 'white',
                  color: '#2563eb',
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}