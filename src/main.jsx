import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppContext } from "./context/AppContext.jsx";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(

    
  <React.StrictMode>
    <AppContext>
      <App />
    </AppContext>
  </React.StrictMode>
  
);
