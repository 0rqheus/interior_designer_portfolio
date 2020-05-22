import React from "react";
import { Link } from "react-router-dom";
import {storage} from "../../firebase";

import "./worksItem.scss";

export default class WorksItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showText: false,
            showModal: false,
            imageURL: ""
        };

        storage.ref().child(this.props.item.photos[0]).getDownloadURL()
            .then((url) => {
                this.setState({
                    imageURL: url
                })
            })
            .catch(console.error);
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
            <div>
                <div className="works-item">

                    <Link to={`works/${this.props.item.id}`}>
                        <img className={this.getImageClasses(this.state.showText)}
                            src={this.state.imageURL}
                            alt="interior"
                            onMouseOver={this.mouseOverHandler}
                            onMouseOut={this.mouseOutHandler}
                            onClick={this.clickHandler}
                        />
                    </Link>

                    <p className={this.getTextClasses(this.state.showText)}>{this.props.item.title}</p>
                </div>
            </div>
        );
    }
}