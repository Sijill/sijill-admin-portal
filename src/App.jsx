import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Drawer from "./Conponents/Drawer";
import Contact from "./Pages/Contact/Contact";
import Invoices from "./Pages/Audit-Logs/AuditLogs";
import Calendar from "./Pages/Calendar/Calendar";
import NewUser from "./Pages/NewUser/NewUser";
import Err404 from "./Conponents/Err404";
import VerificationQueue from "./Pages/verification-queue/verification_queue";
import PatientForm from "./Pages/verification-queue/patientForm";
import SuspendedUsers from "./Pages/Suspended-users/SuspendedUsers";
import AuditLogs from "./Pages/Audit-Logs/AuditLogs";
import Support from "./Pages/Support/Support";

const App = () => {
  return (
    <div>
      <Routes>
        {/* error  */}
        <Route path="*" element={<Err404 />} />

        <Route path="/" element={<Drawer />}>
          {/* data  */}
          <Route index element={<Dashboard />} />
          <Route path="verification_queue" element={<VerificationQueue />} />
          <Route path="patient-data/:id" element={<PatientForm />} />
          <Route path="suspended-users" element={<SuspendedUsers />} />
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="contact" element={<Contact />} />

          {/* user  */}
          <Route path="newuser" element={<NewUser />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="support" element={<Support />} />

        </Route>
      </Routes>
    </div>
  );
};

export default App;
