import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Header from '../../Components/Header';

const supportChannels = [
  {
    title: 'Priority email',
    value: 'support@adminportal.local',
    description: 'Use for incidents that need a tracked response.',
    icon: EmailIcon,
    color: '#2563eb',
    bg: '#eff6ff',
  },
  {
    title: 'Operations line',
    value: '+20 100 000 0000',
    description: 'Escalation line for verification blockers and account issues.',
    icon: PhoneIcon,
    color: '#0f766e',
    bg: '#ecfeff',
  },
  {
    title: 'Team chat',
    value: 'Verification Ops',
    description: 'Best for quick coordination between reviewers.',
    icon: ChatBubbleOutlineIcon,
    color: '#7c3aed',
    bg: '#f5f3ff',
  },
];

const supportTickets = [
  {
    id: 1,
    title: 'Queue review blocked for patient documents',
    category: 'Verification',
    priority: 'High',
    owner: 'Amina Khaled',
    status: 'Open',
    updatedAt: '5 min ago',
  },
  {
    id: 2,
    title: 'Suspended user appeal awaiting response',
    category: 'Moderation',
    priority: 'Medium',
    owner: 'Mohamed Ibrahim',
    status: 'In progress',
    updatedAt: '18 min ago',
  },
  {
    id: 3,
    title: 'Calendar sync request for review meeting',
    category: 'Scheduling',
    priority: 'Low',
    owner: 'Sara Adel',
    status: 'Resolved',
    updatedAt: '1 hour ago',
  },
];

const faqs = [
  {
    question: 'How do I handle a user whose documents are incomplete?',
    answer:
      'Open the verification review, inspect the documents, and reject with a clear reason if the submission cannot be approved yet.',
  },
  {
    question: 'What should be escalated to the operations team?',
    answer:
      'Escalate account lockouts, repeated verification failures, missing document previews, and any issue that blocks a manual review.',
  },
  {
    question: 'How do I keep support work organized?',
    answer:
      'Use the ticket list, assign an owner, and update the status as the case moves from open to resolved.',
  },
  {
    question: 'Where should time-sensitive follow-ups live?',
    answer:
      'Put them on the calendar so verification review windows, support handoffs, and audit follow-ups stay visible.',
  },
];

const statusColorMap = {
  Open: { bg: '#fff7ed', text: '#c2410c', border: '#fdba74' },
  'In progress': { bg: '#eff6ff', text: '#1d4ed8', border: '#93c5fd' },
  Resolved: { bg: '#ecfdf5', text: '#047857', border: '#a7f3d0' },
};

const priorityColorMap = {
  High: { bg: '#fee2e2', text: '#b91c1c', border: '#fca5a5' },
  Medium: { bg: '#fff7ed', text: '#c2410c', border: '#fdba74' },
  Low: { bg: '#eff6ff', text: '#1d4ed8', border: '#93c5fd' },
};

