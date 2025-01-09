class ArticleNav extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        var prevTextId = this.attributes.prevTextId ? this.attributes.prevTextId.value : null;
        var nextTextId = this.attributes.nextTextId ? this.attributes.nextTextId.value : null;
        var prevHref = this.attributes.prevHref ? this.attributes.prevHref.value : null;
        var nextHref = this.attributes.nextHref ? this.attributes.nextHref.value : null;
        var tags = this.attributes.tags ? JSON.parse(this.attributes.tags.value) : [];

        this.innerHTML = `
            <div class="py-4">
                <hr>
                <div class="d-none d-flex flex-wrap my-3 tag-elements pb-4">
                </div>

                <nav class="post-nav d-flex justify-content-between">
                    <div class="nav-previous">
                        <a href="${prevHref}" rel="prev">
                            <i class="bi bi-arrow-left me-2"></i>
                            <span class="${prevTextId}"></span>
                        </a>
                    </div>
                    <div class="nav-next">
                        <a href="${nextHref}" rel="next">
                            <span class="${nextTextId}"></span>
                            <i class="bi bi-arrow-right ms-2"></i>
                        </a>
                    </div>
                </nav>
            </div>
        `;

        let tagElements = this.getElementsByClassName('tag-elements')[0];
        console.log(tags);
        for (let i in tags) {
            tagElements.classList.remove('d-none');
            let tagElement = document.createElement('div');
            tagElement.classList.add('post-tags');
            tagElement.classList.add('pt-1');
            tagElement.classList.add('pr-1');

            let spanElement = document.createElement('span');
            spanElement.classList.add('rounded-pill');
            spanElement.classList.add('badge');
            spanElement.classList.add(tags[i]);
            spanElement.style.padding = "8px 10px";
            spanElement.style.color = "rgb(127, 127, 127)";

            tagElement.appendChild(spanElement);
            tagElements.appendChild(tagElement);
        }
    }
}

customElements.define('j-article-nav', ArticleNav);
