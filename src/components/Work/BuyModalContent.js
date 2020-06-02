import React, { useState } from "react";
import { db, auth } from "../../firebase";

const BuyModalContent = (props) => {

    const [contacts, setContacts] = useState("");
    const [isOrdered, setIsOrdered] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (contacts.trim() === "") {
            contacts.classList.add("modal-form_invalid");
            return;
        }

        db.collection("orders").add({
            contacts: contacts,
            workId: props.workId
        });

        setIsOrdered(true);
    };

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



    if (isOrdered) {
        return (
            <div className="modal-content">
                <h4 className="modal-content__header">
                    {"Thanks for order! Now just wait and we'll contact you :)"}
                </h4>
            </div>
        );
    }

    const currentUser = auth.currentUser;

    return (
        <div className="modal-content">
            <h4 className="modal-content__header">New Order</h4>

            <form className="modal-form" onSubmit={handleSubmit}>

                <div className="modal-form__container">
                    <label>Contacts</label>
                    <input
                        className="modal-form__input"
                        placeholder="Email, phone, etc."
                        defaultValue={currentUser !== null 
                            ? currentUser.email 
                            : ""}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="modal-form__submit-btn">Send</button>
            </form>

            <p className="modal-content__warning">Take note that specified price is average and the final price depends on many paramenters, such as area, condition of the apartment, etc. That why we need to contact and discuss all issues</p>
        </div>
    );

};

export default BuyModalContent;