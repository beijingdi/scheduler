import React from "react";
import "./styles.scss";
import Confirm from "./Confirm";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import {useVisualMode} from "../../hooks/useVisualMode.js"
 

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id,interview)
    .then(() =>transition(SHOW));
    
  };

  const cancel = (interviewId) => {
    transition(DELETING);
    props.cancelInterview(interviewId)
    .then(() => transition(EMPTY));
  }

  return(
    <article className="appointment">
      {props.time && <Header time={props.time} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
          <Show
            id={props.id}
            student={props.interview.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={()=> transition(CONFIRM)}
          />
      )}
      {mode === CREATE && 
        <Form 
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      }
      {mode === SAVING && <Status message="saving"/>}
      {mode === DELETING && <Status message="deleting"/>}
      {mode === CONFIRM && <Confirm
        onCancel={() => back()}
        onConfirm={() => cancel(props.id)}/>}
    </article>

  );
}