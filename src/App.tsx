import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
//import  navBarLinks   from "./components/ui/NavBarLinks";
import { HomePage } from "./components/Pages/HomePage";
import  NotFoundPage  from "./components/Pages/NotFoundPage";
import  ProductDetailPage  from "./components/Pages/ProductDetailPage";
import CartPage  from "./components/Pages/CartPage";
import LoginPage from "./components/Pages/LoginPage";
//import ProtectedRoute from "./components/Auth/ProtectedRoute";


/*
import ProductDetailPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
*/



export default function App() {
  return (
    
       <Routes>
        <Route path='/' element={<Layout />}>
       <Route index element={<HomePage />} />  
        <Route path="/Login" element={<LoginPage />} />
       { /*
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />*/}
          
          <Route path ="/cart" element={<CartPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
           <Route path="*" element={<NotFoundPage />} />
        </Route>
     </Routes>
    
  );
}