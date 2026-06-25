import { useMemo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { formatDate } from '@fullcalendar/core';
import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Header from '../../Components/Header';

const initialEvents = [
  {
    id: '1',
    title: 'Verification review block',
    start: new Date().toISOString().slice(0, 10),
    allDay: true,
    extendedProps: { type: 'Verification', owner: 'Team A' },
  },
  {
    id: '2',
    title: 'Audit log follow-up',
    start: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    allDay: true,
    extendedProps: { type: 'Audit', owner: 'Mohamed Ibrahim' },
  },
  {
    id: '3',
    title: 'Support handoff sync',
    start: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
    allDay: true,
    extendedProps: { type: 'Support', owner: 'Operations' },
  },
];

const typeStyles = {
  Verification: { bg: '#eff6ff', text: '#1d4ed8', border: '#93c5fd' },
  Audit: { bg: '#f5f3ff', text: '#6d28d9', border: '#c4b5fd' },
  Support: { bg: '#ecfdf5', text: '#047857', border: '#a7f3d0' },
  Planning: { bg: '#fff7ed', text: '#c2410c', border: '#fdba74' },
};

function renderEventContent(eventInfo) {
  const eventType = eventInfo.event.extendedProps.type || 'Planning';
  const style = typeStyles[eventType] || typeStyles.Planning;

  return (
    <Box
      sx={{
        fontSize: '12px',
        lineHeight: 1.2,
        px: 0.5,
        py: 0.25,
        color: style.text,
      }}
    >
      <Typography variant="caption" sx={{ fontWeight: 800, color: style.text, display: 'block' }}>
        {eventInfo.timeText}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 700, wordBreak: 'break-word' }}>
        {eventInfo.event.title}
      </Typography>
    </Box>
  );
}

function UpcomingEvent({ event, onDelete }) {
  const eventType = event.extendedProps.type || 'Planning';
  const style = typeStyles[eventType] || typeStyles.Planning;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1.5,
        borderRadius: 2,
        bgcolor: '#fff',
        borderColor: '#e2e8f0',
      }}
    >
      <Stack spacing={0.8}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, wordBreak: 'break-word' }}>
              {event.title}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
              {formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}
            </Typography>
          </Box>
          <Button
            size="small"
            color="error"
            onClick={() => onDelete(event.id)}
            startIcon={<DeleteOutlineIcon />}
            sx={{ textTransform: 'none', minWidth: 'auto' }}
          >
            Delete
          </Button>
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip
            label={eventType}
            size="small"
            sx={{
              fontWeight: 700,
              bgcolor: style.bg,
              color: style.text,
              border: `1px solid ${style.border}`,
            }}
          />
          <Chip
            label={event.extendedProps.owner || 'Unassigned'}
            size="small"
            variant="outlined"
          />
        </Stack>
      </Stack>
    </Paper>
  );
}

