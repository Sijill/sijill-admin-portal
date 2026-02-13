import { Box } from "@mui/material";
import Card from "../../../Components/Card";

export default function RowTwo({ activities }) {
  const verifiedUsers = activities?.verifiedUsers ?? 0;
  const rejectedUsers = activities?.rejectedUsers ?? 0;

  return (
    
    <>

      <Box sx={{ fontSize: 24, fontWeight: 700, mt: 10, mb: 2, color: 'var(--textColor)' }}>
        Recent Activities
      </Box>

      <Box
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-4
        mt-5
      "
    >


<Card
  icon={"bi bi-check2-circle"}
  count={verifiedUsers}
  label={"Verified Users"}
  colors={["#22c55e"]}
  bg={'var(--firstGrad)'}
/>

<Card
  icon={"bi bi-x-circle"}
  count={rejectedUsers}
  label={"Regicted Users"}
 colors={["#f472b6", "#f9a8d4", "#fbcfe8", "#fda4af"]}
  bg={'var(--thirdGrad)'}
/>



    </Box>
      </>
  );
}
