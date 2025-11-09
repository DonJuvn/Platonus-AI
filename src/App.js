import React, { useState } from "react";
import "./App.css";

import Header from "./components/header";
import Uploader from "./components/uploader";
import Login from "./components/auth";

export default function PlatonusAI() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("userRole")
  );

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <>
          <Header onLogout={handleLogout} />
          <Uploader />
        </>
      )}
    </div>
  );
}
