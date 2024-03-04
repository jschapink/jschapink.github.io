class ArticleIntro extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        var titleId = this.attributes.titleId ? this.attributes.titleId.value : null;
        var introId = this.attributes.introId ? this.attributes.introId.value : null;
        var backHref = this.attributes.backHref ? this.attributes.backHref.value : null;
        var timeRead = this.attributes.timeRead ? this.attributes.timeRead.value : null;

        this.innerHTML = `
            <nav class="post-nav d-flex justify-content-between pb-3">
                <div class="nav-previous">
                    <a href="${backHref}" rel="prev">
                        <i class="bi bi-arrow-left me-2"></i>
                        <span class="back"></span>
                    </a>
                </div>
            </nav>
            <div class="intro-holder" style="margin-bottom: 45px">
                <h1 class="post-title py-2 ${titleId} mb-10"></h1>
                <div class="d-flex" style="margin-top: 45px">
                    <div class="pr-3">
                        <img class="rounded-circle" style="width: 44px; height: 44px" src="/assets/images/profile-picture.jpg" alt="profile-picture">
                    </div>
                    <div class="d-flex flex-column">
                        <div>Julian Schapink</div>
                        <div style="font-size: 14px; opacity: 0.5; padding-top: 1px">
                            <i class="bi bi-stopwatch"></i>
                            <span class="min-read-text">${timeRead} min read</span>
                        </div>
                    </div>
                </div>
                <hr style="margin-top: 45px">
                <div class="case-study-intro" style="margin-top: 32px; color: #6b6b6b !important; font-size: 16px">
                    <p class="mb-4 ${introId}"></p>
                </div>
                <hr style="margin-top: 45px">
            </div>
        `;
    }
}

customElements.define('j-article-intro', ArticleIntro);
