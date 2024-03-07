class Carousel extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
        var style = this.attributes.style ? this.attributes.style.value : "";
        var references = JSON.parse(this.attributes.references.value);
        var captions = this.attributes.captions ? JSON.parse(this.attributes.captions.value) : [];

        this.innerHTML = `
            <div id="carouselExampleIndicators" class="carousel slide carousel-style rounded-1" data-interval="10000" style="${style}">
                <ol class="carousel-indicators cursor-pointer">
                </ol>
                <div class="carousel-inner carousel-inner-prop">
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        `;

        //Creates image elements for each image reference
        let carouselInner = this.getElementsByClassName('carousel-inner-prop')[0];
        let carouselIndicators = this.getElementsByClassName('carousel-indicators')[0];

        for (let i in references) {
            // Creates the carousel item
            let carouselItem = document.createElement('div');
            // carouselItem.style.maxWidth = "600px";
            carouselItem.classList.add('carousel-item');
            carouselItem.classList.add('carousel-item-prop');
            if (i == 0) {
                carouselItem.classList.add('active');
            }

            let carouselImage = document.createElement('img');
            carouselImage.src = references[i];
            carouselImage.alt = `Slide ${i}`;
            carouselImage.classList.add('rounded-1');
            carouselImage.style.objectFit = "cover";

            carouselImage.setAttribute('data-toggle', 'modal');
            var randomId = crypto.randomUUID();
            carouselImage.setAttribute('data-target', `#image-${randomId}`);
    
            let modal = document.createElement('div');
            modal.classList.add('modal');
            modal.classList.add('fade');
            modal.classList.add('rounded-1');
            modal.id = `image-${randomId}`;
            modal.setAttribute('tabindex', '-1');
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-labelledby', `image-${randomId}-title`);
            modal.setAttribute('aria-hidden', 'true');

            let modalDialog = document.createElement('div');
            modalDialog.classList.add('modal-dialog');
            modalDialog.classList.add('modal-dialog-centered');
            modalDialog.classList.add('modal-xl');
            modalDialog.classList.add('rounded-1');
            modalDialog.setAttribute('role', 'document');

            modalDialog.innerHTML = `
                <div class="modal-content rounded-1">
                    <div class="modal-header">
                        <h5 class="modal-title ${captions[i] ? captions[i] : ""}"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body p-0">
                        <img src="${references[i]}" alt="image" class="img-fluid rounded-bottom-1">
                    </div>
                </div>
            `;

            modal.appendChild(modalDialog);
            this.appendChild(modal);

    
            carouselItem.appendChild(carouselImage);
            carouselInner.appendChild(carouselItem);

            // Creates the carousel indicator
            let carouselIndicator = document.createElement('li');
            carouselIndicator.setAttribute('data-target', '#carouselExampleIndicators');
            carouselIndicator.setAttribute('data-slide-to', i);
            if (i == 0) {
                carouselIndicator.classList.add('active');
            }
            carouselIndicators.appendChild(carouselIndicator);

            if (captions[i]) {
                let carouselCaption = document.createElement('div');
                carouselCaption.classList.add('carousel-caption');
                carouselCaption.classList.add('d-none');
                carouselCaption.classList.add('d-md-block');
                carouselCaption.innerHTML = `<p class="${captions[i]}"></p>`;
            }
        }

      }
}

customElements.define('j-carousel', Carousel);
