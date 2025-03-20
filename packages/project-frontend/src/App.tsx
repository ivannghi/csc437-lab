import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import LoginPage from './pages/login.tsx';
import RegisterPage from './pages/register.tsx'; // Import RegisterPage
import HomePage from './pages/home.tsx';
import WorkoutHome from './workouts/workouthome.tsx';
import Layout from './navbar/Layout';
import BuildWorkoutPage from './workouts/buildWorkout.tsx';
import WorkoutLayout from './workouts/WorkoutLayout.tsx';
import PremadeWorkoutsPage from './workouts/premadeWorkouts.tsx';
import FreeWorkout from './workouts/freeWorkout.tsx';
import ViewPastPage from './workouts/pastWorkouts.tsx';
import { usePremadeWorkoutFetching, WorkoutData } from './workouts/usePremadeWorkoutFetching.ts';
import { useWorkoutFetching, WorkoutInstance } from './workouts/useWorkoutFetching.ts';
import { ProtectedRoute } from './pages/ProtectedRoute.tsx';

function App() {
  const [workoutRefreshKey, setWorkoutRefreshKey] = useState(0);
  const [authToken, setAuthToken] = useState('');

  const { isLoading: isLoadingPremade, fetchedPremadeWorkouts } = usePremadeWorkoutFetching();
  const { isLoading: isLoadingWorkouts, fetchedWorkouts } = useWorkoutFetching(workoutRefreshKey);

  // Function to trigger refetch
  const refreshWorkouts = () => {
    setWorkoutRefreshKey(prevKey => prevKey + 1);
  };

  const onLogin = (token: string) => {
    setAuthToken(token);
  };

  const onRegister = (token: string) => {
    setAuthToken(token);  // Store token after registration
  };

  return (
    <Routes>
      {/* Login Page (No Navbar) */}
      <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
      
      {/* Register Page (No Navbar) */}
      <Route path="/register" element={<RegisterPage onRegister={onRegister} />} /> {/* Add Register route */}
      <Route element={<ProtectedRoute authToken={authToken} />}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route element={<WorkoutLayout />}>
            <Route path="/workouthome" element={<WorkoutHome />} />
            <Route path="/buildworkout" element={<BuildWorkoutPage />} />
            <Route path="/premadeworkouts" element={<PremadeWorkoutsPage isLoading={isLoadingPremade} fetchedWorkouts={fetchedPremadeWorkouts} />} />
            <Route path="/freeworkout" element={<FreeWorkout refreshWorkouts={refreshWorkouts} />} />
            <Route path="/pastworkouts" element={<ViewPastPage isLoading={isLoadingWorkouts} fetchedWorkouts={fetchedWorkouts} />} />
          </Route>
        </Route>
      </Route>
      {/* Wrap all other pages inside Layout */}
      
    </Routes>
  );
}

export default App;
