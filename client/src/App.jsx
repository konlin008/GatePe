import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayOut from './layout/MainLayOut'
import ForYou from './pages/userPages/ForYou'
import Org from './pages/OrgPages/Org'
import OrgRegistration from './pages/OrgPages/OrgRegistration'
import OrganizeEvents from './pages/OrgPages/organizeEvents'
import OrgLogin from './pages/OrgPages/OrgLogin'
import Dashboard from './pages/OrgPages/Dashboard'
import EditEvent from './pages/OrgPages/EditEvent'
import Movies from './pages/userPages/Movies'
import Sports from './pages/userPages/Sports'
import EventDetails from './pages/userPages/EventDetails'
import SuccessPage from './pages/paymentPages/SuccessPage'
import CancelPage from './pages/paymentPages/CancelPage'

function App() {

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <MainLayOut />,
      children: [
        {
          path: '/',
          element: <ForYou />

        },
        {
          path: '/Movies',
          element: <Movies />
        },
        {
          path: 'Sports',
          element: <Sports />
        }, {
          path: 'eventDetails/:eventId',
          element: <EventDetails />
        },
        {
          path: '/Organizer',
          element: <Org />,
        },
        {
          path: '/org-registration',
          element: <OrgRegistration />
        },
        {
          path: '/org-login',
          element: <OrgLogin />
        },
        {
          path: '/dashboard',
          element: <Dashboard />
        },
        {
          path: '/new-event',
          element: <OrganizeEvents />
        },
        {
          path: '/dashboard/editEvent/:eventId',
          element: <EditEvent />
        },
        {
          path: '/payment-success',
          element: <SuccessPage />
        },
        {
          path: '/payment-cancel',
          element: <CancelPage />
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
