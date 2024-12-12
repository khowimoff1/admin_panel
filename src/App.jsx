import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
const App = () => {
  const token = localStorage.getItem("tokenchik");
  const navigate = useNavigate();
  useEffect(() => {
    if (token?.length < 20 || token === null) {
      navigate("/login");
    }else{
      navigate("/dashboard");
    }
  }, []);
  
  
  return (
    <div className="">
      <main>
       <Outlet />
      </main> 
    </div>
  );
};

export default App;
