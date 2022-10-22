let lastSearchQuery = '';

class Search {
  constructor(domContainer, resultsPanel) {
    this.container = domContainer;
    this.resultsPanel = resultsPanel;
    this.generate();
  }

  generate() {
    this.searchButton = makeElement('button', {
      className: 'search-button cssload-jumping',
      innerText: 'Search',
    });
    this.inputField = makeElement('input', {
      className: 'input-field',
      placeholder: 'Search for company stock symbol',
    });

    this.container.append(this.inputField, this.searchButton);
    this.searchButton.addEventListener('click', e => this.searchHandler(e));
    this.inputField.addEventListener('keydown', e => this.userEnterSearch(e));
  }

  fillLoader(isLoading) {
    const searchButton = this.searchButton;

    if (isLoading) {
      searchButton.disabled = true;
      searchButton.innerHTML = ''; 
      for (let i = 0; i < 5; i++) {
        const loaderDots = document.createElement('span');
        searchButton.append(loaderDots);
      }
    } else {
      searchButton.innerHTML = 'Search';
      searchButton.disabled = false;
    }
  }

  async searchHandler() {
    this.fillLoader(true);
    const input = this.inputField.value;
    this.resultsPanel.clearAll();
    const data = await this.getDataFromServer(input);
    if (data) await this.resultsPanel.addAllRes(data);
    else this.resultsPanel.addNothingFound();
    this.fillLoader(false);
  }

  userEnterSearch(event) {
    if (event.key === 'Enter') {
      this.searchHandler();
    }
  }

  async getDataFromServer(stockSymbol) {
    const searchUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${stockSymbol}&limit=10&exchange=NASDAQ`;
    try {
      const data = await getJsonFromServer(searchUrl);
      if (!data || !Array.isArray(data) || !data.length) {
        return console.warn("Not Found Result - Data Array");
      }

      lastSearchQuery = stockSymbol;
      return data;
    } catch {
      console.error('There was a problem');
    }
  }
}