import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { Route, Routes } from "react-router";
import { useState } from "react";
import { MainLayout } from "./MainLayout.jsx";
import { useImageFetching } from "./images/useImageFetching.js";
import { RegisterPage } from "./auth/RegisterPage.jsx";
import { LoginPage } from "./auth/LoginPage.jsx";
import { ProtectedRoute } from "./auth/ProtectedRoute.jsx";

function App() {
    const [userName, setUserName] = useState('');
    const [authToken, setAuthToken] = useState('');
    const { isLoading, fetchedImages } = useImageFetching("", authToken);    

    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/register" element={<RegisterPage onRegister={setAuthToken}/>} />
                <Route path="/login" element={<LoginPage onLogin={setAuthToken} />} />
                <Route element={<ProtectedRoute authToken={authToken} />}>
                    <Route path="/" element={<Homepage userName={userName} />} />
                    <Route path="/account" element={<AccountSettings userName={userName} onNameChange={setUserName} />} />
                    <Route path="/images" element={<ImageGallery isLoading={isLoading} fetchedImages={fetchedImages} authToken={authToken} />} />
                    <Route path="/images/:imageId" element={<ImageDetails authToken = {authToken}/>} />
                </Route>           
            </Route>
        </Routes>
    );
}

export default App
