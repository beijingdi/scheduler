import React from "react";
import Appointment from "components/Appointment";
import {useApplicationData} from "../hooks/useApplicationData.js";
import {getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors.js";
import DayList from "./DayList";
import "components/Application.scss";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);
  /*
  ** generate a list of appointment components
  */
  let dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentsList = dailyAppointments.map((appointment) =>{
    const interview = getInterview(state,appointment.interview);
    return (
      <Appointment
      key = {appointment.id}
      id = {appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      />
    );
  });
  /*
  ** render day list and appointment list
  */
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
            
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsList}
        <Appointment time="5PM"/>
      </section>
    </main>
  );
}
