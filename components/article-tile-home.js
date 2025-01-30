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
            <div class="card article-tile-home-card">
                <img loading="lazy" src="${image_reference}" class="card-img-top article-tile-home-img" alt="image">
                <div class="card-body px-0">
                    <h5 class="card-title">
                        <a href="${article_reference}" class="${title_id} stretched-link"></a>
                    </h5>
                    <p class="card-text mb-1 ${summary_id}"></p>
                    <div class="home-page-link">
                        <a class="card-link more-link" href="${article_reference}">
                            voir plus
                            <span class="link-arrow"><i class="bi bi-arrow-right"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        `;
      }
}

customElements.define('j-article-tile-home', ArticleTileHome);
