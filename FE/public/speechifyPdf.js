const inlinePlayerElement1 = document.querySelectorAll('.rpv-core__text-layer-text');

import('https://storage.googleapis.com/speechify-api-cdn/speechifyapi.min.mjs').then(async (speechifyWidget) => {
  // this parent element for your article or listenable content
  const articleRootElement = document.querySelector('.rpv-core__text-layer');
  // this is the header of your article; the inline player will be placed under this heading
  // const inlinePlayerElement = document.querySelectorAll('.rpv-core__text-layer');
  const inlinePlayerElement = document.querySelector('.post-article');
  const inlinePlayerElement1 = document.querySelector('.rpv-core__inner-page');
  const widget = speechifyWidget.makeSpeechifyExperience({
    rootElement: inlinePlayerElement1,
    customStyles: {
      // each property key is the name of a Speechify API element
      playButton: {
        // include a React.js CSS-in-JS style object here
        transform: 'scale(1.1)'
      }
    }
  });
  await widget.mount();
});
