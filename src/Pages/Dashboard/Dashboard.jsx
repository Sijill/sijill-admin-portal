import { useEffect, useState } from "react";
import { Button, Box, CircularProgress, Alert } from "@mui/material";
import RowOne from "./Rows/RowOne";
import RowTwo from "./Rows/RowTwo";
import Header from "../../Components/Header";
import { getAdminActivitiesRequest, getAdminStatsRequest } from "../../services/admin.api";
import { getApiErrorMessage } from "../../services/auth.api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const [statsResponse, activitiesResponse] = await Promise.all([
          getAdminStatsRequest(),
          getAdminActivitiesRequest(),
        ]);

        setStats(statsResponse);
        setActivities(activitiesResponse);
      } catch (error) {
        console.error('Dashboard load error:', error);
        setError(getApiErrorMessage(error, "Failed to load dashboard data."));
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Header title={"Dashboard"} description={"Welcome to your dashboard"} />
      <Box sx={{ textAlign: "right" }}>
        <Button
          variant="contained"
          sx={{
            textTransform: "capitalize",
            backgroundImage: "var(--secondGrad)",
            boxShadow: 0,
          }}
        >
          <i className="bi bi-download me-2 text-[16px]"></i> Download Reports
        </Button>
      </Box>
      <RowOne stats={stats} />
      <RowTwo activities={activities} />
    </Box>
  );
}