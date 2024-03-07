class Navigation extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
        this.innerHTML = `
            <nav class="navbar">
                <div aria-labelledby="offcanvasNavbarLabel" class="offcanvas-lg offcanvas offcanvas-start show d-flex" id="offcanvasNavbar" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1">
                    <div class="offcanvas-body d-flex align-items-center ">
                        <ul class="main-nav navbar-nav text-center">
                            
                            <li class="nav-item">
                                <a class="nav-link active d-flex flex-column" href="/index.html">
                                    <span class="icon-holder"><i class="fa-solid fa-circle-user"></i></span>
                                    <span class="nav-text nav-home"></span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link d-flex flex-column" href="/index-work.html">
                                    <span class="icon-holder"><i class="bi bi-briefcase-fill"></i></span>
                                    <span class="nav-text nav-work"></span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link d-flex flex-column" href="/index-hobbies.html">
                                    <span class="icon-holder"><i class="bi bi-star-fill"></i></span>
                                    <span class="nav-text nav-hobbies"></span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link d-flex flex-column" href="/index-education.html">
                                    <span class="icon-holder"><i class="fa fa-graduation-cap"></i></span>
                                    <span class="nav-text nav-education"></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link d-flex flex-column" href="/index-resume.html">
                                    <span class="icon-holder"><i class="fa-solid fa-file-lines"></i></span>
                                    <span class="nav-text nav-resume"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            
            </nav>
            
        `;

        let availableNavs = [
            "hobbies",
            "work",
            "education",
            "resume"
        ]

        let navLinks = this.getElementsByClassName("nav-link");
        let refs = window.location.href.replace(/[\.\-]/g, "/").split("/");

        let ref = "";
        for (let i in availableNavs) {
            for (let j in refs) {
                if (refs[j] === availableNavs[i]) {
                    ref = `index-${refs[j]}.html`;
                }
            }
        }
    
        for (let i in navLinks) {
            if (typeof navLinks[i] === "object") {
                if (navLinks[i].classList) {
                    navLinks[i].classList.remove("active");
                }

                let htmlFile = navLinks[i].href.split("/").slice(-1)[0];
                if (navLinks[i].href === window.location.href || htmlFile === ref) {
                    navLinks[i].classList.add("active");
                } else if (htmlFile === "index.html" && ref === "") {
                    navLinks[i].classList.add("active");
                }
            }
        }

    }
}

customElements.define('j-navigation', Navigation);
