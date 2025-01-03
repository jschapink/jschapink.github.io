class Header extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="progress-bar-container">
                <div class="progress-bar"></div>
            </div>

            <div class="top-bar">
                <div class="top-bar-inner">
                    <ul class="social-list list-inline mx-auto">
                        <!-- <li class="list-inline-item me-0 me-md-1 me-lg-2"><a href="#"><i class="fa-brands fa-twitter fa-fw"></i></a></li>
                        <li class="list-inline-item me-0 me-md-1 me-lg-2"><a href="#"><i class="fa-brands fa-github fa-fw"></i></a></li> -->

                        <li class="list-inline-item me-0 me-md-1 me-lg-2">
                            <a target="_blank" href="https://www.linkedin.com/in/jschapink/" data-toggle="tooltip" data-placement="bottom" title="Linkedin" data-delay="{ "show": 0, "hide": 0 }"><i class="fa-brands fa-linkedin-in fa-fw"></i></a>
                        </li>
                        <li class="list-inline-item me-0 me-md-1 me-lg-2">
                            <a href="mailto: julian.schapink@gmail.com" data-toggle="tooltip" data-placement="bottom" title="Envoyer un email" data-delay="{ "show": 0, "hide": 0 }">
                                <i class="bi bi-envelope-plus"></i>
                            </a>
                        </li>
                        <li class="list-inline-item me-0 me-md-1 me-lg-2">
                            <a href="./assets/CV-Schapink-2025.pdf" download="CV-Schapink-2025.pdf" data-toggle="tooltip" data-placement="bottom" title="Télécharger le CV" data-delay="{ "show": 0, "hide": 0 }"><i class="bi bi-arrow-down-circle"></i></a>
                        </li>
                    </ul><!--//social-list-->

                    <div class="mode-toggle">
                        
                        <input class="toggle" id="language-select" type="checkbox">
                        <label class="toggle-btn mx-auto mb-0" for="language-select">
                            <span class="light-icon toggle-icon france-icon"></span>
                            <span class="night-icon toggle-icon uk-icon"></span>
                        </label>
                        
                    </div><!-- //lang-toggle -->
                </div><!--//top-bar-inner-->
            </div><!--//top-bar-->
        `;
      }
}

customElements.define('j-header', Header);


window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY; // Get scroll position
    const docHeight = document.documentElement.scrollHeight; // Document height
    const windowHeight = window.innerHeight; // Window height
  
    // Calculate percentage scrolled
    const scrolled = (scrollTop / (docHeight - windowHeight)) * 100;
  
    // Update progress bar width
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${scrolled}%`;
  });
