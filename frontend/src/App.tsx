import { useEffect } from "react";
import emailjs from "@emailjs/browser";
import EventPlanningApp from "./EventPlanningApp";
import Login from "./components/Account/Login.tsx";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Account from "./components/Account/Account.tsx";
import {Provider} from "react-redux";
import store from "./store/store";

function App() {
  useEffect(() => {
    // Initialize EmailJS once when the app loads
    emailjs.init({
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    });
  }, []);

  return (
    <BrowserRouter>
        <Provider store={store}>
         <Routes>
            <Route path="/" element={<EventPlanningApp/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/account" element={<Account/>} />
         </Routes>
        </Provider>
    </BrowserRouter>
  );
}

export default App;
