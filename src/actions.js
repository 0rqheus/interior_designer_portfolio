export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";
export const SETUP_APPOINTMENT_HOURS = "SETUP_APPOINTMENT_HOURS";
export const SET_DAY = "SET_DAY";

export const showModal = (data) => ({type: SHOW_MODAL});
export const hideModal = () => ({type: HIDE_MODAL});
export const setupAppointmentHours = (date) => ({type: SETUP_APPOINTMENT_HOURS, date: date});
export const setDay = (day) => ({type: SET_DAY, day: day});