import React from "react";
import { db, auth } from "../../firebase";
import { connect } from "react-redux";
import { toggleModal, setDayAppointments } from "../../actions";
import { APPOINTMENT_MODAL } from "../../modalNames";

class ModalContent extends React.Component {

    hangleChange = (event) => {
        const target = event.target;

        if(target.value.trim() === "") {
            target.classList.add("modal-form_invalid");
        } else {
            target.classList.remove("modal-form_invalid");
        }
    } 


    handleSubmit = (event) => {
        event.preventDefault();

        const contacts = this.contacts;

        if (contacts.value.trim() === "") {
            contacts.classList.add("modal-form_invalid");
            return;
        }

        const date = this.props.date;
        const day = this.props.day;
        const message = this.message;

        const newAppointment = {
            contacts: contacts.value,
            message: message.value,
            hour: date.getHours()
        };

        if (day !== null) {
            db.collection("appointments").day(day.id).update({
                hours: [...day.appointmentHours, newAppointment]
            });

            this.props.setDayAppointments(day.id, [...day.appointmentHours, newAppointment]);
        } else {
            db.collection("appointments").add({
                day: date.getDate(),
                month: date.getMonth(),
                hours: [{ ...newAppointment }]
            })
                .then(doc => {
                    this.props.setDayAppointments(doc.id, [newAppointment]);
                })
                .catch(console.error);
        }

        this.props.toggleModal(APPOINTMENT_MODAL);
    }

    render() {

        const currentUser = auth.currentUser;
        const contacts = currentUser !== null ? currentUser.email : "";

        const getSelectedHours = (hour) => {
            return `${hour}:00 - ${+hour + 1}:00`;
        };

        return (
            <div className="modal-content">

                <h4 className="modal-content__header">New appointment</h4>

                <form className="modal-form" onSubmit={this.handleSubmit}>

                    <div className="modal-form__container">
                        <label>Hours</label>
                        <input
                            className="modal-form__input"
                            value={this.props.date !== null ? getSelectedHours(this.props.date.getHours()) : ""}
                            readOnly
                        />
                    </div>

                    <div className="modal-form__container">
                        <label>Contacts</label>
                        <input className="modal-form__input" ref={element => this.contacts = element} defaultValue={contacts} onChange={this.hangleChange}/>
                    </div>

                    <div className="modal-form__container">
                        <label>Message</label>
                        <textarea className="modal-form__textarea" ref={element => this.message = element} rows="3"></textarea>
                    </div>

                    <button className="modal-form__submit-btn">Submit</button>
                </form>

            </div>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        day: state.chosenDay,
        date: state.chosenDate
    };
};


const mapDispatchToProps = { toggleModal, setDayAppointments };

export default connect(mapStateToProps, mapDispatchToProps)(ModalContent);