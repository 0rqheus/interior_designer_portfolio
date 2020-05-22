import React from "react";

import arrowIcon from "../../../assets/images/arrow.svg";
import "./slider.scss";

export default class Slider extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        currentImgNumber: 0
      };
    }
  
    handlePrevClick = () => {
      if(this.props.photos.length !== 0 && this.state.currentImgNumber > 0) {
        this.setState((state) => ({
          currentImgNumber: state.currentImgNumber-1
        }))
      }
    } 
  
    handleNextClick = () => {
      if(this.props.photos.length !== 0 && (this.state.currentImgNumber < this.props.photos.length - 1)) {
        this.setState((state) => ({
          currentImgNumber: state.currentImgNumber+1
        }))
      }
    } 
  
    render(){
  
      const imgPos = this.state.currentImgNumber;
  
      return (
        <div className={`slider ${this.props.containerClass || ""}`}>
          <img className="slider__img" src={this.props.photos[imgPos]} alt="slider img"/>

          <img src={arrowIcon} className="slider__arrow-icon slider__arrow-icon_left" alt="prev-arrow" onClick={this.handlePrevClick}/>
          <img src={arrowIcon} className="slider__arrow-icon" alt="next-arrow" onClick={this.handleNextClick}/>
        </div>
      );
    }
  }