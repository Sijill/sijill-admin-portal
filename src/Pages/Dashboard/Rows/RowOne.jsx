import { Box } from "@mui/material";
import Card from "../../../Components/Card";

export default function RowOne({ stats }) {
  const patients = stats?.patients ?? 0;
  const healthcareProviders = stats?.healthcareProviders ?? 0;
  const laboratories = stats?.laboratories ?? 0;
  const imagingCenters = stats?.imagingCenters ?? 0;

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
  count={patients}
  label={"Patients"}
  colors={["#60a5fa", "#93c5fd", "#bfdbfe", "#a5b4fc"]}
  bg={'var(--secondGrad)'}
/>

<Card
  icon={"fas fa-stethoscope"}
  count={healthcareProviders}
  label={"Healthcare Providers"}
  colors={["#4ade80", "#22d3ee", "#a7f3d0", "#86efac"]}
  bg={'var(--firstGrad)'}
/>


<Card
  icon={"bi bi-droplet-half"}
  count={laboratories}
  label={"Laboratories"}
  colors={["#f472b6", "#f9a8d4", "#fbcfe8", "#fda4af"]}
  bg={'var(--thirdGrad)'}
/>

<Card
  icon={"bi bi-aspect-ratio"}
  count={imagingCenters}
  label={"Imaging Centers"}
  colors={["#c084fc", "#ddd6fe", "#e9d5ff", "#d8b4fe"]}
  bg={'var(--fourthGrad)'}
/>

    </Box>
    </>
   
  );
}
