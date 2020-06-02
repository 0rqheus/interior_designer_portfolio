import React, { useState } from "react";
import { db, auth } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { APPOINTMENT_MODAL } from "../../modalNames";

const ModalContent = () => {
    const [contacts, setContacts] = useState("");
    const [message, setMessage] = useState("");
    const day = useSelector(state => state.chosenDay);
    const date = useSelector(state => state.chosenDate);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;

        setContacts(value);

        if (value.trim() === "") {
            target.classList.add("modal-form_invalid");
        } else {
            target.classList.remove("modal-form_invalid");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (contacts.trim() === "") {
            contacts.classList.add("modal-form_invalid");
            return;
        }

        const newAppointment = {
            contacts: contacts,
            message: message,
            hour: date.getHours()
        };

        if (day !== null) {
            db.collection("appointments").doc(day.id).update({
                hours: [...day.appointmentHours, newAppointment]
            });

            dispatch({
                type: "SET_DAY_APPOINTMENTS",
                dayId: day.id,
                appointmentHours: [...day.appointmentHours, newAppointment]
            });
        } else {
            db.collection("appointments").add({
                day: date.getDate(),
                month: date.getMonth(),
                hours: [{ ...newAppointment }]
            })
                .then(doc => 
                    dispatch({
                        type: "SET_DAY_APPOINTMENTS",
                        dayId: doc.id,
                        appointmentHours: [newAppointment]
                    })
                )
                .catch(console.error);
        }

        dispatch({type: "TOGGLE_MODAL", modalName: APPOINTMENT_MODAL});
    };
    
    const getSelectedHours = (hour) => {
        return `${hour}:00 - ${+hour + 1}:00`;
    };
    
    const currentUser = auth.currentUser;

    return (
        <div className="modal-content">

            <h4 className="modal-content__header">New appointment</h4>

            <form className="modal-form" onSubmit={handleSubmit}>

                <div className="modal-form__container">
                    <label>Hours</label>
                    <input
                        className="modal-form__input"
                        value={date !== null 
                            ? getSelectedHours(date.getHours()) 
                            : ""}
                        readOnly
                    />
                </div>

                <div className="modal-form__container">
                    <label>Contacts</label>
                    <input 
                        className="modal-form__input" 
                        defaultValue={currentUser !== null 
                            ? currentUser.email 
                            : ""} 
                        onChange={handleChange} 
                    />
                </div>

                <div className="modal-form__container">
                    <label>Message</label>
                    <textarea 
                        className="modal-form__textarea" 
                        onChange={({target}) => setMessage(target.value)} 
                        rows="3"
                    >
                    </textarea>
                </div>

                <button type="submit" className="modal-form__submit-btn">Submit</button>
            </form>

        </div>
    );

};

export default ModalContent;