const Calendar = () => {
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('Verification');
  const [eventOwner, setEventOwner] = useState('Operations');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const currentEvents = useMemo(() => {
    return [...events].sort((a, b) => new Date(a.start) - new Date(b.start));
  }, [events]);

  const stats = useMemo(() => {
    return events.reduce(
      (acc, event) => {
        acc.total += 1;
        const type = event.extendedProps.type || 'Planning';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      },
      { total: 0, Verification: 0, Audit: 0, Support: 0 }
    );
  }, [events]);

  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo.startStr.slice(0, 10));
    setSnackbarMessage('Date selected for a new scheduling item.');
  };

  const handleAddEvent = () => {
    if (!selectedDate || !eventTitle.trim()) {
      setSnackbarMessage('Choose a date and add a title first.');
      return;
    }

    setEvents((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        title: eventTitle.trim(),
        start: selectedDate,
        allDay: true,
        extendedProps: { type: eventType, owner: eventOwner.trim() || 'Operations' },
      },
    ]);

    setEventTitle('');
    setEventOwner('Operations');
    setSnackbarMessage('Schedule item created locally.');
  };

  const handleEventClick = (clickInfo) => {
    const shouldDelete = window.confirm(`Delete event "${clickInfo.event.title}"?`);
    if (shouldDelete) {
      clickInfo.event.remove();
      setEvents((prev) => prev.filter((event) => event.id !== clickInfo.event.id));
      setSnackbarMessage('Event removed from the calendar.');
    }
  };

  const handleDeleteFromSidebar = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
    setSnackbarMessage('Event removed from the sidebar list.');
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Stack spacing={3}>
        <Header
          title="Calendar"
          description="Operational calendar for verification reviews, audit follow-ups, and support handoffs."
        />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: '#fff' }}>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800 }}>
                Total items
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5 }}>
                {stats.total}
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: '#fff' }}>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800 }}>
                Verification
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: '#1d4ed8' }}>
                {stats.Verification}
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: '#fff' }}>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800 }}>
                Audit
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: '#6d28d9' }}>
                {stats.Audit}
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: '#fff' }}>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800 }}>
                Support
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: '#047857' }}>
                {stats.Support}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 3 }}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, bgcolor: '#fff', height: '100%' }}>
              <Stack spacing={2}>
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Avatar sx={{ bgcolor: '#eff6ff', color: '#2563eb', width: 36, height: 36 }}>
                      <AddTaskIcon fontSize="small" />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      Add schedule item
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Select a date on the calendar, then create a review or follow-up item.
                  </Typography>
                </Box>

                <TextField
                  label="Selected date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
                <TextField
                  label="Title"
                  placeholder="e.g. Weekly verification review"
                  value={eventTitle}
                  onChange={(event) => setEventTitle(event.target.value)}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={eventType}
                    label="Type"
                    onChange={(event) => setEventType(event.target.value)}
                  >
                    <MenuItem value="Verification">Verification</MenuItem>
                    <MenuItem value="Audit">Audit</MenuItem>
                    <MenuItem value="Support">Support</MenuItem>
                    <MenuItem value="Planning">Planning</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Owner"
                  placeholder="Operations, reviewer, or team name"
                  value={eventOwner}
                  onChange={(event) => setEventOwner(event.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={handleAddEvent}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    fontWeight: 700,
                    bgcolor: '#2563eb',
                    '&:hover': { bgcolor: '#1d4ed8' },
                    boxShadow: 'none',
                  }}
                >
                  Save event
                </Button>
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: '#fff',
                boxShadow: 'none',
                border: '1px solid #e2e8f0',
                '& .fc-toolbar': {
                  flexWrap: 'wrap',
                  gap: 10,
                },
                '& .fc-toolbar-title': {
                  width: '100%',
                  textAlign: 'center',
                  color: '#0f172a',
                  fontWeight: 700,
                },
                '& .fc-button': {
                  background: 'transparent',
                  border: '1px solid #cbd5e1',
                  color: '#0f172a',
                  borderRadius: '10px',
                  fontSize: { xs: '11px', sm: '13px' },
                  padding: '4px 8px',
                  boxShadow: 'none',
                },
                '& .fc-theme-standard td, & .fc-theme-standard th': {
                  border: '1px solid #e2e8f0',
                },
                '& .fc-event': {
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0px 8px 18px rgba(15, 23, 42, 0.08)',
                },
                '& .fc-daygrid-event': {
                  cursor: 'pointer',
                },
              }}
            >
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                initialView="dayGridMonth"
                height="auto"
                editable
                selectable
                selectMirror
                dayMaxEvents
                select={handleDateSelect}
                eventContent={renderEventContent}
                eventClick={handleEventClick}
                events={events}
              />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, lg: 3 }}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, bgcolor: '#fff', height: '100%' }}>
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar sx={{ bgcolor: '#f5f3ff', color: '#6d28d9', width: 36, height: 36 }}>
                    <EventIcon fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      Upcoming items
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Sorted by date
                    </Typography>
                  </Box>
                </Stack>

                <Stack spacing={1.25} sx={{ maxHeight: 620, overflowY: 'auto', pr: 0.5 }}>
                  {currentEvents.map((event) => (
                    <UpcomingEvent key={event.id} event={event} onDelete={handleDeleteFromSidebar} />
                  ))}
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Stack>

      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={2500}
        onClose={() => setSnackbarMessage('')}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default Calendar;
