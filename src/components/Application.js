import React, {useState, useEffect} from "react";
import axios from "axios";
import Appointment from "components/Appointment";
import {useVisualMode} from "../hooks/useVisualMode.js";
import {useApplicationData} from "../hooks/useApplicationData.js";
import {getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors.js";
import "components/Application.scss";
import DayList from "./DayList";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);
  let dailyAppointments =[]; 
  dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentsList = dailyAppointments.map((appointment) =>{
    const interview = getInterview(state,appointment);
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
      </section>
    </main>
  );
}
