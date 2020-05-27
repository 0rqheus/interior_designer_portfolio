import React from "react";
import { Redirect } from "react-router-dom";
import { client } from "../../algolia";
import { PURCHASE_MODAL } from "../../modalNames";

import "./work.scss";

import Modal from "../_partials/Modal/Modal";
import Slider from "../_partials/Slider/Slider";
import Loader from "../_partials/Loader/Loader";
import BuyModalContent from "./BuyModalContent";
import BreadCrumbs from "../_partials/Breadcrumbs/Breadcrumbs";
import PriceBar from "./PriceBar";

export default class Work extends React.Component {

    constructor(props) {
        super(props);

        this.uploadData(props.match.params.id);

        this.state = {
            item: {},
        };

    }

    uploadData = (id) => {

        client.initIndex("myWorks").getObject(id).then(object => {

            console.log(object);

            this.setState({
                item: object
            });
        });
    }


    render() {

        if (this.state.item === null) {
            return <Redirect to="/404" />;
        } else if (this.state.item.objectID !== this.props.match.params.id) {
            return <Loader width="95vw" height="95vh"/>;
        }

        return (
            <>
                <BreadCrumbs />
                <div className="work">

                    <Modal modalId={PURCHASE_MODAL} content={() => <BuyModalContent workId={this.props.match.params.id} />} />

                    <Slider containerClass={"work__slider"} photos={this.state.item.photos} />

                    <h5 className="work__name">{this.state.item.title}</h5>

                    <PriceBar price={this.state.item.price}/>

                    <p className="work__description">{this.state.item.description}</p>

                </div>
            </>
        );
    }
}