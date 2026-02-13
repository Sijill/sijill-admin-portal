import { Box, Typography } from "@mui/material";

export default function Header(props) {
  return (
    <Box className='mb-5'>
      <Typography variant="h5" sx={{ color: "var(--main-color)"}}>
        {props.title}
      </Typography>
      <Typography variant="body1">{props.description}</Typography>
    </Box>
  );
}
