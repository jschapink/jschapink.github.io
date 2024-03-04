class ArticleTileHome extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
        var image_reference = this.attributes.image_reference.value;
        var article_reference = this.attributes.article_reference.value;
        var title_id = this.attributes.title_id.value;
        var summary_id = this.attributes.summary_id.value;

        this.innerHTML = `
            <div class="card">
                <img src="${image_reference}" class="card-img-top" alt="image">
                <div class="card-body px-0">
                    <h5 class="card-title">
                        <a href="${article_reference}" class="${title_id}"></a>
                    </h5>
                    <p class="card-text mb-1 ${summary_id}"></p>
                    <div class="home-page-link">
                        <a class="card-link more-link" href="${article_reference}">
                            View more
                            <span class="link-arrow"><i class="bi bi-arrow-right"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    
        let homeLink = this.getElementsByClassName("home-page-link")[0];
        homeLink.style.position = "absolute";
        homeLink.style.bottom = "0";
      }
}

customElements.define('j-article-tile-home', ArticleTileHome);
