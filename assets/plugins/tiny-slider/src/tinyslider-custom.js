import { tns } from "./tiny-slider.js";

"use strict";

const slider = tns({
    container: '.tiny-slider',
    fixedWidth: 0,
    // loop: true,
    items: 1,
    slideBy: 'page',
    nav: true,    
    autoplay: true,
    speed: 600,
    autoplayButtonOutput: false,
    mouseDrag: true,
    lazyload: true,
    gutter: 0,
    navPosition: 'bottom',
    mouseDrag: true,
    controls: true,
    controlsContainer: ".slider-custom-controls",
    speed: 200,

});
