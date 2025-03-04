import React, { useState } from 'react';
import { useNavigate } from 'react-router';
// import { supabase } from '../../lib/supabaseClient';
import './buildworkout.css';

const BuildWorkoutPage = () => {
    const navigate = useNavigate();
    const [workoutName, setWorkoutName] = useState('');
    const [selectedExercise, setSelectedExercise] = useState('');
    const [exerciseList, setExerciseList] = useState([]);  // Type: string[]
    const [editingIndex, setEditingIndex] = useState(null);  // Type: number or null
    const [error, setError] = useState('');

    const exercises = ['Push-up', 'Squat', 'Bench Press', 'Deadlift', 'Pull-up'];

    const handleAddExercise = () => {
        if (selectedExercise) {
            setExerciseList([...exerciseList, selectedExercise]);
            setSelectedExercise('');
        }
    };

    const handleEditExercise = (index) => {
        setSelectedExercise(exerciseList[index]);
        setEditingIndex(index);
    };

    const handleSaveEdit = () => {
        if (editingIndex !== null && selectedExercise) {
            const updatedList = [...exerciseList];
            updatedList[editingIndex] = selectedExercise;
            setExerciseList(updatedList);
            setEditingIndex(null);
            setSelectedExercise('');
        }
    };

    const handleDeleteExercise = (index) => {
        setExerciseList(exerciseList.filter((_, i) => i !== index));
    };

    const handleSaveWorkout = async () => {
        if (!workoutName.trim()) {
            setError('Please enter a workout name.');
            return;
        }
        if (exerciseList.length === 0) {
            setError('Please add at least one exercise.');
            return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setError('User not logged in.');
            return;
        }

        const { error } = await supabase
            .from('premade_workouts')
            .insert([{ user_id: user.id, name: workoutName, exercises: exerciseList }]);

        if (error) {
            setError(`Error saving workout: ${error.message}`);
        } else {
            alert('Workout saved successfully!');
            navigate('/premadeworkouts');
        }
    };

    return (
        <div >
            <div className="centeritems">
                <h1 >Build Workout</h1>

                {/* Centered Form */}
                <div className="form-container">
                    {/* Workout Name Input */}
                    <input
                        type="text"
                        placeholder="Workout Name"
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                        className="workout-name-input"
                    />

                    {/* Exercise Selection */}
                    <select
                        value={selectedExercise}
                        onChange={(e) => setSelectedExercise(e.target.value)}
                        className="exercise-dropdown"
                    >
                        <option value="">Select an Exercise</option>
                        {exercises.map((exercise, index) => (
                            <option key={index} value={exercise}>{exercise}</option>
                        ))}
                    </select>

                    <button 
                        onClick={editingIndex !== null ? handleSaveEdit : handleAddExercise} 
                        className="add-exercise-btn"
                    >
                        {editingIndex !== null ? "Save Edit" : "Add Exercise"}
                    </button>
                </div>

                {/* Exercise List (Fixed Alignment) */}
                <div className="exercise-list-container">
                    {exerciseList.length === 0 ? (
                        <p style={{ fontSize: '14px', color: '#888' }}>No exercises added yet.</p>
                    ) : (
                        <ul className="exercise-list">
                            {exerciseList.map((exercise, index) => (
                                <li key={index} className="exercise-item">
                                    {exercise}
                                    <div className="exercise-buttons">
                                        <button onClick={() => handleEditExercise(index)} className="interactive-btn bg-orange-300 text-white">Edit</button>
                                        <button onClick={() => handleDeleteExercise(index)} className="interactive-btn bg-red-500 text-white">Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Error Message */}
                {error && <p className="error-message">{error}</p>}

                {/* Buttons */}
                <div className="submit-btns">
                    <div className="interactive-btn bg-red-500 text-black">
                        <button onClick={() => navigate('/workouthome')}>Cancel</button>
                    </div>
                    <div className="interactive-btn bg-green-500 text-black">
                        <button onClick={handleSaveWorkout}>Save Workout</button>
                    </div>
                </div>
            </div>
        </div>
            
    );
};

export default BuildWorkoutPage;
