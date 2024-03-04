class ButtonLink extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
        var reference = this.attributes.reference.value;
        var direction = this.attributes.direction ? this.attributes.direction.value : "left";
        var textId = this.attributes.text_id ? this.attributes.text_id.value : null;

        let divElement = document.createElement('div');
        let aElement = document.createElement('a');
        aElement.role = "button";
        aElement.classList.add('btn');
        aElement.classList.add('btn-primary');
        aElement.classList.add('btn-sm');
        aElement.href = reference;

        let iElement = document.createElement('i');
        iElement.classList.add('btn-icon-move');
        iElement.classList.add('bi');
        iElement.classList.add('bi-arrow-left-circle-fill');
        iElement.classList.add('pr-1');

        let spanElement = document.createElement('span');
        spanElement.classList.add(textId);

        if (direction === "right") {
            divElement.classList.add('blog-breadcrumb-right');
            aElement.appendChild(spanElement);
            aElement.appendChild(iElement);
        } else if (direction === "left") {
            divElement.classList.add('blog-breadcrumb');
            aElement.appendChild(iElement);
            aElement.appendChild(spanElement);
        } else {
            aElement.appendChild(spanElement);
        }

        divElement.appendChild(aElement);
        this.appendChild(divElement);

    }

}

customElements.define('j-button-link', ButtonLink);

{/* <div class="section-cta text-center">
<a class="btn btn-secondary theme-btn-cta" href="contact.html">Prendre Contact<svg
        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
        class="bi bi-arrow-right-short" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
    </svg></a>
</div><!--//section-cta--> */}