import { createStore } from "redux";

const modals = [
    ["purchaseModal", false],
    ["appointmentModal", false],
    ["loginModal", false]
];

const initialStore = {
    modals: new Map(modals),
    chosenDate: null,
    chosenDay: null
};

const reducer = (state = initialStore, action) => {

    switch (action.type) {
        case "TOGGLE_MODAL": {

            const oldValue = state.modals.get(action.id);

            const modals = new Map(state.modals);
            modals.set(action.id, !oldValue);

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