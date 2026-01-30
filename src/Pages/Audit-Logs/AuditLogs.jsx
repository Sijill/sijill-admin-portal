import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../Conponents/Header";
import { columns } from "./LogsData";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("YOUR_API_ENDPOINT/logs");
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  // Custom component for when the API returns no data
  const NoLogsMessage = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Typography variant="h6" color="textSecondary">
        There are no logs available.
      </Typography>
    </Box>
  );

  return (
    <Box m="20px">
      <Header title="Audit Logs" description="History of all administrative actions" />

      <Box
        sx={{
          height: "75vh",
          width: "100%",
          mt: 2,
          // Design alignment styles
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-columnHeaders": { 
            backgroundColor: "#f8f9fa", 
            borderBottom: "none",
            fontWeight: 800 
          },
          "& .MuiDataGrid-cell": { 
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            alignItems: "center" 
          },
        }}
      >
        <DataGrid
          rows={logs}
          columns={columns}
          loading={isLoading}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{
            noRowsOverlay: NoLogsMessage, // Shows your message if list is empty
          }}
        />
      </Box>
    </Box>
  );
}