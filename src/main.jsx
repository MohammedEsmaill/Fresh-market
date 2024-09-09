import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CounterContextProvider from "./Context/CounterContext.jsx";
import AuthContextProvider from "./Context/AuthContext.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({defaultOptions:{queries:{refetchOnWindowFocus:false}}})
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <CounterContextProvider>
      <ToastContainer autoClose={3000}></ToastContainer>
        <App />
      </CounterContextProvider>
    </AuthContextProvider>
  </QueryClientProvider>
);
