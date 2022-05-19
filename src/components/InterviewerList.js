import React from "react";
import InterviewerListItem from "./InterviewerListItem.js";
import "components/InterviewerList.scss";
export default function InterviewerList(props) {
  let {interviewers,interviewer,setInterviewer} =props;
  const interviewerList = interviewers.map((eachInterviewer) =>{
    return(
      <InterviewerListItem
        key={eachInterviewer.id}
        name={eachInterviewer.name}
        avatar={eachInterviewer.avatar}
        selected={eachInterviewer.id === interviewer}
        setinterviewer={setInterviewer}
      />
    );
  });
  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerList}
      </ul>
    </section>
  );
};