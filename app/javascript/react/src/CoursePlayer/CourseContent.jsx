import React, { useRef } from "react";

const CourseContent = ({ iframeSrc }) => {
  const iframeRef = useRef(null);

  return (
    <div className="ourse-content col-md-10">
      <iframe
        ref={iframeRef}
        title="Course Content"
        style={{ width: "100%", height: "90vh", border: "none" }}
        src={iframeSrc}
      />
    </div>
  );
};

export default CourseContent;
