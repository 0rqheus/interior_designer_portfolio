export const toggleModal = (id) => ({type: "TOGGLE_MODAL", id: id});
export const setChosenDate = (date) => ({type: "SET_CHOSEN_DATE", date: date});
export const setDayAppointments = (dayId, appointmentHours) => ({type: "SET_DAY_APPOINTMENTS", dayId, appointmentHours});
export const setDayToNull = () => ({type: "SET_DAY_TO_NULL"});