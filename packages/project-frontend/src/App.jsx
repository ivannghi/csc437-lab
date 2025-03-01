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
import WorkoutLayout from './workouts/WorkoutLayout';
import PremadeWorkoutsPage from './workouts/premadeWorkouts';
import FreeWorkout from './workouts/freeWorkout';
import ViewPastPage from './workouts/pastWorkouts';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
        {/* Login Page (No Navbar) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Wrap all other pages inside Layout */}
        <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route element={<WorkoutLayout />}>
              <Route path="/workouthome" element={<WorkoutHome />} />
              <Route path="/buildworkout" element={<BuildWorkoutPage/>} />
              <Route path="/premadeworkouts" element={<PremadeWorkoutsPage />} />  
              <Route path="/freeworkout" element={<FreeWorkout />} />  
              <Route path="/pastworkouts" element={<ViewPastPage />} />  


            </Route>
            <Route path="/calorieshome" element={<CaloriesHome />} />
        </Route>
    </Routes>
  )
}

export default App
