class Footer extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
        this.innerHTML = `
            <footer class="footer text-center py-4">
                <small class="copyright">Julian Schapink - 2024 &copy;</small>
            </footer>
        `;
      }
}

customElements.define('j-footer', Footer);
