import { Box, Paper, Stack, Typography } from "@mui/material";

export default function Card({ icon, count, label, bg }) {
  return (
    <Paper
      sx={{
        backgroundImage: bg,
        borderRadius: "20px",
        boxShadow: "var(--main-shadow)",
        color: "#fff",
        p: 3,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Icon */}
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: "14px",
            backgroundColor: "rgba(255,255,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
          }}
        >
          <i className={icon}></i>
        </Box>

        {/* Text */}
        <Box>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              opacity: 0.9,
            }}
          >
            {label}
          </Typography>

          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {count}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
