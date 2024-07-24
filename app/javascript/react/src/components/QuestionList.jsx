import React from "react";
import * as ReactDOM from "react-dom";
import QuestionDetails from "./QuestionDetails";
import { useState, useEffect } from "react";

const QuestionList = () => {

    const [questionList , setQuestionList]= useState([]);
    const questionsUrl = 'http://localhost:3000/api/v1/questions'


    const fetechQuestionList = () =>{
        fetch(questionsUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setQuestionList(data)
        })
    }

    useEffect(() =>{
        fetechQuestionList()
    },[])


    return (
        <div className="row">
            <div className="col-lg-10 max-auto">
                {questionList.map((question) =>
                    <>
                        <QuestionDetails question={question} key={question.id} />
                    </>

                )}
            </div>
        </div>
    )
}

export default QuestionList;