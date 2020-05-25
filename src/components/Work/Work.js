import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { toggleModal } from "../../actions";
import { storage, db } from "../../firebase";
import { PURCHASE_MODAL } from "../../modalNames";

import "./work.scss";

import Modal from "../_partials/Modal/Modal";
import Slider from "../_partials/Slider/Slider";
import BuyModalContent from "./BuyModalContent";
import BreadCrumbs from "../_partials/Breadcrumbs/Breadcrumbs";
// import Loader from "../_partials/Loader/Loader";

class Work extends React.Component {

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

    handleClick = () => {
        this.props.toggleModal(PURCHASE_MODAL);
    }


    render() {

        if (this.state.item === null) {
            return <Redirect to="/404" />;
        }

        // if(this.state.item.id !== undefined || (this.state.imageURLs.length !== this.state.item.photos.length)) {
        //     return <Loader width="95vw" height="95vh"/>
        // }

        return (
            <>
                <BreadCrumbs />
                <div className="work">

                    <Modal modalId={PURCHASE_MODAL} content={() => <BuyModalContent workId={this.props.match.params.id} />} />

                    <Slider containerClass={"work__slider"} photos={this.state.imageURLs} />

                    <h5 className="work__name">{this.state.item.title}</h5>

                    <div className="pricebar">
                        <span className="pricebar__price">${this.state.item.price}</span>

                        <button className="pricebar__buy-btn" onClick={this.handleClick}>Buy</button>
                    </div>

                    <p className="work__description">{this.state.item.description}</p>

                </div>
            </>
        );
    }
}

const mapDispatchToProps = { toggleModal };

export default connect(null, mapDispatchToProps)(Work);