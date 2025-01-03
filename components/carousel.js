class Carousel extends HTMLElement {
    constructor() {
        super();
    }

  add_classes(element, class_names) {
      for (let i in class_names) {
          element.classList.add(class_names[i]);
      }
  }

  set_attributes(element, attributes) {
      for (let i in attributes) {
          element.setAttribute(i, attributes[i]);
      }
  }

  init_html(document_id, references, captions) {
      this.setAttribute("id", document_id);

      let carouselWrapperElement = document.createElement('div');
      carouselWrapperElement.classList.add("carousel-wrapper");
      carouselWrapperElement.setAttribute("id", `${document_id}-carousel-wrapper`);

      let carouselElement = document.createElement("div");
      carouselElement.classList.add("carousel");

      let carouselDotsElement = document.createElement("div");
      carouselDotsElement.classList.add("carousel__dots");
      let carouselDotsListElement = document.createElement("ul");
      carouselDotsListElement.setAttribute("id", `${document_id}-dotList`);
      carouselDotsListElement.style.marginTop = "20px";
      carouselDotsListElement.style.textAlign = "center";
      carouselDotsListElement.style.padding = "unset !important";

      for (let i in references) {
          let carouselCardElement = document.createElement("div");
          carouselCardElement.classList.add("carousel__card");
          carouselCardElement.setAttribute("id", `${document_id}-carousel__card-${i}`);

      /* Carousel Modal Creation */
          var randomId = crypto.randomUUID();
      
          let carouselCardImageModalElement = document.createElement('div');
          this.add_classes(carouselCardImageModalElement, [
              "modal",
              "fade",
              "rounded-1",
          ]);
          carouselCardImageModalElement.id = `image-${randomId}`;
          this.set_attributes(
              carouselCardImageModalElement,
              {
                  "tabindex": "-1",
                  "role": "dialog",
                  "aria-labelledby": `image-${randomId}-title`,
                  "aria-hidden": "true"

              }
          );

          let carouselCardImageModalDialogElement = document.createElement('div');
          this.add_classes(carouselCardImageModalDialogElement, [
              "modal-dialog",
              "modal-dialog-centered",
              "modal-xl",
              "rounded-1",
          ]);
          carouselCardImageModalDialogElement.setAttribute('role', 'document');

          carouselCardImageModalDialogElement.innerHTML = `
              <div class="modal-content rounded-1">
                  <div class="modal-body p-0">
                      <button class="dialog-close-button" type="button" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                      <img loading="lazy" src="${references[i]}" alt="image" class="img-fluid rounded-bottom-1">
                      <div class="dialog-description text-center ${captions[i]}">
                      </div>
                  </div>
              </div>
          `;

          carouselCardImageModalElement.appendChild(carouselCardImageModalDialogElement);
          this.appendChild(carouselCardImageModalElement);
      /* Carousel Modal End */


          let carouselCardImageContainerElement = document.createElement("div");
          carouselCardImageContainerElement.classList.add("img_container");
          this.set_attributes(
              carouselCardImageContainerElement,
              {
                  "type": "button",
                  "data-toggle": "modal",
                  "data-target": `#image-${randomId}`
              }
          );
          carouselCardImageContainerElement.style.cursor = "zoom-in";
  
          let carouselCardImageElement = document.createElement("img");
          this.set_attributes(
              carouselCardImageElement,
              {
                  "alt": `carousel-image-${i}`,
                  "src": references[i]
              }
          );


          let carouselCaptionElement = document.createElement("div");
          carouselCaptionElement.classList.add("pt-3");
          carouselCaptionElement.classList.add("text-center");
          carouselCaptionElement.classList.add(captions[i]);

          let carouselDotsDotElement = document.createElement("li");
          carouselDotsDotElement.classList.add("dot");
          carouselDotsDotElement.setAttribute("id", `${document_id}-dot-${i}`);

          if (i == 0) {
              carouselCardElement.classList.add("active");
              carouselDotsDotElement.classList.add("active");
          }

          carouselCardImageContainerElement.appendChild(carouselCardImageElement);
          carouselCardElement.appendChild(carouselCardImageContainerElement);
          carouselCardElement.appendChild(carouselCaptionElement);
          carouselDotsListElement.appendChild(carouselDotsDotElement);
          carouselElement.appendChild(carouselCardElement);
      }

      let carouselPrevElement = document.createElement("div");
      carouselPrevElement.classList.add("carousel__button--prev");
      carouselPrevElement.setAttribute("id", `${document_id}-prev`);
      let carouselNextElement = document.createElement("div");
      carouselNextElement.classList.add("carousel__button--next");
      carouselNextElement.setAttribute("id", `${document_id}-next`);

      carouselElement.appendChild(carouselPrevElement);
      carouselElement.appendChild(carouselNextElement);

      carouselWrapperElement.appendChild(carouselElement);
      carouselWrapperElement.appendChild(carouselDotsListElement);

      this.appendChild(carouselWrapperElement);
  }

  connectedCallback() {
      let document_id = crypto.randomUUID();
      var references = this.attributes.references ? JSON.parse(this.attributes.references.value) : [];
      var captions = this.attributes.captions ? JSON.parse(this.attributes.captions.value) : [];

      this.init_html(document_id, references, captions);

      /* variables */
      const nextbtn = document.getElementById(`${document_id}-next`);
      const prevbtn = document.getElementById(`${document_id}-prev`);
      let carousel_wrapper = document.getElementById(`${document_id}-carousel-wrapper`);
      let items = [];
      let dots = [];

      for (let i in references) {
          items.push(document.getElementById(`${document_id}-carousel__card-${i}`));
          dots.push(document.getElementById(`${document_id}-dot-${i}`));
      }

      let initial_offset = carousel_wrapper.offsetWidth/2 - items[0].offsetWidth/2;
      let full_initial_offset = initial_offset - items[0].offsetWidth/2;

      if (initial_offset < carousel_wrapper.offsetWidth / 2) {
          full_initial_offset = items[0].offsetWidth / 2 + (items[0].offsetWidth / 2 - initial_offset);
      }
      if (initial_offset < 0) {
          full_initial_offset = items[0].offsetWidth + Math.abs(initial_offset);
      }
      console.log(`carousel_wrapper.offsetWidth = ${carousel_wrapper.offsetWidth}`);
      console.log(`initial_offset = ${initial_offset}`);
      console.log(`items[0].offsetWidth = ${items[0].offsetWidth}`);
      console.log(`full_initial_offset = ${full_initial_offset}`);
      
      moveCardsHorizontally(initial_offset);

      let totalItems = items.length;
      let activeSlide = 0;
      let moving = false;
      let totalWidth = "";
      let singleAmountToMoveHorizontally = "";
      let positionX = "";
      let storeOldIndex = "";
      let differenceToMove = "";
      let amountOfTimesToLoopLeft = 0;
      let amountOfTimesToLoopRight = 0;

      /* end variables */


      /*functions*/
      function moveCardsHorizontally(amountToMove) {
          for (let key in items) {
              if (items.hasOwnProperty(key)) {
                  let value = items[key];
                  items[key].style.transform = `translate(${amountToMove}px)`;
              }
          }
      }
      function getNewPosition(direction) {
          totalWidth = items[0].parentElement.parentElement.parentElement.clientWidth;  
          // Change singleAmountToMoveHorizontally so the image will move in the center of the carousel
          singleAmountToMoveHorizontally = items[0].offsetWidth;
          console.log(
              `singleAmountToMoveHorizontally = totalWidth:${totalWidth} / totalItems:${totalItems} = ${singleAmountToMoveHorizontally}`
          );
          if (direction === "right") {
              console.log("parameter ->move right");
              //We need to add one because the array index is 0 to n
              positionX = Math.floor(singleAmountToMoveHorizontally * activeSlide + full_initial_offset);
              console.log(
                  `positionX =  singleAmountToMoveHorizontally:${singleAmountToMoveHorizontally} * activeSlide:${activeSlide + 1
                  } = ${positionX}`
              );
          } else if (direction === "left") {
              console.log("parameter <- move left");
              positionX = Math.floor(positionX - singleAmountToMoveHorizontally);
              console.log(
                  `positionX = positionX - singleAmountToMoveHorizontally:${singleAmountToMoveHorizontally} = ${positionX}`
              );
          }
          return positionX;
      }
      function disableInteraction() {
          // Set 'moving' to true for the same duration as our transition.
          // (0.5s = 500ms)
          moving = true;
          // setTimeout runs its function once after the given time
          setTimeout(function () {
              moving = false;
          }, 500);
      }
      function toggleActiveClass(oldIndex, newIndex) {
          //remove all active class
          items[oldIndex].classList.remove("active");
          dots[oldIndex].classList.remove("active");
          //add active class to the one passed in by parameter
          items[newIndex].classList.add("active");
          dots[newIndex].classList.add("active");
      }
      function moveCardsDotsHorizontally(dir) {
          moveCardsHorizontally(-getNewPosition(dir));
          storeOldIndex = activeSlide;
          console.log(`storeOldIndex= ${storeOldIndex}`);
          if (dir === "left") {
              activeSlide = activeSlide - 1;
              console.log(`activeSlide - 1 = ${activeSlide}`);
          } else {
              activeSlide = activeSlide + 1;
              console.log(`activeSlide + 1 = ${activeSlide}`);
          }
          toggleActiveClass(storeOldIndex, activeSlide);
      }

      function determineDifference(initial, final) {
          differenceToMove = Math.floor(final - initial);
          console.log(`differenceToMove = final:${final} - initial:${initial} = ${differenceToMove}`);
          return differenceToMove;
      }
      /* end functions */


      /* event listeners */
      nextbtn.onclick = function () {
          // Check if carousel is moving, if not, allow interaction
          if (!moving) {
              console.log("next button clicked");
              // temporarily disable interactivity
              disableInteraction();
              if (activeSlide === totalItems - 1) {
                  console.log(
                      `active slide is activeSlide:${activeSlide} = totalItems:${totalItems} cant go more to the right`
                  );
              } else {
                  moveCardsDotsHorizontally("right");
              }
          }
      };
      prevbtn.onclick = function () {
          if (!moving) {
              console.log("prev button clicked");
              // temporarily disable interactivity
              disableInteraction();
              if (activeSlide === 0) {
                  console.log("active slide is 1 cant go more to the left");
              } else {
                  moveCardsDotsHorizontally("left");
              }
          }
      };
      dots.forEach((item, index) => {
          item.addEventListener("click", (e) => {
              console.log("clicked on dot");
              //check what index was selected
              console.log(`index:${index} and item:${item}`);
              //get current slide and determine if the difference is greater or less than
              if (index > activeSlide) {
                  console.log(`index:${index} > activeSlide:${activeSlide} move right`);
                  amountOfTimesToLoopRight = Math.floor(determineDifference(index, activeSlide) * -1);
                  console.log(`amountOfTimesToLoopRight=${amountOfTimesToLoopRight}`);
                  for (var i = 0; i < amountOfTimesToLoopRight; i++) {
                      moveCardsDotsHorizontally("right");
                  }
              } else {
                  console.log(`index:${index} < activeSlide:${activeSlide} move left`);
                  amountOfTimesToLoopLeft = determineDifference(index, activeSlide);
                  console.log(`amountOfTimesToLoopLeft=${amountOfTimesToLoopLeft}`);
                  for (var j = 0; j < amountOfTimesToLoopLeft; j++) {
                      moveCardsDotsHorizontally("left");
                  }
              }
          });
      });

      nextbtn.click();

      /* end event listeners */
  }
  
}

customElements.define('j-carousel', Carousel);
