import React, { useActionState, useState } from 'react';
import { useNavigate } from 'react-router';
import './buildworkout.css';

const BuildWorkoutPage = () => {
    const navigate = useNavigate();
    const [workoutName, setWorkoutName] = useState<string>('');  // Type: string
    const [author, setAuthor] = useState<string>('');  // Type: string

    const [selectedExercise, setSelectedExercise] = useState<string>('');  // Type: string
    const [exerciseList, setExerciseList] = useState<string[]>([]);  // Type: string[]
    const [editingIndex, setEditingIndex] = useState<number | null>(null);  // Type: number or null
    const [error, setError] = useState<string>('');  // Type: string

    const exercises = ['Push-up', 'Squat', 'Bench Press', 'Deadlift', 'Pull-up'];

    const handleAddExercise = () => {
        if (selectedExercise) {
            setExerciseList([...exerciseList, selectedExercise]);
            setSelectedExercise('');
        }
    };

    const handleEditExercise = (index: number) => {
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

    const handleDeleteExercise = (index: number) => {
        setExerciseList(exerciseList.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        console.log("in handleSubmit");
    
        // Step 1: Validate inputs
        if (!workoutName) {
            setError("Please provide a workout name.");
            return;
        }
        if (!author) {
            setError("Please provide an author.");
            return;
        }
        if (exerciseList.length === 0) {
            setError("Please add at least one exercise.");
            return;
        }
    
        // Step 2: Prepare the data to be sent
        const workoutData = {
            name: workoutName,
            author: author,
            exercises: exerciseList,
            created_at: new Date().toISOString(), // Add timestamp
        };
    
        console.log("Submitting workout data:", workoutData);
    
        try {
            // Step 3: Send the data to the backend via POST
            const response = await fetch("/api/premadeworkouts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(workoutData),  // Send as JSON
            });

            console.log(response);
    
            if (!response.ok) {
                const errorText = await response.text();  // Read error message safely
                throw new Error(errorText || "Request failed");
            }
    
            alert("Workout saved successfully!");
            navigate("/premadeworkouts");  // Navigate after successful save
        } catch (error2: any) {
            console.error(error2);
            setError(error2.message || "Failed to save workout, please try again.");
        }
    };
    

    const [result, submitAction, isPending] = useActionState(
        async () => {
            return handleSubmit();
        },
        null
    );
    

    return (
        <div>
            <div className="centeritems">
                <h1>Build Workout</h1>

                {/* Centered Form */}
                <div className="form-container">
                    <input
                        type="text"
                        placeholder="Workout Name"
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                        className="workout-name-input"
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
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

                {/* Exercise List */}
                <div className="exercise-list-container">
                    {exerciseList.length === 0 ? (
                        <p style={{ fontSize: '14px', color: '#888' }}>No exercises added yet.</p>
                    ) : (
                        <ul className="exercise-list">
                            {exerciseList.map((exercise, index) => (
                                <li key={index} className="exercise-item">
                                    {exercise}
                                    <div className="exercise-buttons">
                                        <button
                                            onClick={() => handleEditExercise(index)}
                                            className="interactive-btn bg-orange-300 text-white"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteExercise(index)}
                                            className="interactive-btn bg-red-500 text-white"
                                        >
                                            Delete
                                        </button>
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
                        <button onClick={submitAction} disabled={isPending}>
                            {isPending ? 'Saving...' : 'Save Workout'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuildWorkoutPage;
