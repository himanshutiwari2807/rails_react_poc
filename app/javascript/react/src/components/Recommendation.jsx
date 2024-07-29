import React from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Recomendation = () => {
    const navigate = useNavigate();
    const OnCourseClick = () =>{
        navigate("/Course-details");
    }
  return (
    <>
      <h1>Recommended for you</h1>
<div className="d-flex">


      <button className="recommended-card col-md-4" onClick={OnCourseClick} >
        <div>
          <Image src="../../assets/images/book-cover.svg" alt="book-cover" />
        </div>
        <div>
          <h3>
            MyLab Statistics with Pearson eText Access Code for Elementary
            Statistics
          </h3>
          <p>
            There are many variations of passages of Lorem Ipsum available, but the
             majority have suffered alteration in some form, by injected
            humour, or  randomised words which don't look even slightly
            believable.
          </p>
          <div className="d-flex justify-content-between">
            <p>Skill Level <strong>Beginner</strong></p>
            <p>Time to complete <strong>13 hours</strong></p>
          </div>
        </div>
      </button>

      <button className="recommended-card col-md-4" onClick={OnCourseClick}>
        <div>
          <Image src="../../assets/images/book-cover-2.svg" alt="book-cover" />
        </div>
        <div>
          <h3>
          Computer Science for Artificial Intelligence
          </h3>
          <p>
          The demand for expertise in AI and machine learning is growing rapidly. By enabling new technologies like self-driving cars and recommendation systems or improving old ones like medical diagnostics and search engines, AI is transforming how we live, work, and play. 
          </p>
          <div className="d-flex justify-content-between">
            <p>Skill Level <strong> Expert </strong></p>
            <p>Time to complete <strong>5 months</strong></p>
          </div>
        </div>
      </button>
      </div>
    </>
  );
};

export default Recomendation;
