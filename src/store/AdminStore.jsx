import { createContext, useReducer, useContext } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000/admin";

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem("adminToken") || null,
  isAuthenticated: !!localStorage.getItem("adminToken"),
  activePage: "dashboard",
  loading: false,
  error: null,
  users: [],    // Store fetched users
  // orders: [],   // Store fetched orders
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case "FETCH_USERS_SUCCESS":
      return { ...state, users: action.payload, loading: false };
    case "FETCH_ORDERS_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return {
        // user: null,
        token: null,
        isAuthenticated: false,
        activePage: "dashboard",
        loading: false,
        error: null,
        users: [],
        // orders: [],
      };
    case "SET_PAGE":
      return { ...state, activePage: action.payload };
    default:
      return state;
  }
};

// Context
const AdminContext = createContext();

// Provider
export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const config = {
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
  };

  // Admin Login
  const loginAdmin = async (email, password) => {
    dispatch({ type: "REQUEST" });
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      const { token, user } = res.data;
      localStorage.setItem("adminToken", token);
      dispatch({ type: "LOGIN_SUCCESS", payload: { token, user } });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.response?.data?.message || "Login failed",
      });
    }
  };

  // Admin Signup
  const signupAdmin = async (name, email, password) => {
    dispatch({ type: "REQUEST" });
    try {
      const res = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
      });
      const { token, user } = res.data;
      localStorage.setItem("adminToken", token);
      dispatch({ type: "SIGNUP_SUCCESS", payload: { token, user } });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.response?.data?.message || "Signup failed",
      });
    }
  };

  // Logout
  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    dispatch({ type: "LOGOUT" });
  };

  // Fetch All Users
  // const fetchAllUsers = async () => {
  //   dispatch({ type: "REQUEST" });
  //   try {
  //     console.log("Token:", state.token);  // Debug token presence
  //     const res = await axios.get(`${API_URL}/users`, config);
  //     dispatch({ type: "FETCH_USERS_SUCCESS", payload: res.data });
  //   } catch (err) {
  //     console.error(err.response?.data || err.message);
  //     dispatch({
  //       type: "ERROR",
  //       payload: err.response?.data?.message || "Failed to fetch users",
  //     });
  //   }
  // };



  // Fetch All Orders
  // const fetchAllOrders = async () => {
  //   dispatch({ type: "REQUEST" });
  //   try {
  //     const res = await axios.get(`${API_URL}/orders`, config);
  //     dispatch({ type: "FETCH_ORDERS_SUCCESS", payload: res.data });
  //   } catch (err) {
  //     dispatch({
  //       type: "ERROR",
  //       payload: err.response?.data?.message || "Failed to fetch orders",
  //     });
  //   }
  // };

  return (
    <AdminContext.Provider
      value={{
        state,
        dispatch,
        loginAdmin,
        signupAdmin,
        logoutAdmin,
        // fetchAllUsers,
        // fetchAllOrders,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

// Hook
export const useAdminStore = () => useContext(AdminContext);