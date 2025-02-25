import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { Route, Routes } from "react-router";

function App() {
    const POSSIBLE_PAGES = [
        <Homepage userName="John Doe" />,
        <AccountSettings />,
        <ImageGallery />,
        <ImageDetails imageId="0" />
    ]

    return (
        <Routes>
            <Route path="/" element={<Homepage userName="John Doe" />} />
            <Route path="/account" element={<AccountSettings />} />
            <Route path="/images" element={<ImageGallery />} />
            <Route path="/images/:imageId" element={<ImageDetails />} />  {/* This is the route for individual images */}           
        </Routes>
        // POSSIBLE_PAGES[0]
    );
}

export default App
