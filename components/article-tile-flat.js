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

        this.innerHTML = `
            <div class="project-item-inner row">
                <div class="col-12 col-lg-5 col-xl-4 article-tile-flat-image">
                    <div class="tile-image-hover cursor-pointer rounded-2"></div>
                </div>
                <div class="text-side-tile col-12 col-lg-7 col-xl-8" style="display: flex; flex-direction: column;">
                    <h3 class="title justify-content-between d-flex">
                        <a href="${reference}" class="${titleId}"></a>
                    </h3>
                    
                    
                    <div class="intro ${introId}"></div>

                    <div class="d-flex flex-wrap my-3 tag-elements">
                    </div>

                    <div class="d-none tool-elements"></div>

                    <div style="margin-top: auto; justify-content: flex-end;">
                        <hr>
                        <div style="font-size: 14px; opacity: 0.5;">
                            <i class="bi bi-stopwatch me-1"></i>
                            <span class="min-read-text">3 min read</span>
                        </div>
                    </div>
                    
                </div>
            </div>
        `;

        let imageDiv = this.getElementsByClassName('article-tile-flat-image')[0];
        let projectItemInner = this.getElementsByClassName('project-item-inner')[0];
        projectItemInner.onclick = function() {
            location.href = reference;
        }

        let imageElement = document.createElement('img');
        imageElement.src = image;
        imageElement.classList.add('project-thumb');
        imageElement.classList.add('mb-3');
        imageElement.classList.add('mb-lg-0');
        imageElement.classList.add('mx-auto');
        imageElement.style.maxHeight = "300px";
        imageElement.style.borderRadius = "2px";

        imageDiv.style.borderRadius = "2px";
        imageDiv.style.overflow = "hidden";

        imageDiv.appendChild(imageElement);

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

        // Set the tools dynamically adding them to the list
        // if (tools && tools.length > 0 && tools[0] !== "") {
        //     let h4Element = document.createElement('h4');
        //     h4Element.classList.add('subtitle');
        //     h4Element.classList.add('toolbox-text');

        //     let toolElements = this.getElementsByClassName('tool-elements')[0];
        //     toolElements.classList.remove('d-none');
        //     toolElements.appendChild(h4Element);

        //     let ulElement = document.createElement('ul');
        //     ulElement.classList.add('tech-stack');
        //     ulElement.classList.add('list-inline');
        //     for (let i in tools) {
        //         if (tools[i]) {
        //             let list_child = document.createElement('li');
        //             let tooltip = tools[i].replace(".", "/").split("/").slice(-2)[0];

        //             list_child.classList.add('list-inline-item');
        //             list_child.innerHTML = `
        //                 <img class="rounded" src="${tools[i]}" alt="${tools[i]}">
        //             `;
        //             list_child.setAttribute('data-toggle', 'tooltip');
        //             list_child.setAttribute('data-placement', 'bottom');
        //             list_child.setAttribute('title', tooltip);
        //             list_child.setAttribute('data-bs-delay', '{"show":0,"hide":0}');

        //             ulElement.appendChild(list_child);
        //             toolElements.appendChild(ulElement);
        //         }
        //     }
        // }

        this.addEventListener('mouseover', function() {
            this.mouseOver();
        });

        this.addEventListener('mouseout', function() {
            imageElement.style.transform = "scale(1)";
        });

        window.requestAnimationFrame(() => {
            var imageSideTile = this.getElementsByClassName('project-thumb')[0];
            var textSideTile = this.getElementsByClassName('text-side-tile')[0];
            imageSideTile.style.height = textSideTile.style.offsetHeight;
        });
    }

    updateImageHoverSize() {
        let imageElement = this.getElementsByClassName('project-thumb')[0];
        let imageHoverElement = this.getElementsByClassName('tile-image-hover')[0];

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

        if (imageHoverElement.offsetHeight > 0 && imageHoverElement.offsetWidth > 0) {
            imageElement.style.transform = "scale(1.1)";

            imageElement.style.maxHeight = `${imageHoverElement.offsetHeight}px`;
            imageElement.style.maxWidth = `${imageHoverElement.offsetWidth}px`;
        }
    }
}

customElements.define('j-article-tile-flat', ArticleTileFlat);

// add event listener to the window to update the image hover size
window.addEventListener('load', function() {
    let articleTileFlatElements = document.getElementsByTagName('j-article-tile-flat');

    for (let i in articleTileFlatElements) {
        if (articleTileFlatElements[i] && i !== "length" && articleTileFlatElements[i].updateImageHoverSize) {
            articleTileFlatElements[i].updateImageHoverSize();
        }
    
    }
});

window.addEventListener('resize', function() {
    let articleTileFlatElements = document.getElementsByTagName('j-article-tile-flat');

    for (let i in articleTileFlatElements) {
        if (articleTileFlatElements[i] && i !== "length" && articleTileFlatElements[i].updateImageHoverSize) {
            articleTileFlatElements[i].updateImageHoverSize();
        }
    
    }
});