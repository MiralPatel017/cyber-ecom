import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/UserComponents/HomePage";
import LoginPage from "./components/UserComponents/LoginFolder/LoginPage";
import SignupPage from "./components/UserComponents/SignupFolder/SignupPage";
import SellerSignupPage from "./components/sellerComponents/sellerSignupPage/sellerSignupPage";
import SellerLoginPage from "./components/sellerComponents/sellerLoginPage/sellerLoginPage";
import AdminPage from "./components/Admin/LoginFolder/AdminPage";
import AdminDashboardPage from "./components/Admin/Dashboard/AdminDashboardPage";
import SellerDashboardPage from "./components/sellerComponents/sellerDashboardPage";
import SellerProfile from "./components/sellerComponents/SellerProfile";
import SellerProducts from "./components/sellerComponents/SellerProducts";
import SellerAddProduct from "./components/sellerComponents/SellerAddProduct";

function App() {
  const router = createBrowserRouter([
    // User Routes
    { path: "/", element: <LoginPage /> },
    { path: "/home", element: <HomePage /> },
    { path: "/signup", element: <SignupPage /> },

    // Seller Routes
    { path: "/seller/signup", element: <SellerSignupPage /> },
    { path: "/seller", element: <SellerLoginPage /> },
    {
      path: "/seller/home",
      element: <SellerDashboardPage />,
      children: [
        { path: "profile", element: <SellerProfile /> },
        { path: "products", element: <SellerProducts /> },
        { path: "add-product", element: <SellerAddProduct /> },
      ],
    },

    // Admin Routes
    { path: "/dashboard/login", element: <AdminPage /> },
    { path: "/dashboard/signup", element: <AdminPage /> }, // Toggle internally
    { path: "/dashboard", element: <AdminDashboardPage /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;