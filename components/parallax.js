
let colors = {
    color1: "var(--t2-color-1)",
    color2: "var(--t2-color-2)",
    color3: "var(--t2-color-3)",
    color4: "var(--t2-color-4)",
    color5: "var(--t2-color-5)"
}

let keyartsStyles = [
    {
        id: 0,
        top: 0,
        left: -10,
        speed: 0.5,
        transform: "translate3d(-11px, 100px, -1.3px) scale(2.3)",
        backgroundColor: colors.color2,
        xmin: 0,
        xmax: 500,
        positivex: true,
        prevInterval: 0,
        // invert: true,
    },
    {
        id: 1,
        top: 0,
        left: 30,
        speed: 0.5,
        transform: "transform: translate3d(0, -200px, -.7px) scale(1.7)",
        backgroundColor: colors.color4,
        xmin: 0,
        xmax: 500,
        positivex: true,
        prevInterval: 0,
    },
    {
        id: 2,
        top: 0,
        left: 70,
        speed: 0.5,
        transform: "translate3d(-11px, 100px, 40px) scale(1.3)",
        backgroundColor: colors.color1,
        xmin: 0,
        xmax: 500,
        positivex: true,
        prevInterval: 0,
    },
    {
        id: 3,
        top: 10,
        left: -10,
        speed: 0.5,
        transform: "translate3d(0, 84px, .2px) scale(.8)",
        backgroundColor: colors.color4,
        xmin: 0,
        xmax: 500,
        positivex: true,
        prevInterval: 0,
    },
    {
        id: 4,
        top: 10,
        left: 30,
        speed: 0.5,
        transform: "translate3d(0, 106px, .3px) scale(.7)",
        backgroundColor: colors.color5,
        xmin: 0,
        xmax: 500,
        positivex: true,
        prevInterval: 0,
    },
    {
        id: 5,
        top: 10,
        left: 70,
        speed: 0.5,
        transform: "translate3d(0, 300px, .3px) scale(.7)",
        backgroundColor: colors.color1,
        xmin: 0,
        xmax: 500,
        positivex: true,
        prevInterval: 0,
    },
    {
        id: 6,
        top: 25,
        left: -10,
        speed: 0.5,
        transform: "translate3d(2, 150px, .3px) scale(.7)",
        backgroundColor: colors.color2,
        prevInterval: 0,
    },
    {
        id: 7,
        top: 25,
        left: 30,
        speed: 0.5,
        transform: "translate3d(0, 106px, .3px) scale(1.1)",
        backgroundColor: colors.color3,
    },
    {
        id: 8,
        top: 25,
        left: 70,
        speed: 0.3,
        transform: "translate3d(0, 35px, .1px) scale(.9)",
        backgroundColor: colors.color4,
    },
    {
        id: 9,
        top: 40,
        left: -10,
        speed: 0.3,
        transform: "translate3d(0, 84px, .2px) scale(.8)",
        backgroundColor: colors.color4,
    },
    {
        id: 10,
        top: 40,
        left: 30,
        speed: 0.5,
        transform: "translate3d(0, 84px, .2px) scale(.8)",
        backgroundColor: colors.color1,
    },
    {
        id: 11,
        top: 40,
        left: 70,
        speed: 0.5,
        transform: "translate3d(0, 106px, .3px) scale(.7)",
        backgroundColor: colors.color2,
    },
    {
        id: 12,
        top: 55,
        left: -10,
        speed: 0.3,
        transform: "translate3d(0, 106px, .38px) scale(.65)",
        backgroundColor: colors.color3,
    },
    {
        id: 13,
        top: 55,
        left: 30,
        speed: 0.5,
        transform: "translate3d(0, 180px, .45px) scale(.8)",
        backgroundColor: colors.color4,
    },
    {
        id: 14,
        top: 55,
        left: 70,
        speed: 0.3,
        transform: "translate3d(0, 106px, .38px) scale(.4)",
        backgroundColor: colors.color5,
    }
]


