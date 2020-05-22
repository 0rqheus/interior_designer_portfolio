import { createStore } from 'redux'

const initialStore = {
  modalDisplayStatus: false,
  chosenDate: null,
  day: null
}

const reducer = (state = initialStore, action) => {

  switch (action.type) {
    case "SHOW_MODAL":
      return {
        ...state,
        modalDisplayStatus: true,
        data: action.data
      };
    case "HIDE_MODAL":
      return {
        ...state,
        modalDisplayStatus: false
      };
    case "SETUP_APPOINTMENT_HOURS":
      return {
        ...state,
        chosenDate: action.date
      }
    case "SET_DAY":
      return {
        ...state,
        day: action.day
      };
    default:
      return state;
  }

}

export default createStore(reducer);