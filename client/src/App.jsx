import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayOut from './layout/MainLayOut'
import ForYou from './pages/userPages/ForYou'
import Org from './pages/OrgPages/Org'
import OrgRegistration from './pages/OrgPages/OrgRegistration'
import OrganizeEvents from './pages/OrgPages/organizeEvents'
import OrgLogin from './pages/OrgPages/OrgLogin'
import Dashboard from './pages/OrgPages/Dashboard'

function App() {

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <MainLayOut />,
      children: [
        {
          path: '/',
          element: (
            <>
              <ForYou />
            </>
          )
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
