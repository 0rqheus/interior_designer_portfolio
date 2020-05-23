import React from "react";
import { db, auth } from "../../firebase";
import { connect } from 'react-redux';
import { hideModal, setDay } from "../../actions";

class ModalContent extends React.Component {

    makeAppointment = () => {

        const date = this.props.date;
        const day = this.props.day;

        const newAppointment = {
            contacts: this.refs.contacts.value,
            message: this.refs.message.value,
            hour: date.getHours()
        }

        if(day !== null) {
            db.collection("appointments").day(day.id).update({
                hours: [...day.hours, newAppointment]
            })
        } else {
            db.collection("appointments").add({
                day: date.getDate(),
                month: date.getMonth(),
                hours: [{...newAppointment}]
            });
        }

        this.props.setDay({
            id: day.id,
            hours: [
                ...day.hours,
                newAppointment
            ]
        })

        this.props.hideModal();
    }

    render() {

        const contacts = auth.currentUser !== null
                            ? auth.currentUser.email
                            : "";

        return (
            <div className="modal-content">

                <h4 className="modal-content__header">New appointment</h4>

                <form className="modal-form">

                    <div className="modal-form__container">
                        <label>Contacts</label>
                        <input className="modal-form__input" ref="contacts" value={contacts}/>
                    </div>

                    <div className="modal-form__container">
                        <label>Message</label>
                        <textarea className="modal-form__textarea" ref="message" rows="3"></textarea>
                    </div>

                    <button className="modal-form__submit-btn" onClick={this.makeAppointment}>Submit</button>
                </form>

            </div>
        );
    }
    
}


const mapStateToProps = (state) => {
    return {
        day: state.day,
        date: state.chosenDate
    };
}


const mapDispatchToProps = { hideModal, setDay };

export default connect(mapStateToProps, mapDispatchToProps)(ModalContent);