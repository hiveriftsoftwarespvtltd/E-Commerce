// import "./index.css";

// // src/main.jsx
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";
// import { CartProvider } from "./context/CartContext.jsx";
// import { SearchProvider } from "./context/SearchContext";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//  <SearchProvider>

//     <CartProvider>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </CartProvider>
//     </SearchProvider>

//   </React.StrictMode>
// );

// src/main.jsx

import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { FilterProvider } from "./context/FilterContext";
import { SearchProvider } from "./context/SearchContext";
import { AuthProvider} from "./context/UserContext";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <SearchProvider>
          <FilterProvider>
            <CartProvider>
              <App />
              <ToastContainer />
            </CartProvider>
          </FilterProvider>
        </SearchProvider>
      </BrowserRouter>
    </AuthProvider>
      
    
  </React.StrictMode>,
);
