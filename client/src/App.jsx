import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Profile from './pages/Profile'
import { Provider, useSelector } from 'react-redux';
import appStore from './redux/appStore';

const ProtectedRoute = ({ children }) => {
  const { token, isAdmin } = useSelector(state => state.user);
  if (!token) return <Navigate to="/login" />;
  return children;
}


const RootLayout = () => {
  return (
    <div className="h-screen bg-black pb-96">
      <Header />
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    </div>
  )
}

const appRoute = createBrowserRouter([
  {
    path: '/login',
    element: <Login />

  },
  {
    path: '/signup',
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
      {
        path: '/profile',
        element: <Profile />
      }
    ]
  }
])

function App() {

  return (
    <>
      <Provider store={appStore}>
        <RouterProvider router={appRoute} />
      </Provider>
    </>
  )
}

export default App
