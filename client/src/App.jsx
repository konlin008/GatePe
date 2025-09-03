import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayOut from './layout/MainLayOut'
import ForYou from './pages/userPages/ForYou'
import Org from './pages/OrgPages/Org'
import OrgRegistration from './pages/OrgPages/OrgRegistration'
import OrganizeEvents from './pages/OrgPages/organizeEvents'
import OrgLogin from './pages/OrgPages/OrgLogin'

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
          path: '/org',
          element: <Org />
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
          path: '/organize-events/:orgId',
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
