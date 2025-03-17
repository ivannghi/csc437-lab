import { useState } from 'react'
import './App.css'
import {Route, Routes} from "react-router";
import LoginPage from './pages/login.tsx';
import HomePage from './pages/home.tsx';
import WorkoutHome from './workouts/workouthome.tsx';
import Layout from './navbar/Layout';
import CaloriesHome from './calories/calorieshome';
import BuildWorkoutPage from './workouts/buildWorkout.tsx';
import WorkoutLayout from './workouts/WorkoutLayout.tsx';
import PremadeWorkoutsPage from './workouts/premadeWorkouts.tsx';
import FreeWorkout from './workouts/freeWorkout.tsx';
import ViewPastPage from './workouts/pastWorkouts.tsx';

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
