class ArticleTileFlat extends HTMLElement {
    constructor() {
        super();

        this.updateOnce = true;
    }

    connectedCallback() {
        var reference = this.attributes.reference ? this.attributes.reference.value : null;
        var titleId = this.attributes.title_id ? this.attributes.title_id.value : null;
        var introId = this.attributes.intro_id ? this.attributes.intro_id.value : null;
        var tags = this.attributes.tags ? JSON.parse(this.attributes.tags.value): null;
        var tools = this.attributes.tools ? JSON.parse(this.attributes.tools.value): null;
        var image = this.attributes.image ? this.attributes.image.value : null;
        var timeRead = this.attributes.timeRead ? this.attributes.timeRead.value : 0;

        this.innerHTML = `
            <div class="project-item-inner row">
                <div class="col-12 col-lg-5 col-xl-4 article-tile-flat-image">
                    <div class="tile-image-hover cursor-pointer rounded-2"></div>
                    <img loading="lazy" src=${image} class="project-thumb mb-3 mb-lg-0 mx-auto" style="max-height: 300px; border-radius: 2px;"/>
                </div>
                <div class="text-side-tile col-12 col-lg-7 col-xl-8" style="display: flex; flex-direction: column;">
                    <h2 class="title justify-content-between d-flex">
                        <a href="${reference}" class="${titleId}"></a>
                    </h2>

                    <div class="intro ${introId} mt-3 mb-3"></div>

                    <div class="d-none tool-elements"></div>

                    <div style="margin-top: auto; justify-content: flex-end;">
                        <div class="d-flex flex-wrap my-3 tag-elements">
                        </div>
                        <hr>
                        <div style="font-size: 14px; opacity: 0.5;">
                            <i class="bi bi-stopwatch me-1"></i>
                            <span class="min-read-text">${timeRead} min read</span>
                        </div>
                    </div>
                    
                </div>
            </div>
        `;

        let imageDiv = this.getElementsByClassName('article-tile-flat-image')[0];
        imageDiv.style.borderRadius = "2px";
        imageDiv.style.overflow = "hidden";

        let projectItemInner = this.getElementsByClassName('project-item-inner')[0];
        projectItemInner.onclick = function() {
            location.href = reference;
        }

        // Set the tags dynamically adding them to the list
        let postTags = this.getElementsByClassName('tag-elements')[0];

        for (let i in tags) {
            let list_child = document.createElement('div');
            list_child.classList.add('post-tags');
            list_child.classList.add('pr-1');
            list_child.classList.add('pt-1');
            let span_element = document.createElement('span');
            span_element.classList.add('rounded-pill');
            span_element.classList.add('badge');
            span_element.classList.add(tags[i]);
            span_element.style.padding = "8px 10px";
            span_element.style.color = "#7f7f7f";
            list_child.appendChild(span_element);
            postTags.appendChild(list_child);
        }

        this.addEventListener('mouseover', function() {
            if (!this.isMobile()) {
                this.mouseOver();
            }
        });

        this.addEventListener('mouseout', function() {
            if (!this.isMobile()) {
                let imageElement = this.getElementsByClassName('project-thumb')[0];
                imageElement.style.transform = "scale(1)";
            }
        });

        window.requestAnimationFrame(() => {
            if (!this.isMobile()) {
                var imageSideTile = this.getElementsByClassName('project-thumb')[0];
                var textSideTile = this.getElementsByClassName('text-side-tile')[0];
                imageSideTile.style.height = textSideTile.style.offsetHeight;
            }
        });
    }

    isMobile() {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return regex.test(navigator.userAgent);
    }

    updateImageHoverSize() {
        let imageElement = this.getElementsByClassName('project-thumb')[0];
        let imageHoverElement = this.getElementsByClassName('tile-image-hover')[0];

        if (imageElement.offsetHeight === 0 || imageElement.offsetWidth === 0) {
            console.log("Image element has no height or width");
            return;
        }

        imageHoverElement.style.width = `${imageElement.offsetWidth}px`;
        imageHoverElement.style.height = `${imageElement.offsetHeight}px`;

        imageElement.parentElement.style.overflow = "hidden";
        imageElement.parentElement.style.height = `${imageHoverElement.offsetHeight}px`;
        imageElement.parentElement.style.width = `${imageHoverElement.offsetWidth}px`;
        imageElement.parentElement.style.padding = "inherit";
    }

    mouseOver() {
        let imageElement = this.getElementsByClassName('project-thumb')[0];
        let imageHoverElement = this.getElementsByClassName('tile-image-hover')[0];

        imageElement.style.transform = "scale(1.1)";

        if (imageHoverElement.offsetHeight !== 0 && imageHoverElement.offsetWidth !== 0) {
            imageElement.style.maxHeight = `${imageHoverElement.offsetHeight}px`;
            imageElement.style.maxWidth = `${imageHoverElement.offsetWidth}px`;
        }
    }
}

customElements.define('j-article-tile-flat', ArticleTileFlat);

// add event listener to the window to update the image hover size
window.addEventListener('load', function() {
    if (!this.isMobile()) {
        let articleTileFlatElements = document.getElementsByTagName('j-article-tile-flat');

        for (let i in articleTileFlatElements) {
            if (articleTileFlatElements[i] && i !== "length" && articleTileFlatElements[i].updateImageHoverSize) {
                articleTileFlatElements[i].updateImageHoverSize();
            }
        
        }
    }
});

window.addEventListener('resize', function() {
    if (!this.isMobile()) {
        let articleTileFlatElements = document.getElementsByTagName('j-article-tile-flat');

        for (let i in articleTileFlatElements) {
            if (articleTileFlatElements[i] && i !== "length" && articleTileFlatElements[i].updateImageHoverSize) {
                articleTileFlatElements[i].updateImageHoverSize();
            }
        
        }
    }
});