class Parallax extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
        var elementNumber = this.attributes.element_number ? this.attributes.element_number.value : 14;

        let keyartLayerCommonStyle = {
            height: 300,
            width: 300,
            borderRadius: 50,
            position: "absolute",
        }
        this.innerHTML = `
            <style>
                :root {
                    --t1-color-1: rgba(224, 157, 238, 1);
                    --t1-color-2: rgba(233, 110, 83, 1);
                    --t1-color-3: rgba(209, 119, 44, 1);
                    --t1-color-4: rgba(223, 151, 80, 1);
        
                    --t2-color-1: rgba(104, 18, 245, 1);
                    --t2-color-2: rgba(79, 175, 248, 1);
                    --t2-color-3: rgba(230, 50, 247, 1);
                    --t2-color-4: rgba(234, 51, 99, 1);
                    --t2-color-5: rgba(240, 151, 55, 1);
                }

                .keyart_layer:after {
                    border: solid black 6px !important;
                    background-color: black;
                }

                @keyframes move {
                    from { transform: translateY(0px); }
                    to { transform: translateY(100px); }
                }

                .circle {
                    position: absolute;
                    border-radius: 50%; /* Create a circle shape */
                    background-color: #f0f0f0; /* Adjust background color */
                    width: 500px; /* Adjust width as needed */
                    height: 500px; /* Adjust height as needed */
                    z-index: 1; /* Place circles in front of the background image */
                }
            </style>

            <div class="parallax-container">
            </div>
        `;

        let parallaxContainerElement = this.getElementsByClassName('parallax-container')[0];
        parallaxContainerElement.style.position = "absolute"; /* Establish a relative positioning context */
        parallaxContainerElement.style.top = 0;
        parallaxContainerElement.style.left = 0;
        parallaxContainerElement.style.right = 0;
        parallaxContainerElement.style.overflow = "hidden"; /* Clip overflowing content */
        // parallaxContainerElement.style.height = "500px";

        for (let i in keyartsStyles) {
            let circleElement = document.createElement('div');
            circleElement.id = `circle-${i}`;
            circleElement.classList.add('circle');

            circleElement.style.top = `${keyartsStyles[i].top}%`;
            circleElement.style.left = `${keyartsStyles[i].left}%`;
            circleElement.style.backgroundColor = keyartsStyles[i].backgroundColor;

            circleElement.textContent = `${i}`;
            circleElement.style.fontSize = "30px";
            circleElement.style.color = "black";
            circleElement.style.fontWeight = "bold";

            parallaxContainerElement.appendChild(circleElement);
        }
    }

    addPageStyles(pageElement) {
        pageElement.style.width = "100%";
        pageElement.style.height = "400vh";
        // pageElement.style.position = "absolute";
        // pageElement.style.top = "0";
        // pageElement.style.left = "0";
        // pageElement.style.right = "0";
        pageElement.style.overflowX = "hidden";
        // pageElement.style.zIndex = "2000";
        pageElement.style.backgroundColor = "blue";

        pageElement.style.perspective = "1px";
        pageElement.style.perspectiveOrigin = "left center";
    }

    addOverflowStyles(overflowElement) {
        overflowElement.style.position = "absolute";
        overflowElement.style.width = "100vw"
        overflowElement.style.height = "80vh";
        overflowElement.style.top = "100vh";
        overflowElement.style.backgroundColor = "#FFF";
    }

    addKeyartStyles(keyartElement) {
        keyartElement.style.transformStyle = "preserve-3d";
        keyartElement.style.backgroundColor = "red";
        // keyartElement.style.position = "absolute";
        keyartElement.style.width = "80vh";
        keyartElement.style.height = "120vh";
    }

    addKeyartLayerCommonStyles(keyartLayerElement, commonStyles) {
        keyartLayerElement.style.height = `${commonStyles.height}px`;
        keyartLayerElement.style.width = `${commonStyles.width}px`;
        keyartLayerElement.style.borderRadius = `${commonStyles.borderRadius}%`;
        keyartLayerElement.style.position = commonStyles.position;
    }

    addKeyartLayerStyles(keyartLayerElement, styles) {
        keyartLayerElement.style.top = `${styles.top}%`;
        keyartLayerElement.style.left = `${styles.left}%`;
        keyartLayerElement.style.transform = styles.transform;
        keyartLayerElement.style.backgroundColor = styles.backgroundColor;
    }
}

customElements.define('j-parallax', Parallax);

window.addEventListener('scroll', function() {
    // const parallaxContainer = document.querySelector('.parallax-container');
    const parallaxElements = document.getElementsByClassName('circle');
    const scrollPosition = window.scrollY; // Get current scroll position
    // const parallaxSpeed = 0.1; // Adjust parallax speed (higher value = slower movement)

    // Get random speed for each element from 0.3 to 0.5
     // Calculate parallax movement

    var minY = window.scrollY; // Ds
    var maxY = minY + window.innerHeight;
    // console.log("minY", minY);
    // console.log("maxY", maxY);

    for (let i in parallaxElements) {
        if (parallaxElements[i] && parallaxElements[i].style) {
            // console.log(parallaxElements[i].id, i);


            var elementRect = parallaxElements[i].getBoundingClientRect();
            var top = elementRect.top + 1;
            // y1v = (y1s - window.scrollY) ==> y1v = (y1s - Ds) 
            var bottom = elementRect.bottom;
            var left = elementRect.left;

            var parallaxY = top * keyartsStyles[i].speed;
            // y1v * speed = (y1s - Ds) * speed
            var windowHeight = window.innerHeight;

            parallaxY = keyartsStyles[i].invert ? -parallaxY : parallaxY;
            if ((top >= 0 && top <= window.innerHeight) || (bottom >= 0 && bottom <= window.innerHeight)) {
                // if (i == 3) {
                //     console.log("===================== INSIDE ", i);
                //     console.log("LEFT", elementRect.left);
                //     console.log("TOP ", top);
                //     console.log("BOTTOM ", bottom);
                // }
                // parallaxElements[i].style.top = `${parallaxY}px`;
                var previousTranslateX = 0;
                if (parallaxElements[i].style.transform) {
                    // convert previsousTranslateX from string to int
                    previousTranslateX = parallaxElements[i].style.transform.split(" ")[1].split("(")[1].split("px")[0];
                    previousTranslateX = parseInt(previousTranslateX);

                }
                // if (i == 3) {
                //     console.log("TRANSFORM ",  parallaxElements[i].style.transform);
                //     console.log("PREVISOUS TRANSLATE X", previousTranslateX, windowHeight);
                // }
                if (previousTranslateX > keyartsStyles[i].xmax) {
                    keyartsStyles[i].positivex = false;
                } else if (previousTranslateX < keyartsStyles[i].xmin) {
                    keyartsStyles[i].positivex = true;
                }

                if (keyartsStyles[i].positivex) {
                    var parallaxX = previousTranslateX + windowHeight / 100;
                }
                else {
                    var parallaxX = previousTranslateX - windowHeight / 100;
                }

                // console.log("Parallax X", parallaxX);

                parallaxElements[i].style.transform = `translateY(${parallaxY}px) translateX(${parallaxX}px)`;
                // y1s = y1s + ((y1s - Ds) * speed)
            }
        }
    }
});