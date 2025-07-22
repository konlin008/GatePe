import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/button'
import MainLayOut from './layout/MainLayOut'
import ForYou from './pages/userPages/ForYou'
import Org from './pages/OrgPages/Org'

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
        }, {
          path: '/org',
          element: <Org />
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
