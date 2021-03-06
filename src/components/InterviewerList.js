import React from "react";
import InterviewerListItem from "./InterviewerListItem.js";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types'; 
export default function InterviewerList(props) {

  let { interviewers, value, onChange } = props;
/*
** render interviewer list 
*/
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((interviewer) => {
          return (
            <InterviewerListItem
              key={interviewer.id}
              name={interviewer.name}
              avatar={interviewer.avatar}
              selected={interviewer.id === value}
              setInterviewer={() => onChange(interviewer.id)}
            />
          );
        })}
      </ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};