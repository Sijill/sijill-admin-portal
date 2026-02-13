import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  getVerificationDetailsRequest,
  getDocumentRequest,
  makeVerificationDecisionRequest,
} from '../../services/admin.api';
import { getApiErrorMessage } from '../../services/auth.api';

const roleLabel = {
  PATIENT: 'Patient',
  HEALTHCARE_PROVIDER: 'Healthcare Provider',
  LAB: 'Laboratory',
  IMAGING_CENTER: 'Imaging Center',
};

const documentTypeLabel = {
  NATIONAL_ID_FRONT: 'National ID (Front)',
  NATIONAL_ID_BACK: 'National ID (Back)',
  SELFIE_WITH_ID: 'Selfie With ID',
  MEDICAL_LICENSE: 'Medical License',
  WORKPLACE_DOC: 'Workplace Document',
  LAB_ACCREDITATION: 'Lab Accreditation',
  RADIOLOGY_ACCREDITATION: 'Radiology Accreditation',
  LOGO: 'Logo',
};

function formatDate(value) {
  if (!value) {
    return '-';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return date.toLocaleString();
}

function formatFileSize(size) {
  const bytes = Number(size);
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '-';
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

function DetailField({ label, value }) {
  return (
    <Box>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {value || '-'}
      </Typography>
    </Box>
  );
}

function RoleSpecificSection({ role, data }) {
  if (!data) {
    return null;
  }

  if (role === 'PATIENT') {
    return (
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}><DetailField label="First Name" value={data.first_name} /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><DetailField label="Middle Name" value={data.middle_name} /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><DetailField label="Surname" value={data.surname} /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><DetailField label="Gender" value={data.gender} /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><DetailField label="Date of Birth" value={formatDate(data.date_of_birth)} /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><DetailField label="National ID" value={data.national_id} /></Grid>
      </Grid>
    );
  }

  if (role === 'HEALTHCARE_PROVIDER') {
    return (
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}><DetailField label="First Name" value={data.first_name} /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><DetailField label="Middle Name" value={data.middle_name} /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><DetailField label="Surname" value={data.surname} /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><DetailField label="Gender" value={data.gender} /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><DetailField label="Date of Birth" value={formatDate(data.date_of_birth)} /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><DetailField label="National ID" value={data.national_id} /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><DetailField label="Medical License #" value={data.medical_license_number} /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><DetailField label="Specialization" value={data.specialization} /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><DetailField label="Workplace Name" value={data.workplace_name} /></Grid>
        <Grid size={{ xs: 12, md: 12 }}><DetailField label="Workplace Address" value={data.workplace_address} /></Grid>
      </Grid>
    );
  }

  if (role === 'LAB') {
    return (
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}><DetailField label="Lab Name" value={data.lab_name} /></Grid>
        <Grid size={{ xs: 12, md: 6 }}><DetailField label="Registration #" value={data.registration_number} /></Grid>
        <Grid size={{ xs: 12, md: 6 }}><DetailField label="Administrator" value={data.administrator_full_name} /></Grid>
        <Grid size={{ xs: 12, md: 6 }}><DetailField label="Lab Address" value={data.lab_address} /></Grid>
      </Grid>
    );
  }

  if (role === 'IMAGING_CENTER') {
    return (
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}><DetailField label="Center Name" value={data.center_name} /></Grid>
        <Grid size={{ xs: 12, md: 6 }}><DetailField label="Registration #" value={data.registration_number} /></Grid>
        <Grid size={{ xs: 12, md: 6 }}><DetailField label="Administrator" value={data.administrator_full_name} /></Grid>
        <Grid size={{ xs: 12, md: 6 }}><DetailField label="Center Address" value={data.center_address} /></Grid>
      </Grid>
    );
  }

  return null;
}

