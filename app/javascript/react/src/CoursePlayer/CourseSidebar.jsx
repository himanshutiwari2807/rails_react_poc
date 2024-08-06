import React from "react";

const CourseSideBar = ({ onContentChange }) => {
  return (
    <>
      <div className="course-sidebar col-md-2">
        <div className="offcanvas-header">
          <h5>
            IBM: Introduction to Web Development with HTML5, CSS3, and
            JavaScript
          </h5>
        </div>
        <div className="offcanvas-body">
          <p>Course model</p>
          <ul>
            <li>
              <button onClick={() => onContentChange("text.html")}>Text</button>
            </li>
            <li>
              <button onClick={() => onContentChange("video.mp4")}>
                Video
              </button>
            </li>
            <li>
              <button onClick={() => onContentChange("audio.mp3")}>
                Audio
              </button>
            </li>
            <li>
              <button onClick={() => onContentChange("quiz.html")}>Quiz</button>
            </li>

            
          </ul>
        </div>
      </div>
    </>
  );
};

export default CourseSideBar;
