import React from "react";
import { Image } from "react-bootstrap";

const CourseNavbar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid d-flex justify-content-between">
      <div className="library-button">
<button>
    <Image src="../../assets/images/books.svg" alt="back to libray" />
</button>
      </div>
      <div className="search-button">
      <button>
    <Image src="../../assets/images/Search-icon.svg" alt="back to libray" />
    </button>
      </div>
        </div>
      </nav>
    </>
  );
};

export default CourseNavbar;
