import React from "react";
import { Link } from "react-router-dom";

import Loader from "../_partials/Loader/Loader";

import "./worksItem.scss";

export default class WorksItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showText: false,
            showModal: false
        };
    }

    mouseOverHandler = () => {
        this.setState({
            showText: true
        });
    }

    mouseOutHandler = () => {
        this.setState({
            showText: false
        });
    }

    getTextClasses = (showTextStatus) => {
        let classesStr = "works-item__name";

        if (showTextStatus) classesStr += " works-item__name_show";

        return classesStr;
    }

    getImageClasses = (showTextStatus) => {
        let classesStr = "works-item__photo";

        if (showTextStatus) classesStr += " works-item__photo_fade";

        return classesStr;
    }

    render() {

        return (
            <div className="works-item">

                {this.state.imageURL !== null
                    ? (
                        <Link to={`works/${this.props.item.objectID}`}>
                            <img className={this.getImageClasses(this.state.showText)}
                                src={this.props.item.photos[0]}
                                alt={this.props.item.title}
                                onMouseOver={this.mouseOverHandler}
                                onMouseOut={this.mouseOutHandler}
                                onClick={this.clickHandler}
                            />
                        </Link>
                    )
                    : <Loader width="300px" height="300px" />
                }


                <p className={this.getTextClasses(this.state.showText)}>{this.props.item.title}</p>
            </div>
        );
    }
}