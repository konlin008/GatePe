import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import MainLayOut from "./layout/MainLayOut";


const ForYou = lazy(() => import("./pages/userPages/ForYou"));
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


function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Suspense fallback={<h2>Loading page...</h2>}>
        <MainLayOut />
      </Suspense>,
      children: [
        { path: "", element: <ForYou /> },
        { path: "Movies", element: <Movies /> },
        { path: "Sports", element: <Sports /> },
        { path: "eventDetails/:eventId", element: <EventDetails /> },
        { path: "Organizer", element: <Org /> },
        { path: "org-registration", element: <OrgRegistration /> },
        { path: "org-login", element: <OrgLogin /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "new-event", element: <OrganizeEvents /> },
        { path: "dashboard/editEvent/:eventId", element: <EditEvent /> },
        { path: "payment-success", element: <SuccessPage /> },
        { path: "payment-cancel", element: <CancelPage /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
