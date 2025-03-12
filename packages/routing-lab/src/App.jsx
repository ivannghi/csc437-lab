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

function App() {
    const [userName, setUserName] = useState('');
    const POSSIBLE_PAGES = [
        <Homepage userName={userName} />,
        <AccountSettings />,
        <ImageGallery />,
        <ImageDetails imageId="0" />
    ]

    const { isLoading, fetchedImages } = useImageFetching("");
    

    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<Homepage userName={userName} />} />
                <Route path="/account" element={<AccountSettings 
                    userName = {userName}
                    onNameChange = {setUserName} />} />
                <Route path="/images" element={<ImageGallery isLoading={isLoading} fetchedImages={fetchedImages}/>} />
                <Route path="/images/:imageId" element={<ImageDetails />} />  {/* This is the route for individual images */}           
            </Route>
                    </Routes>
        // POSSIBLE_PAGES[0]
    );
}

export default App
