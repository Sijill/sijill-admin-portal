import { Box, Paper, Stack, Typography } from "@mui/material";
import Card from "../../../Conponents/Card";
import { DataOne, DataTwo, DataThree, DataFour } from "./Data";

export default function RowOne() {
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
  count={"32"}
  label={"Verified Users"}
  colors={["#22c55e"]} // أخضر Gradient
  bg={'var(--firstGrad)'}
/>

<Card
  icon={"bi bi-x-circle"}
  count={"27"}
  label={"Regicted Users"}
 colors={["#f472b6", "#f9a8d4", "#fbcfe8", "#fda4af"]} // وردي Gradient
  bg={'var(--thirdGrad)'}
/>



    </Box>
      </>
  );
}
