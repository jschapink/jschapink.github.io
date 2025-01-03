class FormationTile extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
        var date = this.attributes.date.value;
        var location = this.attributes.location.value;
        var subtitleId = this.attributes.subtitleId.value;
        var src = this.attributes.src.value;
        var textId = this.attributes.textId.value;
        var titleId = this.attributes.titleId.value;
        var imageSrc = this.attributes.imageSrc.value;
        var smallImageSrc = this.attributes.smallImageSrc ? this.attributes.smallImageSrc.value : "";
        var schoolUrl = this.attributes.schoolUrl ? this.attributes.schoolUrl.value : "";

        this.innerHTML = `
            <div class="row">
                <div class="d-flex flex-wrap col-12">
                    <div class="mr-4 mb-3 overflow-hidden school-logo-image-wrapper" style="max-width: 290px !important; max-height: 80px !important;">
                    </div>
                    <div style="color: #6b6b6b">
                        <h5 class="card-title ${titleId}"></h5>
                        <div class="d-flex flex-wrap" style="color: #6b6b6b">
                            <div class="pr-2">${date}</div>
                            <div>${location}</div>
                        </div>
                        <div class="${subtitleId}"></div>
                    </div>
                </div>

                <div class="col-12 pb-3 pt-2">
                    <hr>
                    <div class="${textId}"></div>
                </div>
            
                <div class="col-12 formation-image-wrapper">
                    <a href="${schoolUrl}" target="_blank">
                        <img class="formation-image" src="${imageSrc}" alt="image">
                    </a>
                </div>
            </div>
        `;

        let schoolLogoImageWrapper = this.getElementsByClassName('school-logo-image-wrapper')[0];

        let schoolLogoImage = document.createElement('img');
        schoolLogoImage.src = src;
        schoolLogoImage.alt = "image";
        schoolLogoImage.style.maxWidth = "290px";
        schoolLogoImage.style.maxHeight = "80px";

        if (smallImageSrc) {
            let schoolLogoImageSmall = document.createElement('img');
            schoolLogoImageSmall.src = smallImageSrc;
            schoolLogoImageSmall.alt = "smmall-image";
            schoolLogoImageSmall.style.maxWidth = "290px";
            schoolLogoImageSmall.style.maxHeight = "80px";

            // Get the media format to set to visible or not the small image
            let media = window.matchMedia('(max-width: 425px)');
            if (media.matches) {
                schoolLogoImageSmall.style.display = "block";
                schoolLogoImage.style.display = "none";
            } else {
                schoolLogoImageSmall.style.display = "none";
                schoolLogoImage.style.display = "block";
            }
            schoolLogoImageWrapper.appendChild(schoolLogoImageSmall);

        }
        schoolLogoImageWrapper.appendChild(schoolLogoImage);
    }
}

customElements.define('j-formation-tile', FormationTile);
