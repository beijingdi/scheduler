import React, {useState, useEffect} from "react";
import axios from "axios";
import {getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors.js";

export function useApplicationData () {
  const [state,setState] = useState({
    day:"Monday",
    days:[],
    appointments: {},
    interviewers: {}
  });
  const updateSpots = function(state, appointments) {
    const index = state.days.findIndex(eachDay => eachDay.name === state.day);
    const day = state.days[index]

    let spots = 0
    for(const appointmentId of day.appointments) {
      if (appointments[appointmentId].interview === null) {
        spots ++;
      }
    }
    const newDay = {...day, spots: spots}
    const newDays = [...state.days]
    newDays[index] = newDay;

    return newDays;
  }

  const setDay = day => setState({...state, day});
  const setDays = days => setState({...state,days});
  
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) =>{
      setState(prev => ({...prev, 
        days:all[0].data, 
        appointments:all[1].data, 
        interviewers: all[2].data
      }))
    })
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
    .then((response) => {
      console.log({response});
      const days = updateSpots(state, appointments)
      setState({...state, appointments, days})
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, appointment)
    .then((response) => {
      const days = updateSpots(state, appointments)
      setState({...state, appointments, days});
    })
    .catch((error) => {
      console.log(error);
    });
  };
  return {state, setDay, bookInterview, cancelInterview}
};