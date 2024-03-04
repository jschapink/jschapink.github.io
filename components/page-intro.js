class PageIntro extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
        var nArticles = this.attributes.nArticles.value;
        var titleId = this.attributes.titleId.value;
        var introId = this.attributes.introId.value;

        let divElement = document.createElement('div');
        divElement.classList.add('intro-holder');

        //////// Title ////////
    
        let titleElement = document.createElement('h1');
        titleElement.classList.add('post-title');
        titleElement.classList.add('py-2');
        titleElement.classList.add(titleId);
        titleElement.classList.add('mb-10');

        divElement.appendChild(titleElement);

        ////////////////// Profile Intro //////////////////

        let profileIntro = document.createElement('div');
        profileIntro.classList.add('profile-intro');
        profileIntro.classList.add('mx-auto');

        let pElement = document.createElement('p');
        pElement.classList.add(introId);
        pElement.style.marginBottom = "16px";
        profileIntro.appendChild(pElement);

        let hrElement = document.createElement('hr');
        profileIntro.appendChild(hrElement);

        divElement.appendChild(profileIntro);

        ////////////// FOOTER DIV //////////////

        let footerDiv = document.createElement('div');
        footerDiv.style.fontSize = "14px";
        footerDiv.style.opacity = "0.5";

        let iElement = document.createElement('i');
        iElement.classList.add('bi');
        iElement.classList.add('bi-bookmark-star');
        iElement.classList.add('me-1');
        footerDiv.appendChild(iElement);

        let spanElement = document.createElement('span');
        spanElement.innerHTML = `${nArticles} Articles`;
        footerDiv.appendChild(spanElement);

        divElement.appendChild(footerDiv);


        this.appendChild(divElement);
    }
}

customElements.define('j-page-intro', PageIntro);
