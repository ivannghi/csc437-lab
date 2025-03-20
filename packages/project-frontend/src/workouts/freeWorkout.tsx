import React, { useState, useEffect, useActionState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import './freeWorkout.css';
import { useRef } from 'react';


// Type for Set Entry
// Type definition for a Set entry
interface Set {
    set_number: number;
    exercise: string;
    weight: number;
    reps: number;
}
interface FreeWorkoutProps {
    refreshWorkouts: () => void;
}

const FreeWorkout: React.FC<FreeWorkoutProps> = ({ refreshWorkouts }) => {
    const navigate = useNavigate();
    const location = useLocation(); // Track navigation changes
    const [workoutName, setWorkoutName] = useState<string>('');  // Type: string
    const [selectedExercise, setSelectedExercise] = useState<string>('');  // Type: string
    const [weight, setWeight] = useState<string>('');  // Type: string
    const [reps, setReps] = useState<string>('');  // Type: string
    const [sets, setSets] = useState<Set[]>([]);  // Type: Set[]
    const [editingIndex, setEditingIndex] = useState<number | null>(null);  // Type: number or null
    const [error, setError] = useState<string>('');  // Type: string
    const [workoutID, setWorkoutID] = useState<string>('');

    const exercises = ['Bench Press', 'Squat', 'Deadlift', 'Pull-up', 'Overhead Press'];

    const hasRestoredSets = useRef(false);

    // Save workout name and sets to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('workoutName', workoutName);
        localStorage.setItem('sets', JSON.stringify(sets));
    }, [workoutName, sets]);

    // Add new set
    const handleAddSet = () => {
        if (selectedExercise && weight && reps) {
            const newSet: Set = {
                set_number: sets.length + 1, // Assign a number based on current set count
                exercise: selectedExercise,
                weight: parseFloat(weight),
                reps: parseInt(reps),
            };
    
            setSets([...sets, newSet]);
            setWeight('');
            setReps('');
            setEditingIndex(null);
            setError('');
        } else {
            setError('Please select an exercise and enter weight and reps.');
        }    
    };

    const handleFinishWorkout = async () => {
        console.log("in handleStartWorkout");
    
        // Step 1: Validate inputs
        if (!workoutName) {
            setError("Please provide a workout name.");
            return;
        }

        if (sets.length === 0) {
            setError("Cannot save an empty workout. Add at least one set.");
            return;
        }
    
        // Step 2: Prepare the data to be sent
        console.log(workoutName);
        const workoutData = {
            workout_name: workoutName,
            created_at: new Date().toISOString(), // Add timestamp
        };
    
        console.log("Submitting workout data:", workoutData);
    
        try {
            // Step 3: Send the data to the backend via POST
            const response = await fetch("/api/completedworkouts", {
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
            refreshWorkouts();
            const result = await response.json();
            console.log(result);

            setWorkoutID(result._id);

            for (const set of sets) {
                const setData = {
                    completed_workout_id: workoutID, // Associate with workout
                    exercise_name: set.exercise,
                    set_number: set.set_number,
                    weight: set.weight,
                    reps: set.reps,
                    created_at: new Date().toISOString(),
                };
                
    
                console.log("Submitting set data:", setData);
    
                const setResponse = await fetch("/api/completedsets", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(setData),
                });
    
                if (!setResponse.ok) {
                    throw new Error("Failed to save a set.");
                }
            }
    
            alert("Workout and sets saved successfully!");

        } catch (error2: any) {
            console.error(error2);
            setError(error2.message || "Failed to save workout, please try again.");
        }
    };
    

    const [result, submitAction, isPending] = useActionState(
        async () => {
            return handleFinishWorkout();
        },
        null
    );

    // Edit existing set
    const handleEditSet = (index :number) => {
        const setToEdit = sets[index];
        setSelectedExercise(setToEdit.exercise);
        setWeight(setToEdit.weight.toString());
        setReps(setToEdit.reps.toString());
        setEditingIndex(index);
    };

    // Save edited set
    const handleSaveEdit = () => {
        if (editingIndex !== null && selectedExercise && weight && reps) {
            const updatedSets = [...sets];
            updatedSets[editingIndex] = {
                set_number: updatedSets[editingIndex].set_number,
                exercise: selectedExercise,
                weight: parseFloat(weight),
                reps: parseInt(reps)
            };
            setSets(updatedSets);
            setEditingIndex(null);
            setWeight('');
            setReps('');
        }
    };

    // Delete a set
    const handleDeleteSet = (index : number) => {
        setSets(sets.filter((_, i) => i !== index));
    };

    // Confirmation and navigation for Back button
    const handleBackButton = () => {
        const confirmLeave = window.confirm("Do you want to save your progress before leaving?");

        if (confirmLeave) {
            localStorage.setItem('workoutName', workoutName);
            localStorage.setItem('sets', JSON.stringify(sets));
            alert('Your progress has been saved!');
        } else {
            localStorage.removeItem('workoutName');
            localStorage.removeItem('sets');
            alert('Your progress has been discarded.');
        }

        navigate('/workouthome');
    };

    return (
        <div className="free-workout-container">
            <h1>Free Workout</h1>

            <input
                type="text"
                placeholder="Enter Workout Name"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                className="workout-name-input"
            />

            <select
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
                className="exercise-dropdown"
            >
                <option value="">Pick exercise</option>
                {exercises.map((exercise, index) => (
                    <option key={index} value={exercise}>{exercise}</option>
                ))}
            </select>

            <div>
                <input
                    type="number"
                    placeholder="Weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Reps"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                />
                <button onClick={editingIndex !== null ? handleSaveEdit : handleAddSet}>
                    {editingIndex !== null ? "Save Edit" : "Add Set"}
                </button>
            </div>

            <div className="set-list-container">
                <ul className="set-list">
                    {sets.map((set, index) => (
                        <li key={set.set_number} className="set-item">
                            <span>{set.exercise}</span>
                            <span>{set.weight} lbs</span>
                            <span>{set.reps} reps</span>
                            <button onClick={() => handleEditSet(index)}>Edit</button>
                            <button onClick={() => handleDeleteSet(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="error-message">
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <div className="submit-btns">
                <div className="interactive-btn bg-red-500 text-black">
                    <button onClick={handleBackButton}>Back</button>
                </div>
                <div className="interactive-btn bg-green-500 text-black">
                    <button onClick={submitAction} disabled={isPending}>
                        {isPending ? "Saving..." : "End Workout"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FreeWorkout;
