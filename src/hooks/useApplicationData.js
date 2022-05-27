import {useState, useEffect} from "react";
import axios from "axios";

export function useApplicationData () {
/*
** set initial state 
*/
  const [state,setState] = useState({
    day:"Monday",
    days:[],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day});  
/*
** update the spots remaining where an interview is booked or cancelled
*/
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

/*
** fetch data once when the page is refreshed
*/

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
/*
** send a put request to server when an interview is booked
*/
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
  };
  /*
  ** send a delete request to server when an interview is deleted
  */

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
  };
  return {state, setDay, bookInterview, cancelInterview}
};