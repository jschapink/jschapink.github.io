class ArticleTile extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
        var reference = this.attributes.reference.value;
        var titleId = this.attributes.title_id.value;
        var introId = this.attributes.intro_id.value;
        var tags = JSON.parse(this.attributes.tags.value);
        var time = this.attributes.time.value;
        var image = this.attributes.image.value;

        this.innerHTML = `
            <head>
                <!-- Google Fonts -->	
                <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
                
                <!-- Bootstrpa Icons -->
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
                
                <!-- FontAwesome JS -->
                <script defer src="/assets/fontawesome/js/all.js"></script>
                
                <!-- Plugin CSS -->
                <link rel="stylesheet" href="/assets/plugins/tiny-slider/src/tiny-slider.scss">
            
                <!-- Theme CSS -->  
                <link id="theme-style" rel="stylesheet" href="/assets/css/theme-1.css">
            </head>

            <div class="featured-post-item post-item rounded row g-0 mx-auto">

                <div class="post-item-image col-12 col-md-3 col-lg-4 rounded-start-2">
                </div><!--//post-item-image-->

                <div class="post-item-body col-12 col-md-9 col-lg-8 text-start">
                    <div class="content-holder-inner">
                        <h3 class="post-title d-flex justify-content-between align-items-top">
                            <span class="title-text"></span>
                            <span class="title-icon-holder">
                                <i class="bi bi-arrow-right-short"></i>
                            </span>
                        </h3>
                        <p class="post-intro mb-0"></p>
                        <div class="post-tags my-3">
                            <ul class="list-inline">
                            </ul>
                        </div><!--//post-tags-->
                    </div><!--//content-holder-inner-->
                    <div class="post-item-footer">
                        <div class="post-meta d-flex justify-content-between">
                            <div class="meta-single d-flex"></div>
                            <ul class="meta-list list-inline d-flex mb-0">
                                <li class="list-inline-item post-time me-2">
                                    <i class="bi bi-stopwatch me-1"></i>
                                    <span class="min-read-text">${time}</span>
                                </li>
                            </ul><!--//meta-list-->
                        </div><!--post-meta-->
                    </div><!--//post-item-inner-footer-->

                </div><!--//post-item-body-->

                <a class="link-mask" href="${reference}"></a>

            </div><!--//featured-blog-post-->
        `;

        // Set the title and intro id to handle traduction
        let postTile = this.getElementsByClassName('title-text')[0];
        postTile.classList.add(titleId);

        let postIntro = this.getElementsByClassName('post-intro')[0];
        postIntro.classList.add(introId);

        // Set the tags dynamically adding them to the list
        let postTags = this.getElementsByClassName('post-tags')[0].firstElementChild;

        for (let i in tags) {
            let list_child = document.createElement('li');
            list_child.classList.add('list-inline-item');
            list_child.innerHTML = `
                <span class="badge tag-badge">${tags[i]}</span>
            `;
            postTags.appendChild(list_child);
        }

        // Set the image
        let postImage = this.getElementsByClassName('post-item-image')[0];
        postImage.style.backgroundImage = `url(${image})`;
    }
}

customElements.define('j-article-tile', ArticleTile);
