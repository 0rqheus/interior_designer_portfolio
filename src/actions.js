export const showModal = (data) => ({type: "SHOW_MODAL"});
export const hideModal = () => ({type: "HIDE_MODAL"});
export const setupAppointmentHours = (date) => ({type: "SETUP_APPOINTMENT_HOURS", date: date}); // @fix
export const setDay = (day) => ({type: "SET_DAY", day: day}); // @fix
export const setUser = (user) => ({type: "SET_USER", user: user});