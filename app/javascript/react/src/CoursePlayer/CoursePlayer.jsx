import React, { useState } from "react";
import { ReactReader } from "react-reader";
import CourseSideBar from "./CourseSidebar";
import CourseNavbar from "./CourseNavbar";

const CoursePlayer = () => {
    // const [location, setLocation] = useState(0); // Initialize state without type annotations

    return (
        // <div style={{ height: '100vh', display: 'flex' }}>
        //     <div style={{ flex: 1 }}>
        //         <ReactReader
        //             url="/epub/egscorm.epub" // Path to your local EPUB file
        //             location={location}
        //             epubInitOptions={{
        //                 openAs: 'epub',
        //             }}
        //             locationChanged={(epubcfi) => setLocation(epubcfi)}
        //         />
        //     </div>
        // </div>
        <>
        <CourseNavbar />
        <CourseSideBar />
        </>
    );
};

export default CoursePlayer;
