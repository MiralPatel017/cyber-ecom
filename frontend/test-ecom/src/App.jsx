import { Routes, Route, Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginFolder/LoginPage'
import SignupPage from './components/SignupFolder/SignupPage'

function App() {
  // const routes = [
  //   { path: '/', element: <LoginPage /> },
  //   { path: '/home', element: <HomePage /> },
  //   { path: '/signup', element: <SignupPage /> },
  // ]

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/home',
      element: <HomePage />,
    },
    {
      path: '/signup',
      element: <SignupPage />,
    },
  ])

  return <RouterProvider router={router} />

  // return (
  // <Routes>
  //   <Route path="/" element={<LoginPage />} />
  //   <Route path='/login' element={<LoginPage />} />
  //   <Route path="/home" element={<HomePage />} />
  //   <Route path='/signup' element={<SignupPage />} />
  //   <Outlet />
  // </Routes>
  // )
}

export default App
