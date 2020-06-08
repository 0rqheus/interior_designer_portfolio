import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { db } from "../../firebase";
import { PURCHASE_MODAL } from "../../modalNames";

import "./work.scss";

import Modal from "../_partials/Modal/Modal";
import Slider from "../_partials/Slider/Slider";
import Loader from "../_partials/Loader/Loader";
import BuyModalContent from "./BuyModalContent";
import BreadCrumbs from "../_partials/Breadcrumbs/Breadcrumbs";
import PriceBar from "./PriceBar";

const isObjectEmpty = (obj) => Object.getOwnPropertyNames(obj).length === 0;

const Work = (props) => {

    const [item, setItem] = useState({});

    const id = props.match.params.id;

    if (isObjectEmpty(item)) {
        db.collection("works").doc(id).get()
            .then(doc => {
                if(doc.exists) {
                    setItem({id: doc.id, ...doc.data()});
                } else {
                    setItem(null);
                }
            })
            .catch(console.error);
    }


    if (item === null) {
        return <Redirect to="/404" />;
    } else if (isObjectEmpty(item)) {
        return <Loader width="95vw" height="72vh" />;
    }

    return (
        <>
            <Modal modalId={PURCHASE_MODAL} content={() => <BuyModalContent workId={props.match.params.id} />} />
            <BreadCrumbs />
            <div className="work">

                <Slider containerClass={"work__slider"} photos={item.photos} />

                <h5 className="work__name">{item.title}</h5>

                <PriceBar price={item.price} />

                <p className="work__description">{item.description}</p>

            </div>
        </>
    );
};

export default Work;