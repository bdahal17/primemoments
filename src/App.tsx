import { useEffect } from "react";
import emailjs from "@emailjs/browser";
import EventPlanningApp from "./EventPlanningApp";

function App() {
  useEffect(() => {
    // Initialize EmailJS once when the app loads
    emailjs.init({
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    });
  }, []);

  return <EventPlanningApp />;
}

export default App;
