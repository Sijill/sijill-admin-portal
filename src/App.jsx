import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Drawer from "./Components/Drawer";
import Contact from "./Pages/Contact/Contact";
import Calendar from "./Pages/Calendar/Calendar";
import Err404 from "./Components/Err404";
import VerificationQueue from "./Pages/verification-queue/verification_queue";
import PatientForm from "./Pages/verification-queue/patientForm";
import SuspendedUsers from "./Pages/Suspended-users/SuspendedUsers";
import AuditLogs from "./Pages/Audit-Logs/AuditLogs";
import Support from "./Pages/Support/Support";
import Login from "./Pages/Login/Login";
import RequireAuth from "./Components/RequireAuth";

const App = () => {
  return (
    <div>
      <Routes>
        
        <Route path="*" element={<Err404 />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <RequireAuth>
              <Drawer />
            </RequireAuth>
          }
        >
          
          <Route index element={<Dashboard />} />
          <Route path="verification_queue" element={<VerificationQueue />} />
          <Route path="patient-data/:id" element={<PatientForm />} />
          <Route path="suspended-users" element={<SuspendedUsers />} />
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="contact" element={<Contact />} />

          
          <Route path="calendar" element={<Calendar />} />
          <Route path="support" element={<Support />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
