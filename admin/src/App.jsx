import React from "react";
import { Route, Routes } from "react-router-dom";
import Hero from "./pages/Hero";
import {useUser} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import List from "./pages/List";
import Appointments from "./pages/Appointments";
import AppointmentsPage from "./components/AppointmentsPage";


function RequiredAuth ({ children }) {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) return null;
  if (!isSignedIn) return (
    <div className=" min-h-screen font-mono flex items-center justify-center bg-linear-to-b
    from-emerald-50 via-green-50 to-emerald-100 px-4">
      <div className=" text-center">
        <p className=" text-emerald-800 font-semibold text-lg sm:text-2x1 mb-4 animate-fade-in">
          Please Sign in to view this page
        </p>
        <div className=" flex justify-center">
          <Link
            to="/"
            className=" px-4 py-4 text-sm rounded-full bg-emerald-600 text-while
            shadow-sm hover:bg-emerald-700 hover:shadow-md transition-all
            duration-300 ease-in-out animate-bounce-subtle"
            >
              Home
          </Link>
        </div>

      </div>

    </div>
  );
  return children;
}
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Hero/>}/>
      <Route 
        path="/h"
        element={
          <RequiredAuth>
           <Home />
           
          </RequiredAuth>
        }
        />
        <Route
         path="/add"
         element={
          <RequiredAuth>
            <Add />
          </RequiredAuth>
         }
         />

         <Route
         path="/list"
         element={
          <RequiredAuth>
            <List />
          </RequiredAuth>
         }
         />

         <Route
         path="/appointments"
         element={
          <RequiredAuth>
            <Appointments />
          </RequiredAuth>
         }
         />
    </Routes>
  );
};

export default App;