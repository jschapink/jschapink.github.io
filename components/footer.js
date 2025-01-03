class Footer extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.innerHTML = `
          <footer class="footer text-center py-4" style="font-size: 0.75rem">
            <small class="copyright">&copy; <span id="currentYear"></span> - JS</small>
          </footer>
        `;
      document.addEventListener('DOMContentLoaded', function() {
        var currentYear = new Date().getFullYear();
        document.getElementById('currentYear').textContent = currentYear;
      });
        // this.innerHTML = `
        //     <footer class="footer text-center py-4" style="font-size: 0.75rem">
        //       <div class="d-flex" style="justify-content: center">
        //         <div class="mr-5">
        //           <h6 class="text-left">Navigation</h6>
        //           <ul class="list-unstyled">
        //               <li class="list-unstyled">
        //                   <a class="d-flex" href="/index.html" style="color: #424242">
        //                       <span class="text-left" style="min-width: 18px"><i class="fa-solid fa-circle-user"></i></span>
        //                       <span class="nav-home"></span>
        //                   </a>
        //               </li>
        //               <li>
        //                   <a class="d-flex" href="/index-work.html" style="color: #424242">
        //                       <span class="text-left" style="min-width: 18px"><i class="bi bi-briefcase-fill"></i></span>
        //                       <span class="nav-work"></span>
        //                   </a>
        //               </li>
        //               <li>
        //                   <a class="d-flex" href="/index-hobbies.html" style="color: #424242">
        //                       <span class="text-left" style="min-width: 18px"><i class="bi bi-star-fill"></i></span>
        //                       <span class="nav-hobbies"></span>
        //                   </a>
        //               </li>
        //               <li>
        //                   <a class="d-flex" href="/index-education.html" style="color: #424242">
        //                       <span class="text-left" style="min-width: 18px"><i class="fa fa-graduation-cap"></i></span>
        //                       <span class="nav-education"></a>
        //               </li>
        //               <li>
        //                   <a class="d-flex" href="/index-resume.html" style="color: #424242">
        //                       <span class="text-left" style="min-width: 18px"><i class="fa-solid fa-file-lines"></i></span>
        //                       <span class="nav-resume"></span>
        //                   </a>
        //               </li>
        //           </ul>
        //         </div>

        //         <div>
        //           <h6 class="text-left">Contact</h6>
        //           <ul class="list-unstyled mb-0 text-left">
        //             <li><i
        //                 class="bi bi-telephone-inbound"></i>
        //                 <a href="tel: +33620091106" target="_blank" style="color: #424242">06 20 09 11 06</a>
        //             </li>
        //             <li><i
        //                 class="bi bi-envelope"></i>
        //               <a href="mailto: julian.schapink@gmail.com" target="_blank" style="color: #424242">julian.schapink@gmail.com</a>
        //             </li>
        //             <li><i
        //                 class="bi bi-globe"></i> <a href="https://jschapink.github.io/" target="_blank" style="color: #424242">www.jschapink.github.io</a>
        //             </li>
        //           </ul>
        //         </div>
        //       </div>

        //       <hr>
        //       <small class="copyright">&copy; 2024 - JS</small>
        //     </footer>
        // `;
      }
}

customElements.define('j-footer', Footer);
