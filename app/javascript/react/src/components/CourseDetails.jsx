import React from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CourseDetails = (props) => {
  const navigate = useNavigate();

  const JoinCourse = () => {
    props.setCourseStart(true);
    navigate("/Course-dashboard");
  };

  return (
    <>
      <div className="courseDetails-card">
        <div className="col-md-9">
          <h2>
            MyLab Statistics with Pearson eText Access Code <br /> for
            Elementary Statistics
          </h2>

          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the <br />
            majority have suffered alteration in some form, by injected humour,
            or <br /> randomised words which don't look even slightly
            believable.
          </p>
          <div className="join-course">
            <button onClick={JoinCourse}>Join to Course</button>
            <span className="free-tag">free</span>
          </div>
          <div className="skill-level d-flex justify-content-between">
            <p>
              Skill Level <strong> Expert </strong>
            </p>
            <p>
              Time to complete <strong>5 months</strong>
            </p>
          </div>
        </div>

        <div className="col-md-2">
          <Image src="../../assets/images/book-cover-3.svg" alt="book-cover" />
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