function DocumentCard({ doc, onView, onDownload, busyAction }) {
  const isImage = String(doc.mimeType || '').startsWith('image/');

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
      <Stack spacing={1.25}>
        <Stack direction="row" spacing={1} alignItems="center">
          <DescriptionOutlinedIcon fontSize="small" />
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {documentTypeLabel[doc.fileType] || doc.fileType || 'Document'}
          </Typography>
        </Stack>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {doc.fileName || '-'}
        </Typography>

        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {doc.mimeType || '-'} | {formatFileSize(doc.fileSizeBytes)} | Uploaded: {formatDate(doc.uploadedAt)}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<OpenInNewIcon />}
            disabled={!isImage || busyAction}
            onClick={() => onView(doc)}
          >
            View
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<DownloadIcon />}
            disabled={busyAction}
            onClick={() => onDownload(doc)}
          >
            Download
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default function PatientForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [busyDocumentId, setBusyDocumentId] = useState('');
  const [decision, setDecision] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmittingDecision, setIsSubmittingDecision] = useState(false);

  const documents = useMemo(() => {
    if (!details?.documents) {
      return [];
    }

    return [
      ...(details.documents.identity || []),
      ...(details.documents.workplace || []),
      ...(details.documents.other || []),
    ];
  }, [details]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await getVerificationDetailsRequest(id);
        if (!cancelled) {
          setDetails(response);
        }
      } catch (err) {
        if (!cancelled) {
          setError(getApiErrorMessage(err, 'Failed to load verification details.'));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    if (id) {
      load();
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  const downloadBlob = (blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName || 'document';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  const openBlob = (blob) => {
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank', 'noopener,noreferrer');
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  };

  const handleView = async (doc) => {
    setBusyDocumentId(doc.id);
    try {
      const blob = await getDocumentRequest(doc.id);
      openBlob(blob);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to open document.'));
    } finally {
      setBusyDocumentId('');
    }
  };

  const handleDownload = async (doc) => {
    setBusyDocumentId(doc.id);
    try {
      const blob = await getDocumentRequest(doc.id);
      downloadBlob(blob, doc.fileName);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to download document.'));
    } finally {
      setBusyDocumentId('');
    }
  };

  const handleSubmitDecision = async (selectedDecision) => {
    setError('');
    setSuccessMessage('');

    if (selectedDecision === 'REJECT' && rejectionReason.trim().length < 10) {
      setError('Rejection reason must be at least 10 characters.');
      return;
    }

    setIsSubmittingDecision(true);
    try {
      const payload = {
        userId: id,
        decision: selectedDecision,
        ...(selectedDecision === 'REJECT' && { rejectionReason: rejectionReason.trim() }),
      };

      const response = await makeVerificationDecisionRequest(payload);
      setSuccessMessage(response?.message || `Decision ${selectedDecision} submitted successfully.`);
      setTimeout(() => {
        navigate('/verification_queue', { replace: true });
      }, 900);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to submit verification decision.'));
    } finally {
      setIsSubmittingDecision(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !details) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const user = details?.user || {};

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#fcfcfc', minHeight: '100vh' }}>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/verification_queue')}
            >
              Back
            </Button>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Verification Review
            </Typography>
          </Stack>
          <Chip
            label={roleLabel[user.role] || user.role || 'Unknown Role'}
            color="primary"
            variant="outlined"
          />
        </Stack>

        {error ? <Alert severity="error">{error}</Alert> : null}
        {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Account</Typography>
            <Divider />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}><DetailField label="Email" value={user.email} /></Grid>
              <Grid size={{ xs: 12, md: 4 }}><DetailField label="Phone" value={user.phone_number} /></Grid>
              <Grid size={{ xs: 12, md: 4 }}><DetailField label="Status" value={user.account_status} /></Grid>
              <Grid size={{ xs: 12, md: 4 }}><DetailField label="Email Verified" value={String(user.email_verified)} /></Grid>
              <Grid size={{ xs: 12, md: 4 }}><DetailField label="Submitted At" value={formatDate(user.created_at)} /></Grid>
              <Grid size={{ xs: 12, md: 4 }}><DetailField label="Last Updated" value={formatDate(details?.metadata?.lastUpdated)} /></Grid>
            </Grid>
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Registration Details</Typography>
            <Divider />
            <RoleSpecificSection role={user.role} data={details?.roleSpecificData} />
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Documents ({details?.metadata?.totalDocuments ?? documents.length})
            </Typography>
            <Divider />

            {documents.length === 0 ? (
              <Alert severity="info">No documents found for this user.</Alert>
            ) : (
              <Grid container spacing={2}>
                {documents.map((doc) => (
                  <Grid key={doc.id} size={{ xs: 12, md: 6 }}>
                    <DocumentCard
                      doc={doc}
                      onView={handleView}
                      onDownload={handleDownload}
                      busyAction={busyDocumentId === doc.id}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Decision</Typography>
            <Divider />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button
                variant={decision === 'APPROVE' ? 'contained' : 'outlined'}
                color="success"
                disabled={isSubmittingDecision}
                onClick={() => setDecision('APPROVE')}
              >
                Verify
              </Button>
              <Button
                variant={decision === 'REJECT' ? 'contained' : 'outlined'}
                color="error"
                disabled={isSubmittingDecision}
                onClick={() => setDecision('REJECT')}
              >
                Reject
              </Button>
            </Stack>

            {decision === 'REJECT' ? (
              <TextField
                label="Rejection Reason"
                placeholder="Write rejection reason (minimum 10 characters)"
                multiline
                minRows={3}
                value={rejectionReason}
                onChange={(event) => setRejectionReason(event.target.value)}
                error={rejectionReason.length > 0 && rejectionReason.trim().length < 10}
                helperText={
                  rejectionReason.length > 0 && rejectionReason.trim().length < 10
                    ? 'Minimum 10 characters required.'
                    : ''
                }
              />
            ) : null}

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button
                variant="contained"
                color={decision === 'REJECT' ? 'error' : 'primary'}
                disabled={isSubmittingDecision || !decision}
                onClick={() => handleSubmitDecision(decision)}
              >
                {isSubmittingDecision ? 'Submitting...' : 'Submit Decision'}
              </Button>
              <Button
                variant="outlined"
                disabled={isSubmittingDecision}
                onClick={() => {
                  setDecision('');
                  setRejectionReason('');
                }}
              >
                Reset
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
