import React from "react";
import { db, auth } from "../../firebase";

export default class BuyModalContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ordered: false
        }
    }

    handleOrder = () => {
        db.collection("orders").add({
            contacts: this.refs.contacts.value,
            workId: this.props.workId
        });

        this.setState({
            ordered: true
        })
    }

    render() {

        if(this.state.ordered) {
            return (
                <div className="modal-content">
                    <h4 className="modal-content__header">
                        Thanks for order! Now just wait and we'll contact you :)
                    </h4>
                </div>
            )
        }

        const contacts = auth.currentUser !== null
                            ? auth.currentUser.email
                            : "";

        return (
            <div className="modal-content">
                <h4 className="modal-content__header">New Order</h4>

                <form className="modal-form">
                    <div className="modal-form-container">
                        <label>Your contacts:</label>
                        <input className="modal-form__input" ref="contacts" placeholder="Email, phone, etc." defaultValue={contacts}/>
                    </div>

                    <button className="modal-form__submit-btn" onClick={this.handleOrder}>Send</button>
                </form>

                <p className="modal-content__warning">Take note that specified price is average and the final price depends on many paramenters, such as area, condition of the apartment, etc. That why we need to contact and discuss all issues</p>
            </div>
        );
    }

}