class BlogquoteFigure extends HTMLElement {
    connectedCallback() {
        let title_class = this.getAttribute('title-class', null);
        let text_class = this.getAttribute('text-class', null);
        let title_div = title_class !== null ? `<div class="mb-3"><i class="bi-star pr-1"></i> <span class="${title_class}" style="font-weight: bold;"></span></div>`: '';

        this.innerHTML = `
            <figure class="blog-quote-holder pt-4 pr-4 pl-4 pb-4 rounded">
                ${title_div}
                <div class="${text_class}"></div>
            </figure>
        `;

    }
}

customElements.define('j-blogquote-figure', BlogquoteFigure);
