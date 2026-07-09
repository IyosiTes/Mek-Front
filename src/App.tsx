import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import { HomePage } from "./components/Pages/HomePage";
import  NotFoundPage  from "./components/Pages/NotFoundPage";
import  ProductDetailPage  from "./components/Pages/ProductDetailPage";
import CartPage  from "./components/Pages/CartPage";
import LoginPage from "./components/Pages/LoginPage";
//import ProtectedRoute from "./components/Auth/ProtectedRoute";
import RegisterPage from "./components/Pages/RegisterPage";
import CheckoutPage from "./components/Pages/CheckoutPage";
import OrderSuccessPage from "./components/Pages/OrderSuccess";
import UserProfile from "./components/Pages/UserProfile";
import AuthLayout from "./components/Layouts/AuthLayout";
import OrdersPage from "./components/Pages/OrdersPage";
import ForgotPasswordPage from "./components/Pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/Pages/ResetPasswordPage";
import PrivacyPolicy from "./components/Pages/PrivacyPolicy";
import TermsOfService from "./components/Pages/TermOfService";
import RefundPolicy from "./components/Pages/RefundPolicy";
import ShippingPolicy from "./components/Pages/ShippingPolicy";
import CommunityFeed from "../src/community/pages/CommunityFeed";
import PostDetailPage from "../src/community/pages/PostDetail";
import CommunityLayout from "./components/Layouts/CommunityLayout";
import CreatePost from "./community/pages/CreatePost";
import SearchPage from "./community/pages/Explore";
import NotificationPage from "./components/notifications/NotificatioPage";
import ProfilePage from "./community/pages/ProfilePage";

export default function App() {
  return (
    
       <Routes>
          <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
        <Route path="/reset-password" element={<ResetPasswordPage />} />
         <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/refund" element={<RefundPolicy />} />
            <Route path="/shipping" element={<ShippingPolicy />} />
          </Route>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />  
          <Route path ="/profile" element={<UserProfile/>}/>
          <Route path ="/cart" element={<CartPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success/:id" element={<OrderSuccessPage />} />
          <Route path="*" element={<NotFoundPage />} />
            <Route path="/orders" element={<OrdersPage />} />
        </Route>
        <Route element={<CommunityLayout />}>
          <Route path="/community" element={<CommunityFeed />} />
          <Route path="/community/create" element={<CreatePost />} />
          <Route path="/community/post/:id" element={<PostDetailPage />} />
          <Route path="/community/search" element={<SearchPage />} />
          <Route path="/community/notifications" element={<NotificationPage/>} />
          <Route path="/community/profile" element={<ProfilePage />} />
        </Route>
     </Routes>
    
  );
}