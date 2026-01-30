import { Button, Box, Typography } from "@mui/material";
import RowOne from "./Rows/RowOne";
import RowTwo from "./Rows/RowTwo";
import Header from "../../Conponents/Header";

export default function Dashboard() {
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
      <RowOne />
      <RowTwo />
    </Box>
  );
}
