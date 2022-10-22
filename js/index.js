  const mainContainer = makeElement('div', { className: 'main-container' });
  const formContainer = makeElement('div', { className: 'form-container' });
  const resultsContainer = makeElement('div', {
    className: 'results-container',
  });
  
  function createMain() {
    mainContainer.append(formContainer, resultsContainer);
    document.body.append(mainContainer);
  }

  window.onload = async function () {
    const marContainer = document.querySelector('.contentMarq');
    const marquee = new Marquee(marContainer);
    marquee.start();
  
    const resultsPanel = new ResultsPanel(resultsContainer);
    const search = new Search(formContainer, resultsPanel);
    createMain();
  };
  