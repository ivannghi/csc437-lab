import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes, Navigate} from "react-router";
import LoginPage from './pages/login';
import HomePage from './pages/home';
import WorkoutHome from './workouts/workouthome';
import Layout from './Layout';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
        {/* Login Page (No Navbar) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Wrap all other pages inside Layout */}
        <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/workouthome" element={<WorkoutHome />} />
            {/* <Route path="/calorieshome" element={<CaloriesHome />} /> */}
        </Route>
    </Routes>
  )
}

export default App
