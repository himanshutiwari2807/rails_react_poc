import React, { useEffect, useRef } from "react";

const CourseSample = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        script.onerror = (error) => reject(error);
        document.body.appendChild(script);
      });
    };

    const loadDependencies = async () => {
      try {
        // Load jQuery
        await loadScript("/scormPlayer/jquery-3.2.1.min.js");
        console.log("jQuery loaded");

        // Load scorm.js
        await loadScript("/scormPlayer/scorm.js");
        console.log("scorm.js loaded");

        // Ensure loadSCORM is called after scorm.js is loaded
        if (typeof window.loadSCORM === "function") {
          window.loadSCORM((resourceUrl) => {
            // Construct the final URL for the iframe
            const finalUrl = `/scormPlayer/Leadingscorm/${resourceUrl}`;
            if (iframeRef.current) {
              iframeRef.current.src = finalUrl;
            }
          });
        } else {
          console.error("loadSCORM function is not defined");
        }
      } catch (error) {
        console.error("Error loading scripts", error);
      }
    };

    loadDependencies();
  }, []);

  return (
    <iframe
      ref={iframeRef}
      style={{ width: "100%", height: "100vh", border: "none" }}
      title="SCORM Content"
    />
  );
};

export default CourseSample;
