class Footer extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
        this.innerHTML = `
            <footer class="footer text-center py-4">
                <small class="copyright">&copy; 2024 - JS</small>
            </footer>
        `;
      }
}

customElements.define('j-footer', Footer);
