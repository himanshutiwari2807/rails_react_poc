import React from "react";

const CourseSideBar = () => {
  return (
    <>
      <div
        class="offcanvas offcanvas-start show course-sidebar"
        data-bs-scroll="true"
        tabindex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            IBM: Introduction to Web Development with HTML5, CSS3, and
            JavaScript
          </h5>
        </div>
        <div class="offcanvas-body">
          <p>Model Completed.</p>

          <ul>
            <li>
              <button>Content</button>
            </li>
            <li>
              <button>Video</button>
            </li>
            <li>
              <button>Audio</button>
            </li>
            <li>
              <button>Quize</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CourseSideBar;
