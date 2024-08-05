import React, { useState } from "react";
import CourseSideBar from "./CourseSidebar";
import CourseNavbar from "./CourseNavbar";
import CourseContent from "./CourseContent";

const CoursePlayer = () => {
  const [content, setContent] = useState(null);


  const handleContentChange = (newContent) => {
    // Set the URL to access files in the public folder
    setContent(`/content/${newContent}`);
  };

  return (
    <>
      <CourseNavbar />
      <div className="d-flex">
        <CourseSideBar onContentChange={handleContentChange} />
        <CourseContent iframeSrc={content} />
      </div>
    </>
  );
};

export default CoursePlayer;
