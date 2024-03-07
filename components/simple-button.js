class SimpleButton extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
        var reference = this.attributes.reference.value;
        var direction = this.attributes.direction ? this.attributes.direction.value : "left";
        var textId = this.attributes.textId ? this.attributes.textId.value : null;
        var icon = this.attributes.icon ? this.attributes.icon.value : null;
        var hover_icon = this.attributes.hoverIcon ? this.attributes.hoverIcon.value : null;
        var download = this.attributes.download ? this.attributes.download.value : null;

        let divElement = document.createElement('div');
        let aElement = document.createElement('a');
        aElement.role = "button";
        aElement.classList.add('btn');
        aElement.classList.add('btn-primary');
        aElement.classList.add('btn-sm');
        aElement.style.position = "relative";
        aElement.href = reference;

        let spanElement = document.createElement('span');
        spanElement.classList.add(textId);

        if (download) {
            aElement.setAttribute('download', download);
        }

        if (icon) {
            var icons = icon.split(" ");
            let iElement = document.createElement('i');
            iElement.style.transition = "all 0.5s ease-in-out";
            iElement.style.color = "#caafd2";

            for (let i in icons) {
                iElement.classList.add(icons[i]);
            }

            if (hover_icon) {
                window.requestAnimationFrame(() => {
                    var hover_icons = hover_icon.split(" ");
                    var iHoverElement = document.createElement('i');
                    var aElement = this.getElementsByTagName('a')[0];
                    iHoverElement.classList.add('hover-icon');
                    iHoverElement.style.position = "absolute";

                    iHoverElement.style.left = getComputedStyle(aElement).paddingLeft;
                    iHoverElement.style.opacity = "0";

                    for (let i in hover_icons) {
                        iHoverElement.classList.add(hover_icons[i]);
                    }
                    
                    iHoverElement.style.transition = "all 0.5s ease-in-out";
                    iHoverElement.style.color = "#caafd2";
                    aElement.appendChild(iHoverElement);
                });
            }

            if (direction === "right") {
                iElement.classList.add('pl-2');

                aElement.appendChild(spanElement);
                aElement.appendChild(iElement);
            } else {
                iElement.classList.add('pr-2');

                aElement.appendChild(iElement);
                aElement.appendChild(spanElement);
            }
        } else {
            aElement.appendChild(spanElement);
        }

        divElement.appendChild(aElement);
        this.appendChild(divElement);

        this.addEventListener('mouseover', () => {
            if (hover_icon && icon) {
                var iElement = this.getElementsByTagName('i')[0];
                var iHoverElement = this.getElementsByTagName('i')[1];

                iHoverElement.style.color = "#fff";
                iHoverElement.style.opacity = "1";
                iElement.style.opacity = "0";
            }
        });
        
        this.addEventListener('mouseout', () => {
            if (hover_icon && icon) {
                var iElement = this.getElementsByTagName('i')[0];
                var iHoverElement = this.getElementsByTagName('i')[1];

                iHoverElement.style.color = "#caafd2";
                iHoverElement.style.opacity = "0";
                iElement.style.opacity = "1";
            }
        });
    }

}

customElements.define('j-simple-button', SimpleButton);
