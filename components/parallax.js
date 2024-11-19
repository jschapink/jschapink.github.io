let colors = {
    color1: "var(--t2-color-1)",
    color2: "var(--t2-color-2)",
    color3: "var(--t2-color-3)",
    color4: "var(--t2-color-4)",
    color5: "var(--t2-color-5)"
}

let conf = {
    show_ids: false,                // Set to true to show id within the bubble
}

let base_styles = [
    {
        id: 0,                      // should be unique
        size: 1000,                  // bubble diameter
        x: -200,
        y: 0,
        color: colors.color1,       // bubble color
        speed: 0.4,                 // float between [0, 1], behaviour depends on the invert value
        invert: 1,                 // -1 or 1
    },
    {
        id: 1,
        size: 500,
        x: 5,
        y: 500,
        color: colors.color2,
        speed: 0.5,
        invert: -1,
    }
]


let keyartsStyles = [];


class Parallax extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
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


        // const size = 800;
        // let col_pos = 0;
    
        for (let i in base_styles) {
            let b = base_styles[i];

        //     circleElement.style.top = `${keyartsStyles[i].top}%`;
        //     circleElement.style.left = `${keyartsStyles[i].left}%`;
        //     circleElement.style.backgroundColor = keyartsStyles[i].backgroundColor;

        //     circleElement.textContent = `${keyartsStyles[i].id}`;
        //     circleElement.style.fontSize = "30px";
        //     circleElement.style.color = "black";
        //     circleElement.style.fontWeight = "bold";

        //     parallaxContainerElement.appendChild(circleElement);
        // }

        const size = 200;

        let col_pos = 0;
        let image_directory = "/assets/images/background/";
        let images = [
            "polygon_1.png",
            "ellipse_1.png",
            "ellipse_2.png",
            "ellipse_3.png",
            "ellipse_4.png",
            "ellipse_5.png",
        ];
        let image_settings = [
            {
                "url": "polygon_1.png",
                "invert": 1,
                "speed": 0.1,
                "left": -25,
                "top": 0,
                "z_index": -10,
                "inverted": 0
            },
            {
                "url": "polygon_3.png",
                "invert": 1,
                "speed": 0.3,
                "left": 50,
                "top": 10,
                "z_index": -9,
                "inverted": 0
            },
            {
                "url": "polygon_2.png",
                "invert": 1,
                "speed": 0.1,
                "left": -30,
                "top": 15,
                "z_index": -8,
                "inverted": 1
            },
            {
                "url": "polygon_4.png",
                "invert": 1,
                "speed": 0.3,
                "left": 0,
                "top": 25,
                "z_index": -7,
                "inverted": 1
            },
        ]
        for (let j = 0; j < 2; j++) {
            let divElement = document.createElement('div');
            let circleElement = document.createElement('img');
            
            let elementId = `${j}`;

            divElement.id = `circle-${elementId}`;
            divElement.classList.add('circle');
            // COMMENT NEXT BLOCK FOR PARALLAX SHAPES !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // FIND IN CSS THE LINEAR GRAD BASE BACKGROUND: linear-gradient(
            // circleElement.style.backgroundImage = `url(${image_directory + images[j]})`;
            // circleElement.style.backgroundRepeat = "no-repeat";
            // divElement.style.zIndex = image_settings[j].z_index;
            // divElement.style.position = "absolute";
            // circleElement.src = image_directory + image_settings[j].url;
            
            // circleElement.style.minHeight = "500px";
          
            // circleElement.style.height = `${size}px`;
            // circleElement.style.width = `${size}px`;
            // circleElement.style.borderRadius = "0%";

            var offset = 0;
            var speed = image_settings[j].speed;
            // var invert = Math.floor(Math.random() * 1.1);
            var invert = j == 0 ? 1: 0;
            var parallaxY = col_pos * speed - offset;

            parallaxY = invert ? -parallaxY : parallaxY;
            // divElement.style.transform = `translateY(${parallaxY}px)`;


            divElement.style.top = `${image_settings[j].top}%`;
            divElement.style.left = `${image_settings[j].left}%`;
            // circleElement.style.backgroundColor = color;
            // circleElement.style.opacity = "0.8";
            // circleElement.style.filter = "blur(0.5rem)";
            // circleElement.style.background = `rgba(${grey_color}, ${grey_color}, ${grey_color}, 0.8)`;
            // circleElement.style.boxShadow = `0rem 0rem 1rem ${color}`;

            // circleElement.textContent = `${elementId}`;
            divElement.style.fontSize = "30px";
            divElement.style.color = "black";
            divElement.style.fontWeight = "bold";
            divElement.style.transition = "transform ease-in-out";

            divElement.appendChild(circleElement);
            parallaxContainerElement.appendChild(divElement);
            console.log("INVERT ", invert);
            keyartsStyles.push({
                id: elementId,
                top: parallaxY,
                speed: speed,
                invert: invert
            });
        }
    }
}
}

