import { Component } from "react";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

const ActiveMembers = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    // <div>
    //   <button class="btn" style={{ color: "lightblue" }}>
    //     <a
    //       href="#"
    //       data-toggle="popover"
    //       title="Popover Header"
    //       data-content="Some content inside the popover"
    //     >
    //       Active
    //     </a>
    //   </button>
    // </div>
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "50px" }}
    >
      <Button id="Popover1" type="button" color="primary">
        Launch Popover
      </Button>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target="Popover1"
        toggle={toggle}
      >
        <PopoverHeader>Popover Title</PopoverHeader>
        <PopoverBody>This is body</PopoverBody>
      </Popover>
    </div>
  );
};
export default ActiveMembers;

{
  /* <input
  class="input-carousel"
  type="text"
  placeholder="carousel on click in popover..."
  data-content='<div id="myCarousel" class="carousel slide" data-interval="true">
                 <!-- Indicators -->         
                <div class="carousel-inner">           
                    <div class="item active">
                        <blockquote>
                          <p>First Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                          <small>Someone famous in <cite title="Source Title">Source Title</cite></small>
                        </blockquote>
                    </div>
                   
                                                                                                      
                </div> 
                            
                                                            
            </div><!-- End Carousel -->  
    '
></input>; */
}
