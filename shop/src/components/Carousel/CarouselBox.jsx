import React from 'react'
import { Carousel } from 'react-bootstrap'
import './Carousel.css';


export const CarouselBox = () => {
  return (
    <div className="slider-box">
      <Carousel fade>
       <Carousel.Item>
        <div className="slideImg slide-1"></div>
        <Carousel.Caption className='slider-caption'>
          <h3 className='slider-caption-title'>First slide label</h3>
          <p className='slider-caption-subtitle'>Nulla vitae elit libero, a pharetra augue mollis interdum.
          Nulla vitae elit libero, a pharetra augue mollis interdum.
          </p>
          <button className='slider-btn'>View more &nbsp;<span className='qty-arrow slider-arrow'>5</span></button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slideImg slide-2"></div>
        <Carousel.Caption className='slider-caption'>
        <h3 className='slider-caption-title'>Second slide label</h3>
          <p className='slider-caption-subtitle'>Nulla vitae elit libero, a pharetra augue mollis interdum.
          Nulla vitae elit libero, a pharetra augue mollis interdum.
          </p>
          <button className='slider-btn'>View more &nbsp;<span className='qty-arrow slider-arrow'>5</span></button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slideImg slide-3"></div>
        <Carousel.Caption className='slider-caption'>
        <h3 className='slider-caption-title'>Third slide label</h3>
          <p className='slider-caption-subtitle'>Nulla vitae elit libero, a pharetra augue mollis interdum.
          Nulla vitae elit libero, a pharetra augue mollis interdum.
          </p>
          <button className='slider-btn'>View more &nbsp;<span className='qty-arrow slider-arrow'>5</span></button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    
  )
}