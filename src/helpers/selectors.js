export function getAppointmentsForDay(state,day) {
  let appointmentsForDay = [];
  const filteredAppointment =  state.days.filter(dayObj => dayObj.name === day);
  if (filteredAppointment.length) {
    let appointmentArr = filteredAppointment[0].appointments;
    appointmentArr.forEach((appointmentId) => {
      appointmentsForDay.push(state.appointments[appointmentId]);
    });
  }
  return appointmentsForDay;
}

export function getInterview(state,interview) {
 if(interview) {
   console.log("interviewer is", interview.interviewer);
    let interviewerId = interview.interviewer;
    let interviewObj = {...interview, interviewer:state.interviewers[interviewerId]};
    return interviewObj;
  }
  return null;
}

export function getInterviewersForDay ({days, interviewers}, day) {
  if (days.length === 0) return [];
  const foundDay = days.find(eachDay => eachDay.name === day);
  if (!foundDay) return [];
  return foundDay.interviewers.map(interviewerId => interviewers[interviewerId]);
}


