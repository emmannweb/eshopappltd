import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./front/NotFound";
import Home from "./front/Home";
import Dashboard from "./admin/Dashboard";
import Product from "./admin/Product";
import Order from "./admin/Order";
import Category from "./admin/Category";
import Login from "./front/Login";
import UserRoute from "./components/UserRoute";
import AdminRoute from "./components/AdminRoute";
import UserDashboard from "./user/UserDashboard";
import Register from "./front/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./front/Checkout";
import UserOrder from "./user/UserOrder";
import CheckoutCancel from "./front/checkout/CheckoutCancel";
import SearchResults from "./front/SearchResults";
import ViewProduct from "./front/ViewProduct";

const App = () => {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <Product />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <Order />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <AdminRoute>
                <Category />
              </AdminRoute>
            }
          />
          <Route
            path="/user/dashboard"
            element={
              <UserRoute>
                <UserDashboard />
              </UserRoute>
            }
          />
          <Route
            path="/user/orders"
            element={
              <UserRoute>
                <UserOrder />
              </UserRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <UserRoute>
                <Checkout />
              </UserRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <UserRoute>
                <CheckoutCancel />
              </UserRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search/:keyword" element={<SearchResults />} />
          <Route path="/product/:id" element={<ViewProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
