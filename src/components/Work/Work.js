import React from "react";
import { Redirect } from "react-router-dom";
import { storage, db } from "../../firebase";
import { PURCHASE_MODAL } from "../../modalNames";

import "./work.scss";

import Modal from "../_partials/Modal/Modal";
import Slider from "../_partials/Slider/Slider";
import BuyModalContent from "./BuyModalContent";
import BreadCrumbs from "../_partials/Breadcrumbs/Breadcrumbs";
import PriceBar from "./PriceBar";

export default class Work extends React.Component {

    constructor(props) {
        super(props);

        this.uploadData(props.match.params.id);

        this.state = {
            item: {},
            imageURLs: []
        };

    }

    uploadData = (id) => {
        db.collection("works").doc(id)
            .get()
            .then(doc => {
                if (doc.exists) {
                    this.setState({
                        item: { id, ...doc.data() }
                    });

                    this.uploadImages(doc.data().photos);
                } else {
                    this.setState({
                        item: null
                    });
                }
            })
            .catch(console.error);
    }

    uploadImages = (photos) => {

        photos.forEach(imgName => {

            storage.ref().child(imgName).getDownloadURL()
                .then(url => {
                    this.setState({
                        imageURLs: [...this.state.imageURLs, url]
                    });
                })
                .catch(console.error);

        });
    }


    render() {

        if (this.state.item === null) {
            return <Redirect to="/404" />;
        }

        return (
            <>
                <BreadCrumbs />
                <div className="work">

                    <Modal modalId={PURCHASE_MODAL} content={() => <BuyModalContent workId={this.props.match.params.id} />} />

                    <Slider containerClass={"work__slider"} photos={this.state.imageURLs} />

                    <h5 className="work__name">{this.state.item.title}</h5>

                    <PriceBar price={this.state.item.price}/>

                    <p className="work__description">{this.state.item.description}</p>

                </div>
            </>
        );
    }
}