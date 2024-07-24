import React, { useState } from "react";



const QuestionDetails = (props) => {

    const [likeCount, setLikeCount] = useState(0);

    return (
        <>
            <div className="card rounded-0 mt-3" >
                <div className="card-body">
                    <h3 className="card-title">{props.question.title}</h3>
                    <p className="lead">
                        <span className="badge bg-primary">{props.question.tag}</span>
                    </p>
                    <div className="">
                        <button className="btn btn-outline-primary  position-relative  mt-1" onClick={() => setLikeCount(likeCount + 1)}>Like
                            {
                                likeCount > 0 ?
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{likeCount}</span> : ''
                            }
                        </button>

                    </div>

                </div>
            </div>
        </>)
}

export default QuestionDetails;