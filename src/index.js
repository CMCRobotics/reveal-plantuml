const encoder = require('plantuml-encoder');

const RevealPlantUML = {
  id: 'plantuml',
  init: function(reveal) {
    const config = reveal.getConfig().plantuml || {};
    const server = config.serverPath || '//www.plantuml.com/plantuml/svg/';

    const update = () => {
      const blocks = document.querySelectorAll('pre code[class*="language-plantuml"], pre code[class*="plantuml"]');
      blocks.forEach((block) => {
        if (block.getAttribute('data-plantuml-processed')) return;
        block.setAttribute('data-plantuml-processed', 'true');

        const img = document.createElement("img");
        img.setAttribute("src", server + encoder.encode(block.innerText));

        const pre = block.parentElement;
        pre.parentNode.replaceChild(img, pre);
      });
    };

    reveal.on('ready', update);
    reveal.on('slidechanged', update);

    if (reveal.isReady()) {
      update();
    }

    const observer = new MutationObserver(update);
    observer.observe(reveal.getRevealElement(), {
      childList: true,
      subtree: true
    });
  }
};

if (typeof module !== 'undefined') {
  module.exports = RevealPlantUML;
}
if (typeof window !== 'undefined') {
  window.RevealPlantUML = RevealPlantUML;
}
