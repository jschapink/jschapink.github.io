function windowGetFullPageHeight() {
    const body = document.body;
    const html = document.documentElement;
  
    // The max of these two values provides the actual scroll height
    const height = Math.max(
      body.scrollHeight, // Height of body including overflow
      html.scrollHeight // Height of HTML element including overflow
    );
  
    return height;
}

window.addEventListener('load', function() {
    windowGetFullPageHeight();
});

const observer = new MutationObserver(mutations => {
    // console.log("DOM mutations:", mutations);
    var pageHeight = windowGetFullPageHeight();
    // console.log("pageHeight ", pageHeight);

    let parallaxContainerElement = document.getElementsByClassName('parallax-container');
    if (parallaxContainerElement) {
        parallaxContainerElement = parallaxContainerElement[0];
        if (parallaxContainerElement && parallaxContainerElement.offsetHeight < pageHeight) {
            // console.log("THE SIZE IS SMALLER ");
            parallaxContainerElement.style.height = pageHeight + "px";
        }
    }

  });
  
  observer.observe(document.documentElement, {
    childList: true,  // Observe changes in child nodes (additions, removals)
    subtree: true,   // Observe changes within the entire subtree
    attributes: true,  // Observe attribute changes
    characterData: true,  // Observe changes to data in text nodes
    // Additional options for specific changes you care about
  });
