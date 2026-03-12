import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(

  <React.StrictMode>
    <ToastContainer position = "top-right" autoClose={2000}/>
  
    <BrowserRouter>
      <QueryClientProvider client={queryClient}> 
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider> 
     </BrowserRouter>
  </React.StrictMode>
  
);
