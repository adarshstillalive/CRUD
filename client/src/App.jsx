import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Profile from './pages/Profile'
import { Provider, useDispatch, useSelector } from 'react-redux';
import appStore from './redux/appStore';
import { useEffect, useMemo } from 'react';
import { fetchCurrentUser } from './redux/user/userSlice';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import HeaderAdmin from './components/HeaderAdmin';

const AuthInit = ({ children }) => {
  
  const dispatch = useDispatch();
  const { token, isLoading } = useSelector(state => state.user)

  useEffect(() => {
    if (token) {
      
      dispatch(fetchCurrentUser())
    }
  }, [token])

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full  h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return children;

}

const ProtectedRoute = ({ children }) => {
  const { token, isLoading } = useSelector(state => state.user);

  const isAuthenticated = useMemo(() => {
    return token
  }, [token])

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

const AuthRoute = ({ children }) => {
  const { token } = useSelector(state => state.user);
  const isAuthenticated = useMemo(() => {
    return token
  }, [token])
  if (isAuthenticated) return <Navigate to="/" replace />
  return children
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


const AdminLayout = () => {
  return (
    <div className="h-screen bg-white pb-96">
      <HeaderAdmin />
        <Outlet />
    </div>
  )
}

const appRoute = createBrowserRouter([
  {
    path: '/login',
    element:
      <AuthRoute>
        <Login />
      </AuthRoute>
  },
  {
    path: '/signup',
    element:
      <AuthRoute>
        <Signup />
      </AuthRoute>
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
  },
  {
    path: '/admin/login',
    element: <AdminLogin />
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '/admin',
        element: <AdminDashboard />
      },
    ]
  }
])

function App() {

  return (
    <>
      <Provider store={appStore}>
        <AuthInit>
          <RouterProvider router={appRoute} />
        </AuthInit>
      </Provider>
    </>
  )
}

export default App
