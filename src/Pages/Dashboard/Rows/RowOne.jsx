import { Box, Paper, Stack, Typography } from "@mui/material";
import Card from "../../../Conponents/Card";
import { DataOne, DataTwo, DataThree, DataFour } from "./Data";

export default function RowOne() {
  return (
    <>

      <Box sx={{ fontSize: 24, fontWeight: 700, mb: 2, color: 'var(--textColor)' }}>
        System Statistics
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
  icon={"bi bi-person-heart"}
  count={"1230"}
  label={"Patients"}
  colors={["#60a5fa", "#93c5fd", "#bfdbfe", "#a5b4fc"]} // أزرق Gradient
  bg={'var(--secondGrad)'}
/>

<Card
  icon={"fas fa-stethoscope"}
  count={"420"}
  label={"Healthcare Providers"}
  colors={["#4ade80", "#22d3ee", "#a7f3d0", "#86efac"]} // أخضر-أزرق Gradient
  bg={'var(--firstGrad)'}
/>


<Card
  icon={"bi bi-droplet-half"}
  count={"32"}
  label={"Laboratories"}
  colors={["#f472b6", "#f9a8d4", "#fbcfe8", "#fda4af"]} // وردي Gradient
  bg={'var(--thirdGrad)'}
/>

<Card
  icon={"bi bi-aspect-ratio"}
  count={"27"}
  label={"Imaging Centers"}
  colors={["#c084fc", "#ddd6fe", "#e9d5ff", "#d8b4fe"]} // بنفسجي Gradient
  bg={'var(--fourthGrad)'}
/>

    </Box>
    </>
   
  );
}
