import React, { useRef } from "react";
import CourseSample from "./CourseSample";

const CourseContent = ({ iframeSrc }) => {
  const iframeRef = useRef(null);

  console.log(iframeRef);
  console.log(iframeSrc)
  return (
    <div className="course-content">
      <div className="iframe-wrapper">
        { iframeSrc  ?
        <iframe
        ref={iframeRef}
        title="Course Content"
        src={iframeSrc}
      />:<div><CourseSample /></div>}
   
      </div>

    </div>
  );
};

export default CourseContent;
