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
/*
** declare different modes for rendering
*/
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
/*
** function when save is clicked
*/

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id,interview)
    .then(() =>transition(SHOW))
    .catch((err) => transition(ERROR_SAVE, true)); 
  };
/*
** function when cancel is confirmed
*/
  const cancel = (interviewId) => {
    transition(DELETING, true);
    props.cancelInterview(interviewId)
    .then(() => transition(EMPTY))
    .catch((error) => transition(ERROR_DELETE, true));
  };

  return(
/*
** conditional rendering dependenton the mode status
*/
    <article className="appointment">
      {props.time && <Header time={props.time} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
          <Show
            id={props.id}
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={()=> transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
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
      {mode === EDIT && <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
      />}
      {mode === ERROR_SAVE && <Error message="Could not save appointment" onClose={() => back()}/>}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment" onClose={() => back()}/>}
    </article>

  );
}