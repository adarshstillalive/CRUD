import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';


const RootLayout = ()=>{
  return (
  <div className="h-screen bg-black pb-96">
    <Header />
    <Outlet />
  </div>
  )
}

const appRoute = createBrowserRouter([
  {
    path: '/login',
    element: <Login />

  },
  {
    path:'/signup',
    element: <Signup />

  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
    ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={appRoute}/>
    </>
  )
}

export default App
