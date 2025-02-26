import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from "react-router";
import LoginPage from './pages/login';
import HomePage from './pages/home';
import WorkoutHome from './workouts/workouthome';
import Layout from './navbar/Layout';
import CaloriesHome from './calories/calorieshome';
import BuildWorkoutPage from './workouts/buildWorkout';

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
            <Route path="/buildworkout" element={<BuildWorkoutPage/>} />
            <Route path="/calorieshome" element={<CaloriesHome />} />
        </Route>
    </Routes>
  )
}

export default App
