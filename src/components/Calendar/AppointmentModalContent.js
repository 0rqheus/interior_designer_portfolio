import React from "react";
import { db, auth } from "../../firebase";
import { connect } from "react-redux";
import { toggleModal, setDayAppointments } from "../../actions";

const MODAL_ID = "appointmentModal";

class ModalContent extends React.Component {

    makeAppointment = () => {

        const date = this.props.date;
        const day = this.props.day;

        const newAppointment = {
            contacts: this.contacts.contacts.value,
            message: this.message.message.value,
            hour: date.getHours()
        };

        if(day !== null) {
            db.collection("appointments").day(day.id).update({
                hours: [...day.appointmentHours, newAppointment]
            });
        } else {
            db.collection("appointments").add({
                day: date.getDate(),
                month: date.getMonth(),
                hours: [{...newAppointment}]
            });
        }

        this.props.setDayAppointments(day.id, [...day.appointmentHours, newAppointment]);

        this.props.toggleModal(MODAL_ID);
    }

    render() {

        const currentUser = auth.currentUser;
        const contacts = currentUser !== null ? currentUser.email : "";

        const getSelectedHours = (hour) => {
            return `${hour}:00 - ${+hour+1}:00`;
        };

        return (
            <div className="modal-content">

                <h4 className="modal-content__header">New appointment</h4>

                <form className="modal-form">

                    <div className="modal-form__container">
                        <label>Hours</label>
                        <input 
                            className="modal-form__input" 
                            ref={element => this.contacts = element} 
                            value={this.props.date !== null ? getSelectedHours(this.props.date.getHours()) : ""}
                            readOnly 
                        />
                    </div>

                    <div className="modal-form__container">
                        <label>Contacts</label>
                        <input className="modal-form__input" ref={element => this.contacts = element} defaultValue={contacts}/>
                    </div>

                    <div className="modal-form__container">
                        <label>Message</label>
                        <textarea className="modal-form__textarea" ref={element => this.message = element} rows="3"></textarea>
                    </div>

                    <button className="modal-form__submit-btn" onClick={this.makeAppointment}>Submit</button>
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