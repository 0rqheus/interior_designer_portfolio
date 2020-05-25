import { createStore } from "redux";

import { PURCHASE_MODAL, APPOINTMENT_MODAL, LOGIN_MODAL } from "./modalNames";

const modals = [
    [PURCHASE_MODAL, false],
    [APPOINTMENT_MODAL, false],
    [LOGIN_MODAL, false]
];

const initialStore = {
    modals: new Map(modals),
    chosenDate: null,
    chosenDay: null
};

const reducer = (state = initialStore, action) => {

    switch (action.type) {
        case "TOGGLE_MODAL": {

            const oldValue = state.modals.get(action.modalName);

            const modals = new Map(state.modals);
            modals.set(action.modalName, !oldValue);

            return {
                ...state,
                modals: modals
            };
        }

        case "SET_CHOSEN_DATE":
            return {
                ...state,
                chosenDate: action.date
            };
        case "SET_DAY_APPOINTMENTS":
            return {
                ...state,
                chosenDay: {
                    id: action.dayId,
                    appointmentHours: action.appointmentHours
                }
            };
        case "SET_DAY_TO_NULL":
            return {
                ...state,
                chosenDay: null
            };
        default:
            return state;
    }

};

export default createStore(reducer);