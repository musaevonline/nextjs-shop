import React from "react";
import ScrollUpButton from "react-scroll-up-button";

const ScrollTopButton:React.FC = ()=>{

  return(
    <ScrollUpButton StopPosition={0}
                    ShowAtPosition={400}
                    EasingType='easeOutCubic'
                    AnimationDuration={500}
                    style={{height: 40, width: 40}}
                    ContainerClassName='ScrollUpButton__Container'
                    TransitionClassName='ScrollUpButton__Toggled'/>

  );
};

export default ScrollTopButton;