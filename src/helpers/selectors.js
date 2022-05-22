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