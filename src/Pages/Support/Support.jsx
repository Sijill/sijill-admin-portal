import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import Header from "../../Components/Header";

export default function Support() {
  return (
    <Box>
      <Header
        title={"Support"}
        description={"Frequently Asked Questions About the Admin Dashboard"}
      />

      <Stack sx={{ gap: 1.5 }}>
        <Accordion
          sx={{
            borderRadius: "16px",
            boxShadow: "var(--secondary-shadow)",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">
              How can I log in to the dashboard?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            You can log in using your registered email and password. If you
            forgot your password, click on **“Forgot Password?”** and follow the
            steps to reset it.
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            borderRadius: "16px",
            boxShadow: "var(--secondary-shadow)",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">
              How do I add a new user to the system?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Go to the **Users** page from the sidebar, then click **“Add New
            User”**. Fill in the required fields such as name, email, and role,
            then click **Save**.
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            borderRadius: "16px",
            boxShadow: "var(--secondary-shadow)",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">
              What are the different user roles available?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            There are typically three main roles: - **Admin:** Full access to
            all pages and settings. - **Editor:** Can edit content and manage
            users but cannot change system settings. - **Viewer:** Can only view
            data without making any changes.
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            borderRadius: "16px",
            boxShadow: "var(--secondary-shadow)",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">
              How can I add or delete events from the calendar?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            To add an event, simply click on a date in the calendar, enter a
            title in the popup, and save. To delete, click on an existing event
            and confirm the deletion.
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            borderRadius: "16px",
            boxShadow: "var(--secondary-shadow)",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">
              How do I manage or view user contacts?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Navigate to the **Contacts** section. There you can view, filter,
            and manage all user contact information. You can also export the
            contacts as a CSV file if needed.
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            borderRadius: "16px",
            boxShadow: "var(--secondary-shadow)",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">
              Can I export reports or analytics?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Yes! Go to the **Reports** section and click the **Export** button.
            You can export data as **PDF**, **Excel**, or **CSV** format.
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            borderRadius: "16px",
            boxShadow: "var(--secondary-shadow)",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">
              How can I update my profile or system settings?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Click your avatar at the top-right corner, then choose **Profile**
            or **Settings**. You can update personal information, change your
            password, or modify system preferences from there.
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            borderRadius: "16px",
            boxShadow: "var(--secondary-shadow)",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">
              How can I contact support if something goes wrong?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            You can reach our support team through the **Help & Support** page
            in the sidebar or by emailing **support@admindashboard.com**. We
            usually respond within 24 hours.
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Box>
  );
}
