import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import MainLayOut from "./layout/MainLayOut";
import LoadingSpinner from "./components/LoadingSpinner";
import OrgRequestStatusPage from "./pages/userPages/OrgRequestStatusPage";


const ForYou = lazy(() => import("./pages/userPages/ForYou"));
const LoginPage = lazy(() => import("./pages/authPages/LoginPage"))
const Movies = lazy(() => import("./pages/userPages/Movies"));
const Sports = lazy(() => import("./pages/userPages/Sports"));
const EventDetails = lazy(() => import("./pages/userPages/EventDetails"));
const Org = lazy(() => import("./pages/OrgPages/Org"));
const OrgRegistration = lazy(() => import("./pages/OrgPages/OrgRegistration"));
const OrgLogin = lazy(() => import("./pages/OrgPages/OrgLogin"));
const Dashboard = lazy(() => import("./pages/OrgPages/Dashboard"));
const OrganizeEvents = lazy(() => import("./pages/OrgPages/organizeEvents"));
const EditEvent = lazy(() => import("./pages/OrgPages/EditEvent"));
const SuccessPage = lazy(() => import("./pages/paymentPages/SuccessPage"));
const CancelPage = lazy(() => import("./pages/paymentPages/CancelPage"));
const AssignGateMate = lazy(() => import("./pages/OrgPages/AssignGateMate"))
const GateMateDashboard = lazy(() => import("./pages/GateMatePages/GateMateDashboard"))
const GateMateEventDetails = lazy(() => import("./pages/GateMatePages/GateMateEventDetails"))


function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Suspense fallback={<LoadingSpinner />}>
        <MainLayOut />
      </Suspense>,
      children: [
        { path: "", element: <ForYou /> },
        { path: "Movies", element: <Movies /> },
        { path: "Sports", element: <Sports /> },
        { path: "eventDetails/:eventId", element: <EventDetails /> },
        { path: "Organizer", element: <Org /> },
        { path: "become-organizer", element: <OrgRegistration />, },
        { path: "status-page/:status", element: <OrgRequestStatusPage /> },
        { path: "org-login", element: <OrgLogin /> },
        { path: "organizer-dashboard", element: <Dashboard />, },
        { path: "assign-gateMate/:eventId", element: <AssignGateMate /> },
        { path: "new-event", element: <OrganizeEvents /> },
        { path: "dashboard/editEvent/:eventId", element: <EditEvent /> },
        { path: "payment-success", element: <SuccessPage /> },
        { path: "payment-cancel", element: <CancelPage /> },
        { path: "/gateMate", element: <GateMateDashboard /> },
        { path: "/gateMate/:eventId", element: <GateMateEventDetails /> }
      ],
    },
    { path: "/login", element: <LoginPage /> },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
