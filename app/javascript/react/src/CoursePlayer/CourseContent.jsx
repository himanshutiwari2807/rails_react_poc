import React, { useRef, useEffect } from "react";
import CourseSample from "./CourseSample";

const CourseContent = ({ iframeSrc }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    if (iframe) {
      const handleLoad = () => {
        const doc = iframe.contentDocument;
        if (doc) {
          // Create a link element for the local stylesheet
          const link = doc.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/iframe.css'; // Path relative to the public directory

          // Append the stylesheet to the iframe's head
          if (doc.head) {
            doc.head.appendChild(link);
          }
        }
      };

      // Add event listener for iframe load
      iframe.addEventListener('load', handleLoad);

      // Cleanup listener on component unmount
      return () => {
        iframe.removeEventListener('load', handleLoad);
      };
    }
  }, [iframeSrc]);

  return (
    <div className="course-content">
      <div className="iframe-wrapper">
        {iframeSrc ? (
          <iframe
            ref={iframeRef}
            title="Course Content"
            src={iframeSrc}
          // We don't need to set `onLoad` here since we're using event listeners
          />
        ) : (
          <div className="course-sample"><CourseSample /></div>
        )}
      </div>
    </div>
  );
};

export default CourseContent;