export default function Support() {
  const [tickets, setTickets] = useState(supportTickets);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const summary = useMemo(() => {
    return tickets.reduce(
      (acc, ticket) => {
        acc.total += 1;
        if (ticket.status === 'Open') acc.open += 1;
        if (ticket.priority === 'High') acc.high += 1;
        return acc;
      },
      { total: 0, open: 0, high: 0 }
    );
  }, [tickets]);

  const handleAdvanceStatus = (ticketId) => {
    setTickets((prev) =>
      prev.map((ticket) => {
        if (ticket.id !== ticketId) {
          return ticket;
        }

        const nextStatus = ticket.status === 'Open' ? 'In progress' : ticket.status === 'In progress' ? 'Resolved' : 'Resolved';
        return { ...ticket, status: nextStatus };
      })
    );
    setSnackbarMessage('Ticket status updated locally.');
  };

  const handleEscalate = (ticketId) => {
    const ticket = tickets.find((item) => item.id === ticketId);
    setSnackbarMessage(`${ticket?.title || 'Ticket'} escalated to the operations queue.`);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Stack spacing={3}>
        <Header
          title="Support"
          description="Admin support hub for verification issues, escalations, and operational follow-up."
        />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: '#fff' }}>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800 }}>
                Open tickets
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5 }}>
                {summary.total}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                Work items currently tracked by the support desk.
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: '#fff' }}>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800 }}>
                Needs attention
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: '#b91c1c' }}>
                {summary.open}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                Cases still waiting on a reviewer or support owner.
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: '#fff' }}>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800 }}>
                High priority
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: '#c2410c' }}>
                {summary.high}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                Tickets that should stay at the front of the queue.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: '#fff' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
            Support channels
          </Typography>
          <Grid container spacing={2}>
            {supportChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <Grid key={channel.title} size={{ xs: 12, md: 4 }}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: channel.bg,
                      borderColor: 'transparent',
                      height: '100%',
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.25 }}>
                      <Avatar sx={{ bgcolor: '#fff', color: channel.color, width: 42, height: 42 }}>
                        <Icon fontSize="small" />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                          {channel.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {channel.value}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {channel.description}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: '#fff' }}>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={1.5} sx={{ mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Current support tickets
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Lightweight local workflow for ticket ownership and escalation.
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<TaskAltIcon />}
              onClick={() => setSnackbarMessage('New ticket workflow is ready for backend integration.')}
              sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
            >
              Create ticket
            </Button>
          </Stack>

          <Stack spacing={1.5}>
            {tickets.map((ticket) => {
              const statusStyle = statusColorMap[ticket.status];
              const priorityStyle = priorityColorMap[ticket.priority];

              return (
                <Paper
                  key={ticket.id}
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    borderColor: '#e2e8f0',
                    transition: 'transform 180ms ease, box-shadow 180ms ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0px 10px 26px rgba(15, 23, 42, 0.08)',
                    },
                  }}
                >
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'stretch', md: 'center' }}>
                    <Box sx={{ minWidth: 0 }}>
                      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
                        <Chip label={ticket.category} size="small" />
                        <Chip
                          label={ticket.priority}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            bgcolor: priorityStyle.bg,
                            color: priorityStyle.text,
                            border: `1px solid ${priorityStyle.border}`,
                          }}
                        />
                        <Chip
                          label={ticket.status}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            bgcolor: statusStyle.bg,
                            color: statusStyle.text,
                            border: `1px solid ${statusStyle.border}`,
                          }}
                        />
                      </Stack>

                      <Typography variant="subtitle1" sx={{ fontWeight: 800, wordBreak: 'break-word' }}>
                        {ticket.title}
                      </Typography>

                      <Stack direction="row" spacing={2} sx={{ mt: 1 }} flexWrap="wrap">
                        <Stack direction="row" spacing={0.75} alignItems="center">
                          <SupportAgentIcon sx={{ fontSize: 18, color: '#64748b' }} />
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Owner: {ticket.owner}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.75} alignItems="center">
                          <AccessTimeIcon sx={{ fontSize: 18, color: '#64748b' }} />
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Updated: {ticket.updatedAt}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
                      <Button
                        variant="contained"
                        onClick={() => handleAdvanceStatus(ticket.id)}
                        sx={{
                          textTransform: 'none',
                          borderRadius: 2,
                          fontWeight: 700,
                          bgcolor: '#2563eb',
                          '&:hover': { bgcolor: '#1d4ed8' },
                          boxShadow: 'none',
                        }}
                      >
                        Advance
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<ReportProblemIcon />}
                        onClick={() => handleEscalate(ticket.id)}
                        sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 700 }}
                      >
                        Escalate
                      </Button>
                    </Stack>
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: '#fff' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
            Common questions
          </Typography>
          <Stack spacing={1.5}>
            {faqs.map((faq) => (
              <Accordion
                key={faq.question}
                sx={{
                  borderRadius: 2,
                  boxShadow: 'none',
                  border: '1px solid #e2e8f0',
                  '&:before': { display: 'none' },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 700 }}>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Paper>
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
