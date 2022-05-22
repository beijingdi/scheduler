import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";



export default function InterviewerListItem(props) {
  const renderingName = (props) => {
    if (props.selected) {
      return props.name;
    }
    return "";
  };

  let interviewerClass = classNames("interviewers__item",{
    "interviewers__item--selected":props.selected,  
  });
  return(
    <li 
      className={interviewerClass}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {renderingName(props)}
    </li>
  );

}