customElements.define('j-parallax', Parallax);

window.addEventListener('scroll', function() {
    const parallaxElements = document.getElementsByClassName('circle');

    // console.log("WINDOW SCROLL " + window.scrollY);
    for (let i in parallaxElements) {
        if (parallaxElements[i] && parallaxElements[i].style) {
            let e = keyartsStyles[i];
            let elementRect = parallaxElements[i].getBoundingClientRect();
            
            var top = elementRect.top + 1;
            // y1v = (y1s - window.scrollY) ==> y1v = (y1s - Ds) 
            var bottom = elementRect.bottom;
            // var left = elementRect.left;

            var parallaxY = top * keyartsStyles[i].speed;
            // y1v * speed = (y1s - Ds) * speed
            // var windowHeight = window.innerHeight;
            // && elementRect.bottom <= window.innerHeight
            parallaxY = keyartsStyles[i].invert ? -parallaxY : parallaxY;
            if (i == 0) {
                console.log("SCROLL ", window.scrollY);
                console.log("TOP ", elementRect.top);
                console.log("BOTTOM ", elementRect.bottom);
                console.log("INNER ", window.innerHeight);
                console.log("PARALLAX " + parallaxY);
            }
            if (i == 0 && elementRect.bottom <= window.innerHeight) {
                console.log("ENTERING 0 " + parallaxY);
                

                // console.log("TRANSFORM ",  parallaxElements[i].style.transform);
                // console.log("TOP ", elementRect.top);
                // console.log("BOTTOM ", elementRect.bottom);
                // var parallaxY = window.scrollY - elementRect.bottom ;
            }
                // console.log("ENTERING 1");
            parallaxElements[i].style.transform = `translateY(${parallaxY}px)`;
            // parallaxElements[i].style.top = `${elementRect.top - parallaxY}px`;

            
            // if ((top >= 0 && top <= window.innerHeight) || (bottom >= 0 && bottom <= window.innerHeight)) {
            //     console.log("ELEMENT ", parallaxElements[i].id);
            //     console.log("SPEED", keyartsStyles[i].speed);
            //     console.log("TOP ", top);
            //     console.log("INNER HEIGHT ", window.innerHeight);
            //     console.log("PARALLAX Y  ", parallaxY);
            //     console.log("BOTTOM ", bottom);
            //     // if (i == 3) {
            //     //     console.log("===================== INSIDE ", i);
            //     //     console.log("LEFT", elementRect.left);
            //     //     console.log("TOP ", top);
            //     //     console.log("BOTTOM ", bottom);
            //     // }
            //     // parallaxElements[i].style.top = `${parallaxY}px`;
            //     // var previousTranslateX = 0;
            //     // if (parallaxElements[i].style.transform) {
            //     //     // convert previsousTranslateX from string to int
            //     //     previousTranslateX = parallaxElements[i].style.transform.split(" ")[1].split("(")[1].split("px")[0];
            //     //     previousTranslateX = parseInt(previousTranslateX);

            //     // }
            //     // if (i == 3) {
            //     //     console.log("TRANSFORM ",  parallaxElements[i].style.transform);
            //     //     console.log("PREVISOUS TRANSLATE X", previousTranslateX, windowHeight);
            //     // }
            //     // if (previousTranslateX > keyartsStyles[i].xmax) {
            //     //     keyartsStyles[i].positivex = false;
            //     // } else if (previousTranslateX < keyartsStyles[i].xmin) {
            //     //     keyartsStyles[i].positivex = true;
            //     // }

            //     // if (keyartsStyles[i].positivex) {
            //     //     var parallaxX = previousTranslateX + windowHeight / 100;
            //     // }
            //     // else {
            //     //     var parallaxX = previousTranslateX - windowHeight / 100;
            //     // }

            //     // console.log("Parallax X", parallaxX);

            //     // parallaxElements[i].style.transform = `translateY(${parallaxY}px) translateX(${parallaxX}px)`;
            //     parallaxElements[i].style.transform = `translateY(${parallaxY}px)`;

            //     // y1s = y1s + ((y1s - Ds) * speed)
            // }
            // else {
            //     console.log("TOP", top);
            //     console.log("INVERT ", e.invert);
            //     console.log("SPEED ", e.speed);
            //     let parallaxY = e.invert * top * e.speed;
            //     console.log("PARALLAX Y ", parallaxY);

                // parallaxElements[i].style.transform = `translateY(${parallaxY}px)`;

            // }
            
        }
    }
});